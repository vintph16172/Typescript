import React from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { signIn } from '../../api/user'

import { Row, Col, Carousel,message } from 'antd';
import { Link } from 'react-router-dom';


// -------------------------IMAGE-------------------------
import banner1 from '../../img/main-content-thongtin1.png'
import banner2 from '../../img/main-content-thongtin2.png'
import banner3 from '../../img/main-content-thongtin3.png'
import logo from '../../img/logo.png'

const SignIn = () => {
    const { register, handleSubmit, formState: { errors } } = useForm()
    const navigate = useNavigate()
    const onSubmit = dataInputs => {

        console.log(dataInputs);

        const signInForm = async () => {
            const { data } = await signIn(dataInputs)
            console.log(data);
            localStorage.setItem("user", JSON.stringify(data))
            message.success('Đăng Nhập Thành Công!');
            navigate('/')

        }
        signInForm()
    }

    return (
        <div>
            <Row>
                <Col sm={12} md={12}>
                    <Carousel autoplay dotPosition={"top"}>
                        <div className="sm:hidden h-screen">

                            <div className="container h-screen flex flex-wrap flex-col md:flex-row items-center ">



                                <img className="w-full md:w-full  h-screen " src={banner1} alt="" />
                            </div>

                        </div>
                        <div className="h-screen">

                            <div className="container h-screen flex flex-wrap flex-col md:flex-row items-center ">

                                <img className="w-full md:w-full  h-screen " src={banner2} alt="" />


                            </div>

                        </div>
                       




                    </Carousel>

                </Col>
                <Col sm={12} md={12}>
                    <div className="m-4">

                        <div class="  flex flex-col items-center">
                            <div class="py-8">
                                <img width="100" class="-mt-10" src={logo} />
                            </div>
                        </div>

                        <form onSubmit={handleSubmit(onSubmit)}>
                            
                            <div class="mb-4">
                                <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Email</label>
                                <input type="email" id="email" {...register('email', { required: true })} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="abc@fastfood.com" required="" />

                                {errors.email && <p class="mt-2 text-sm text-red-600 dark:text-red-500"><span class="font-medium">Lỗi!</span> Không để trống</p>}
                            </div>
                            <div class="mb-4">
                                <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Mật Khẩu</label>
                                <input type="password" id="password" {...register("password", { required: true })} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="" />
                                {errors.password && <p class="mt-2 text-sm text-red-600 dark:text-red-500"><span class="font-medium">Lỗi!</span> Không để trống</p>}
                            </div>

                            {/* <button type="submit" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Đăng Ký</button> */}

                            <div class="flex flex-col space-y-5 w-full">
                                <button type="submit" class="w-full bg-red-600 rounded-3xl p-3 text-white font-bold transition duration-200 hover:bg-red-800">Đăng Nhập</button>
                                <div class="flex items-center justify-center border-t-[1px] border-t-slate-300 w-full relative">
                                    <div class="-mt-1 font-bod bg-white px-5 absolute">Hoặc</div>
                                </div>
                                <button class="w-full border-red-600 hover:border-red-800  border-[1px] rounded-3xl p-3 text-red-600 font-bold transition duration-200"><Link to={`/signup`} className="text-red-600 hover:text-red-800" >Đăng Ký</Link></button>
                            </div>


                        </form>


                    </div>


                </Col>
            </Row>

        </div>
    )
}

export default SignIn