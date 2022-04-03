import React, { useEffect } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { useNavigate, useParams } from 'react-router-dom'
import { detailProduct } from '../../../../api/product'
import { Form, Input, Button, Checkbox } from 'antd';


const ProductEdit = () => {
    const { register, handleSubmit, formState: { errors }, reset, control } = useForm()
    const navigate = useNavigate()
    const { id } = useParams();
    console.log(id);

    const onFinish = (values) => {
        console.log('Success:', values);
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    useEffect(() => {
        const getProduct = async () => {
            const { data } = await detailProduct(id)
            console.log(data);

            reset(data)

        }
        getProduct()
    }, [])

    const onSubmit = data => {
        // onEdit(data)
        console.log(data);




    }


    return (
        <div className="container">
            <Form
                name="basic"
                labelCol={{
                    span: 4,
                }}
                wrapperCol={{
                    span: 16,
                }}

                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
            >

                <Form.Item label="Email">
                    <Controller
                        name="email"
                        defaultValue=""
                        control={control}
                        render={({ onChange, value }) => (
                            <Input onChange={onChange} value={value} />
                        )} />
                </Form.Item>
                <Form.Item
                    label="Username"
                    name="username"
                    {...register("username", { required: true })}
                    rules={[
                        {
                            required: true,
                            message: 'Please input your username!',
                        },
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Price"
                    name="price"
                    {...register('price', { required: true })}
                    rules={[
                        {
                            required: true,
                            message: 'Please input your password!',
                        },
                    ]}
                >
                    <Input.Password />
                </Form.Item>



                <Form.Item
                    wrapperCol={{
                        offset: 8,
                        span: 16,
                    }}
                >
                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>
                </Form.Item>
            </Form>


            <form action="" onSubmit={handleSubmit(onSubmit)}>
                <input type="text"  {...register("name", { required: true })} />
                {errors.name && <span>Không để trống</span>}
                <input type="number" {...register('price', { required: true })} />
                {errors.price && <span>Không để trống</span>}
                <button>Edit</button>
            </form>
        </div>
    )
}

export default ProductEdit