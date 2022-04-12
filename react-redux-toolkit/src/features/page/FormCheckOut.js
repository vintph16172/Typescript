import React, { useState, useEffect, useRef } from 'react'
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux'
import { useForm, SubmitHandler } from 'react-hook-form';
import emailjs from '@emailjs/browser';
import { Button, Menu, Dropdown, Row, Col, Space, List, Avatar, Empty, Form, Input, message } from 'antd';
import { DownOutlined, PlusOutlined, ShoppingCartOutlined, MinusOutlined, DeleteOutlined } from '@ant-design/icons';
import { CartLocal } from '../utils/localstorage'
import { changeCartItem, changeTotalQuantity, addItemToCart, removeItemFromCart, decreaseQty, increaseQty } from '../slice/CartSlice';
import { getCategory } from '../slice/CategorySlice';
import { addCarts, addDetailCarts } from '../slice/CartSlice';
import { isAthenticate } from '../utils/localstorage'
import { listUserDetail } from '../../api/user'
import axios from 'axios'

const FormCheckOut = () => {
    const cart = useSelector(data => data.cart.items)
    const categories = useSelector(data => data.category.value)
    const totalQuantity = useSelector(data => data.cart.totalQuantity)
    const dispatch = useDispatch()
    const form = useRef();

    let totalProduct = 0
    let totalCart = 0
    let shipping = 30000
    if (cart?.length !== 0) {
        cart?.forEach((product) => {
            totalProduct += product.price * product.quantity
        })
        totalCart = totalProduct + (totalProduct * 0.05) + shipping
        if (localStorage.getItem('coupon')) {
            totalCart = (totalProduct + (totalProduct * 0.05) + shipping) * (localStorage.getItem('coupon') / 100)
        }
    }
    console.log(cart, "CheckOut");
    console.log(categories, "CheckOut");

    const onFinish = (values) => {
        const userData = isAthenticate()
        console.log('Success:', values);
        // values.email = userData ? userData.user._id : ""
        values.total = totalCart
        console.log(values);
        emailjs.sendForm('service_07jt5rj', 'template_lrjyz7r', ".form-cart", 'user_ZaKeVGTP2Smo2Bo6p7SOr')
            .then((result) => {
                console.log(result);
                console.log(result.text);
            }, (error) => {
                console.log(error.text);
            });
        // dispatch(addCarts(values))
        //     .then((result) => {
        //         const { payload } = result
        //         console.log(payload);
        //         cart.forEach((item) => {
        //             const flag = { cart: payload._id, product: item._id, quantity: item.quantity, total: item.price * item.quantity }
        //             console.log("Flag", flag);
        //             dispatch(addDetailCarts(flag))
        //         })
        //         localStorage.removeItem("cart")
        //         dispatch(changeCartItem([]))

        //     })


    };


    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const navigate = useNavigate();

    const onSubmit = (data) => {
        // data.preventDefault();
        console.log("data", data);
        const dataInput = {
            name: data.name,
            email: data.email,
            address: data.address,
            phone: data.phone,
            total: totalCart
        }
        console.log("dataInput", dataInput);
        dispatch(addCarts(dataInput))
            .then((data) => {
                const { payload } = data
                console.log("payload", payload);
                const cartId = payload._id
                cart.forEach((item) => {
                    const flag = { cart: payload._id, product: item._id, quantity: item.quantity, total: item.price * item.quantity }
                    console.log("Flag", flag);
                    dispatch(addDetailCarts(flag))
                })
                dataInput.cart = cartId
                emailjs.send('service_07jt5rj', 'template_lrjyz7r', dataInput, 'user_ZaKeVGTP2Smo2Bo6p7SOr')
                    .then(function (response) {
                        console.log('SUCCESS!', response.status, response.text);
                    }, function (error) {
                        console.log('FAILED...', error);
                    });

                localStorage.removeItem("cart")
                dispatch(changeCartItem([]))
                message.success('Thanh Toán Thành Công!');
                navigate('/')

            })


        // emailjs.send('service_07jt5rj', 'template_lrjyz7r', data, 'user_ZaKeVGTP2Smo2Bo6p7SOr')
        // .then(function (response) {
        //     console.log('SUCCESS!', response.status, response.text);
        // }, function (error) {
        //     console.log('FAILED...', error);
        // });




    }


    useEffect(() => {
        dispatch(changeCartItem(CartLocal()))
        dispatch(getCategory())
        if (isAthenticate()) {
            const { user } = isAthenticate()
            const getUser = async () => {
                const { data } = await listUserDetail(user._id);
                reset(data)

            }
            getUser();
        }




    }, [])

    return (
        <div class="flex justify-center my-6 mt-28">
            <div class="flex flex-col w-full p-8 text-gray-800 bg-white shadow-lg pin-r pin-y md:w-4/5 lg:w-4/5">
                <div class="flex-1">
                    <table class="w-full text-sm lg:text-base" cellspacing="0">
                        <thead>
                            <tr class="h-12 uppercase">
                                <th class="hidden md:table-cell"></th>
                                <th class="text-left">Sản Phẩm</th>
                                <th class="lg:text-right text-left pl-5 lg:pl-0">
                                    <span class="lg:hidden" title="Số Lượng">Số Lượng</span>
                                    <span class="hidden lg:inline">Số Lượng</span>
                                </th>
                                <th class="hidden text-right md:table-cell">Giá</th>
                                <th class="text-right">Tổng Giá</th>
                                <th class="text-right">Hành Động</th>
                            </tr>
                        </thead>
                        <tbody>
                            {cart?.length > 0 ? cart.map(item =>
                                <tr>
                                    <td class="hidden pb-4 md:table-cell">
                                        <Link to={`/products/${item._id}`} >
                                            <img src={item.image} class="w-20 rounded" alt="Thumbnail" />

                                        </Link>
                                    </td>
                                    <td>
                                        <Link to={`/products/${item._id}`} className="text-black   no-underline">
                                            <p class="mb-2 ">{item.name}</p>


                                        </Link>
                                        {categories.filter(cate => { return cate._id == item.category }).map((item2) => { return <Link to={`/category/${item2._id}`} className="text-black   no-underline"><small>{item2.name}</small></Link> })}


                                    </td>
                                    <td class="justify-center md:justify-end md:flex mt-6">
                                        {/* <div class="w-20 h-10">
                                            <div class="relative flex flex-row w-full h-8">
                                                <input type="number" value="2"
                                                    class="w-full font-semibold text-center text-gray-700 bg-gray-200 outline-none focus:outline-none hover:text-black focus:text-black" />
                                            </div>
                                        </div> */}

                                        <Button onClick={() => dispatch(increaseQty(item))} className='inline-block' type="text" icon={<PlusOutlined />} ></Button>
                                        <p className='inline-block' >{item.quantity}</p>
                                        <Button onClick={() => dispatch(decreaseQty(item))} className='inline-block' type="text" icon={<MinusOutlined />} ></Button>

                                    </td>
                                    <td class="hidden text-right md:table-cell">
                                        <span class="text-sm lg:text-base font-medium">
                                            {item.price} VNĐ
                                        </span>
                                    </td>
                                    <td class="text-right">
                                        <span class="text-sm lg:text-base font-medium">
                                            {item.price * item.quantity} VNĐ
                                        </span>
                                    </td>
                                    <td class="text-right">
                                        <Button onClick={() => dispatch(removeItemFromCart(item._id))} className='inline-block' type="text" danger icon={<DeleteOutlined />} ></Button>
                                    </td>
                                </tr>

                            ) : ""}

                        </tbody>
                    </table>
                    <hr class="pb-6 mt-6" />
                    <div class="my-4 mt-6 -mx-2 lg:flex">
                        <div class="lg:px-2 lg:w-1/2">
                            {/* <div class="p-4 bg-gray-100 rounded-full">
                                <h1 class="ml-2 font-bold uppercase">Code Giảm Giá</h1>
                            </div>
                            <div class="p-4">
                                <p class="mb-4 italic">Nếu Bạn Có Code Giảm Giá Hãy Nhập Ngay Để Nhận Ưu Đãi!</p>
                                <div class="justify-center md:flex">
                                    <form action="" method="">
                                        <div class="flex items-center w-full h-13 pl-3  bg-gray-100 border rounded-full">
                                            <input type="coupon" name="code" id="coupon" placeholder="Apply coupon" value="90off"
                                                class="w-full bg-gray-100 outline-none appearance-none focus:outline-none active:outline-none" />
                                            <button type="submit" class="text-sm flex items-center px-3 py-1 text-white bg-gray-800 rounded-full outline-none md:px-4 hover:bg-gray-700 focus:outline-none active:outline-none">
                                                <svg aria-hidden="true" data-prefix="fas" data-icon="gift" class="w-8" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M32 448c0 17.7 14.3 32 32 32h160V320H32v128zm256 32h160c17.7 0 32-14.3 32-32V320H288v160zm192-320h-42.1c6.2-12.1 10.1-25.5 10.1-40 0-48.5-39.5-88-88-88-41.6 0-68.5 21.3-103 68.3-34.5-47-61.4-68.3-103-68.3-48.5 0-88 39.5-88 88 0 14.5 3.8 27.9 10.1 40H32c-17.7 0-32 14.3-32 32v80c0 8.8 7.2 16 16 16h480c8.8 0 16-7.2 16-16v-80c0-17.7-14.3-32-32-32zm-326.1 0c-22.1 0-40-17.9-40-40s17.9-40 40-40c19.9 0 34.6 3.3 86.1 80h-86.1zm206.1 0h-86.1c51.4-76.5 65.7-80 86.1-80 22.1 0 40 17.9 40 40s-17.9 40-40 40z" /></svg>
                                                <span class="font-medium">Áp Dụng</span>
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </div> */}
                            <div class="p-4  bg-gray-100 rounded-full">
                                <h1 class="ml-2 font-bold uppercase">Thông Tin Đặt Hàng</h1>
                            </div>
                            <div class="p-4">

                                {/* <Form
                                    className='form-cart'
                                    ref={form}
                                    name="form-cart"
                                    labelCol={{
                                        span: 8,
                                    }}
                                    wrapperCol={{
                                        span: 16,
                                    }}
                                    initialValues={{
                                        remember: true,
                                    }}
                                    onFinish={onFinish}
                                    onFinishFailed={onFinishFailed}
                                    autoComplete="off"
                                >
                                    <Form.Item

                                        label="Họ và Tên"
                                        name="name"
                                        rules={[
                                            {
                                                required: true,
                                                message: 'Không để trống!',
                                            },
                                        ]}
                                    >
                                        <Input />
                                    </Form.Item>

                                    <Form.Item

                                        label="Email"
                                        name="email"
                                        rules={[
                                            {
                                                required: true,
                                                message: 'Không để trống!',
                                            },
                                        ]}
                                    >
                                        <Input />
                                    </Form.Item>

                                    <Form.Item

                                        label="Địa Chỉ"
                                        name="address"
                                        rules={[
                                            {
                                                required: true,
                                                message: 'Không để trống!',
                                            },
                                        ]}
                                    >
                                        <Input />
                                    </Form.Item>



                                    <Form.Item

                                        label="Số Điện Thoại"
                                        name="phone"
                                        rules={[
                                            {
                                                required: true,
                                                message: 'Không để trống!',
                                            },
                                        ]}
                                    >
                                        <Input />
                                    </Form.Item>




                                    <Form.Item

                                        wrapperCol={{
                                            offset: 8,
                                            span: 16,
                                        }}
                                    >
                                        <Button type="primary" htmlType="submit">
                                            Thanh Toán
                                        </Button>
                                        <button type="submit" class="flex justify-center w-full px-10 py-3 mt-6 font-medium text-white uppercase bg-gray-800 rounded-full shadow item-center hover:bg-gray-700 focus:shadow-outline focus:outline-none">
                                            <svg aria-hidden="true" data-prefix="far" data-icon="credit-card" class="w-8" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path fill="currentColor" d="M527.9 32H48.1C21.5 32 0 53.5 0 80v352c0 26.5 21.5 48 48.1 48h479.8c26.6 0 48.1-21.5 48.1-48V80c0-26.5-21.5-48-48.1-48zM54.1 80h467.8c3.3 0 6 2.7 6 6v42H48.1V86c0-3.3 2.7-6 6-6zm467.8 352H54.1c-3.3 0-6-2.7-6-6V256h479.8v170c0 3.3-2.7 6-6 6zM192 332v40c0 6.6-5.4 12-12 12h-72c-6.6 0-12-5.4-12-12v-40c0-6.6 5.4-12 12-12h72c6.6 0 12 5.4 12 12zm192 0v40c0 6.6-5.4 12-12 12H236c-6.6 0-12-5.4-12-12v-40c0-6.6 5.4-12 12-12h136c6.6 0 12 5.4 12 12z" /></svg>
                                            <span class="ml-2 mt-5px">Thanh Toán</span>
                                        </button>
                                    </Form.Item>
                                </Form> */}


                                <div class="p-4">

                                    <form ref={form} onSubmit={handleSubmit(onSubmit)}>
                                        <label>Tên</label>
                                        <input type="text" name="name" class="w-full p-2 bg-gray-100 rounded" {...register("name", { required: true })} />
                                        {errors.name && <span>Không để trống</span>}
                                        <label>Email</label>
                                        <input type="email" name="email" class="w-full  p-2 bg-gray-100 rounded" {...register("email", { required: true })} />
                                        {errors.email && <span>Không để trống</span>}
                                        <label>Số Điện Thoại</label>
                                        <input type="number" name="phone" class="w-full  p-2 bg-gray-100 rounded" {...register("phone", { required: true })} />
                                        {errors.phone && <span>Không để trống</span>}
                                        <label>Địa Chỉ</label>
                                        <input type="text" name="address" class="w-full  p-2 bg-gray-100 rounded" {...register("address", { required: true })} />
                                        {errors.address && <span>Không để trống</span>}
                                        <button type="submit" class="flex justify-center w-full px-10 py-3 mt-6 font-medium text-white uppercase bg-gray-800 rounded-full shadow item-center hover:bg-gray-700 focus:shadow-outline focus:outline-none">
                                            <svg aria-hidden="true" data-prefix="far" data-icon="credit-card" class="w-8" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path fill="currentColor" d="M527.9 32H48.1C21.5 32 0 53.5 0 80v352c0 26.5 21.5 48 48.1 48h479.8c26.6 0 48.1-21.5 48.1-48V80c0-26.5-21.5-48-48.1-48zM54.1 80h467.8c3.3 0 6 2.7 6 6v42H48.1V86c0-3.3 2.7-6 6-6zm467.8 352H54.1c-3.3 0-6-2.7-6-6V256h479.8v170c0 3.3-2.7 6-6 6zM192 332v40c0 6.6-5.4 12-12 12h-72c-6.6 0-12-5.4-12-12v-40c0-6.6 5.4-12 12-12h72c6.6 0 12 5.4 12 12zm192 0v40c0 6.6-5.4 12-12 12H236c-6.6 0-12-5.4-12-12v-40c0-6.6 5.4-12 12-12h136c6.6 0 12 5.4 12 12z" /></svg>
                                            <span class="ml-2 mt-5px">Thanh Toán</span>
                                        </button>
                                    </form>

                                </div>

                            </div>
                        </div>
                        <div class="lg:px-2 lg:w-1/2">
                            <div class="p-4 bg-gray-100 rounded-full">
                                <h1 class="ml-2 font-bold uppercase">Thông Tin Giỏ Hàng</h1>
                            </div>
                            <div class="p-4">
                                <p class="mb-6 italic">Bao Gồm Phí Shipping Và Thuế VAT</p>
                                <div class="flex justify-between border-b">
                                    <div class="lg:px-4 lg:py-2 m-2 text-lg lg:text-xl font-bold text-center text-gray-800">
                                        Tổng giá
                                    </div>
                                    <div class="lg:px-4 lg:py-2 m-2 lg:text-lg font-bold text-center text-gray-900">
                                        {totalProduct ? totalProduct : 0} VNĐ
                                    </div>
                                </div>
                                {/* <div class="flex justify-between pt-4 border-b">
                                    <div class="flex lg:px-4 lg:py-2 m-2 text-lg lg:text-xl font-bold text-gray-800">
                                        <form action="" method="POST">
                                            <button type="submit" class="mr-2 mt-1 lg:mt-2">
                                                <svg aria-hidden="true" data-prefix="far" data-icon="trash-alt" class="w-4 text-red-600 hover:text-red-800" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="currentColor" d="M268 416h24a12 12 0 0012-12V188a12 12 0 00-12-12h-24a12 12 0 00-12 12v216a12 12 0 0012 12zM432 80h-82.41l-34-56.7A48 48 0 00274.41 0H173.59a48 48 0 00-41.16 23.3L98.41 80H16A16 16 0 000 96v16a16 16 0 0016 16h16v336a48 48 0 0048 48h288a48 48 0 0048-48V128h16a16 16 0 0016-16V96a16 16 0 00-16-16zM171.84 50.91A6 6 0 01177 48h94a6 6 0 015.15 2.91L293.61 80H154.39zM368 464H80V128h288zm-212-48h24a12 12 0 0012-12V188a12 12 0 00-12-12h-24a12 12 0 00-12 12v216a12 12 0 0012 12z" /></svg>
                                            </button>
                                        </form>
                                        Coupon "90off"
                                    </div>
                                    <div class="lg:px-4 lg:py-2 m-2 lg:text-lg font-bold text-center text-green-700">
                                        -133,944.77€
                                    </div>
                                </div> */}
                                <div class="flex justify-between pt-4 border-b">
                                    <div class="lg:px-4 lg:py-2 m-2 text-lg lg:text-xl font-bold text-center text-gray-800">
                                        Phí Shipping
                                    </div>
                                    <div class="lg:px-4 lg:py-2 m-2 lg:text-lg font-bold text-center text-gray-900">
                                        {shipping ? shipping : 0} VNĐ
                                    </div>
                                </div>
                                <div class="flex justify-between pt-4 border-b">
                                    <div class="lg:px-4 lg:py-2 m-2 text-lg lg:text-xl font-bold text-center text-gray-800">
                                        Thuế
                                    </div>
                                    <div class="lg:px-4 lg:py-2 m-2 lg:text-lg font-bold text-center text-gray-900">
                                        {totalProduct == 0 ? "0" : totalProduct * 0.05} VNĐ
                                    </div>
                                </div>
                                <div class="flex justify-between pt-4 border-b">
                                    <div class="lg:px-4 lg:py-2 m-2 text-lg lg:text-xl font-bold text-center text-gray-800">
                                        Tổng Hóa Đơn
                                    </div>
                                    <div class="lg:px-4 lg:py-2 m-2 lg:text-lg font-bold text-center text-gray-900">
                                        {totalCart} VNĐ
                                    </div>
                                </div>
                                {/* <a href="#">
                                    <button class="flex justify-center w-full px-10 py-3 mt-6 font-medium text-white uppercase bg-gray-800 rounded-full shadow item-center hover:bg-gray-700 focus:shadow-outline focus:outline-none">
                                        <svg aria-hidden="true" data-prefix="far" data-icon="credit-card" class="w-8" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path fill="currentColor" d="M527.9 32H48.1C21.5 32 0 53.5 0 80v352c0 26.5 21.5 48 48.1 48h479.8c26.6 0 48.1-21.5 48.1-48V80c0-26.5-21.5-48-48.1-48zM54.1 80h467.8c3.3 0 6 2.7 6 6v42H48.1V86c0-3.3 2.7-6 6-6zm467.8 352H54.1c-3.3 0-6-2.7-6-6V256h479.8v170c0 3.3-2.7 6-6 6zM192 332v40c0 6.6-5.4 12-12 12h-72c-6.6 0-12-5.4-12-12v-40c0-6.6 5.4-12 12-12h72c6.6 0 12 5.4 12 12zm192 0v40c0 6.6-5.4 12-12 12H236c-6.6 0-12-5.4-12-12v-40c0-6.6 5.4-12 12-12h136c6.6 0 12 5.4 12 12z" /></svg>
                                        <span class="ml-2 mt-5px">Procceed to checkout</span>
                                    </button>
                                </a> */}
                            </div>
                        </div>
                    </div>
                </div>
            </div >
        </div >
    )
}

export default FormCheckOut