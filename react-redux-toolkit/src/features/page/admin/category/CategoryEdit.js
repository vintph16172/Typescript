import React, { useEffect, useState } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux";
import { listCateProduct } from '../../../../api/category'
import { Divider, Form, Input, Button, Select, Avatar, Upload, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import axios from "axios";
import { getCategory, editCategory, getProductCategory } from '../../../slice/CategorySlice';
import AdminPageHeader from '../../../../compoments/AdminPageHeader';
import { changeBreadcrumb } from '../../../slice/ProductSlice';

const CategoryEdit = () => {
    const { register, handleSubmit, formState: { errors }, reset, control } = useForm()
    const navigate = useNavigate()
    const { id } = useParams();
    const categories = useSelector(data => data.category.value)
    const dispatch = useDispatch();
    const [form] = Form.useForm();
    console.log(id);



    const onFinish = async (value) => {
        console.log(value);
        dispatch(editCategory(value));
        message.success('Sửa Thành Công!');
        navigate("/admin/category");
    };



    const onFinishFailed = (errorInfo) => {
        message.warning('Sửa Không Thành Công!');
    };

    useEffect(() => {
        const getCate = async () => {
            const { data } = await listCateProduct(id)
            console.log(data);

            reset(data)
            form.setFieldsValue(data.category);

        }
        getCate()
        dispatch(getCategory())
        dispatch(changeBreadcrumb("Sửa Danh Mục"))
    }, [])



    return (
        <div className="container">
            <AdminPageHeader />

            <div className="mx-6 pb-6">
                <Form layout="vertical" onFinish={onFinish} form={form} onFinishFailed={onFinishFailed} >
                    <Form.Item label="_id" name="_id" hidden={true}>
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Tên Danh Mục"
                        name="name"
                        rules={[{ required: true }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item>
                        <Button type="primary" htmlType="submit" block>
                            Sửa
                        </Button>
                    </Form.Item>
                </Form>
            </div>


        </div>
    )
}

export default CategoryEdit