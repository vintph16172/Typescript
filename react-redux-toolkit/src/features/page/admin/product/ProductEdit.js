import React, { useEffect, useState } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux";
import { detailProduct } from '../../../../api/product'
import { Divider, Form, Input, Button, Select, Avatar, Upload, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import axios from "axios";
import { getCategory, changeBreadcrumb } from '../../../slice/CategorySlice';
import { editProducts } from '../../../slice/ProductSlice';
import AdminPageHeader from '../../../../compoments/AdminPageHeader';

const ProductEdit = () => {
    const { register, handleSubmit, formState: { errors }, reset, control } = useForm()
    const navigate = useNavigate()
    const { id } = useParams();
    const categories = useSelector(data => data.category.value)
    const { Option } = Select;
    const dispatch = useDispatch();
    const [form] = Form.useForm();
    const [fileList, setfileList] = useState([]);
    console.log(id);

    const category = categories.map((item) => {
        return {
            id: item._id,
            cate: item.name
        };
    });

    const onFinish = async (value) => {
        console.log(value);
        const file = fileList[0];

        if (file) {
            const CLOUDINARY_PRESET = "ypn4yccr";
            const CLOUDINARY_API_URL =
                "https://api.cloudinary.com/v1_1/vintph16172/image/upload"
            const formData = new FormData();
            formData.append("file", file);
            formData.append("upload_preset", CLOUDINARY_PRESET);

            const { data } = await axios.post(CLOUDINARY_API_URL, formData, {
                headers: {
                    "Content-Type": "application/form-data"
                }
            });
            value.image = data.url;
            setfileList([]);
        }

        console.log(value);
        dispatch(editProducts(value));
        message.success('Sửa Thành Công!');
        navigate("/admin/products");
    };



    const onFinishFailed = (errorInfo) => {
        message.warning('Sửa Không Thành Công!');
    };

    useEffect(() => {
        const getProduct = async () => {
            const { data } = await detailProduct(id)
            console.log(data);

            reset(data)
            form.setFieldsValue(data);

        }
        getProduct()
        dispatch(getCategory())
        dispatch(changeBreadcrumb("Sửa Sản Phẩm"))
    }, [])



    return (
        <div className="container">
            <AdminPageHeader />
            <div className="mx-6 pb-6">
                <Form layout="vertical" className="mx-6 mb-6" onFinish={onFinish} form={form} onFinishFailed={onFinishFailed} >
                    <Form.Item label="_id" name="_id" hidden={true}>
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Tên san pham"
                        name="name"
                        rules={[{ required: true }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Gias san pham"
                        name="price"
                        rules={[{ required: true }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Mô tả sản phẩm"
                        name="desc"
                        rules={[{ required: true }]}
                    >
                        <Input.TextArea />
                    </Form.Item>

                    <Form.Item
                        label="Danh mục sản phẩm"
                        name="cate"
                        rules={[{ required: true }]}
                    >
                        <Select >

                            {category?.map((item) => (
                                <Option key={item.id} value={item.cate}>
                                    {item.name}
                                </Option>
                            ))}
                        </Select>
                    </Form.Item>
                    <Form.Item label="Anh" name="image" valuePropName="src">
                        <Avatar shape="square" size={200} />
                    </Form.Item>

                    <Form.Item label="Upload ảnh">
                        <Upload.Dragger
                            onRemove={(file) => {
                                const index = fileList.indexOf(file);
                                console.log(file, index);
                                const newFileList = fileList.slice();
                                newFileList.splice(index, 1);
                                return {
                                    fileList: newFileList
                                };
                            }}
                            beforeUpload={(file) => {
                                setfileList([...fileList, file]);
                                return false;
                            }}
                            defaultFileList={fileList[0]}
                            listType="picture"
                            maxCount={1}
                        >
                            <Button icon={<UploadOutlined />}>Select File</Button>
                        </Upload.Dragger>
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit" block>
                            Lưu sửa
                        </Button>
                    </Form.Item>
                </Form>
            </div>



            {/* <form action="" onSubmit={handleSubmit(onSubmit)}>
                <input type="text"  {...register("name", { required: true })} />
                {errors.name && <span>Không để trống</span>}
                <input type="number" {...register('price', { required: true })} />
                {errors.price && <span>Không để trống</span>}
                <button>Edit</button>
            </form> */}
        </div>
    )
}

export default ProductEdit