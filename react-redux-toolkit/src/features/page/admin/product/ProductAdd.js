import React, { useEffect, useState } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux";
import { detailProduct } from '../../../../api/product'
import { Divider, Form, Input, Button, Checkbox, Upload, Select, Avatar, message } from 'antd';
import { UploadOutlined } from "@ant-design/icons";
import axios from "axios";
import { getCategory } from '../../../slice/CategorySlice';
import { addProducts, changeBreadcrumb } from '../../../slice/ProductSlice';
import { v4 as uuidv4 } from 'uuid';
import AdminPageHeader from '../../../../compoments/AdminPageHeader';

const ProductAdd = () => {
    const { Option } = Select;
    const [form] = Form.useForm();
    const { register, handleSubmit, formState: { errors }, reset, control } = useForm()
    const categories = useSelector(data => data.category.value)
    const navigate = useNavigate()
    const dispatch = useDispatch();
    const { id } = useParams();
    const [fileList, setfileList] = useState([]);
    console.log(id);

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
        dispatch(addProducts({ id: uuidv4(), ...value }));
        message.success('Thêm Thành Công!');
        navigate("/admin/products");
    };

    const onFinishFailed = (errorInfo) => {
        message.warning('Thêm Không Thành Công!');
    };
    const category = categories.map((item) => {
        return {
            id: item._id,
            cate: item.name
        };
    });

    useEffect(() => {

        dispatch(getCategory())
        dispatch(changeBreadcrumb("Thêm Sản Phẩm"))

    }, [])


    const normFile = (e) => {
        console.log('Upload event:', e);
        if (Array.isArray(e)) {
            return e;
        }
        return e && e.fileList;
    };


    return (
        <div className="container">
            <AdminPageHeader />
            <div className="mx-6 pb-6">
                <Form layout="vertical" onFinish={onFinish} onFinishFailed={onFinishFailed}>
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
                            Thêm
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

export default ProductAdd