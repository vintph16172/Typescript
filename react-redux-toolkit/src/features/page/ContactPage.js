import React, { useEffect, useRef } from 'react'
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { Row, Col, message } from 'antd';
import { useForm, SubmitHandler } from 'react-hook-form';
import { isAthenticate } from '../utils/localstorage'
import { listUserDetail } from '../../api/user'
import emailjs from '@emailjs/browser';



const ContactPage = () => {
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const navigate = useNavigate();
    const form = useRef();
    const key = "AIzaSyBQWeRRmZw8reRuUMSvrjSHlZOfEEt25SQ"


    const onSubmit = (data) => {
        // data.preventDefault();
        console.log("data", data);
        const dataInput = {
            name: data.name,
            email: data.email,
            address: data.address,
            phone: data.phone,
            desc: data.desc

        }
        console.log("dataInput", dataInput);
        emailjs.send('service_07jt5rj', 'template_6ummm4x', dataInput, 'user_ZaKeVGTP2Smo2Bo6p7SOr')
            .then(function (response) {
                console.log('SUCCESS!', response.status, response.text);
            }, function (error) {
                console.log('FAILED...', error);
            });


        // message.success('Thanh Toán Thành Công!');
        // navigate('/')
    }

    useEffect(() => {

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
        <div className="py-28 ">
            <section class="text-gray-700 body-font overflow-hidden bg-white">
                <div class="container px-5  mx-auto ">
                    <div class="lg:w-4/5 mx-auto flex flex-wrap ">
                        <div className="gmaps-section">
                            <div class="map-area">
                     
                                <iframe style={{width: 450, height:400}} src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3723.8964603035606!2d105.81651461424549!3d21.03682849288029!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135ab0d0b127ce1%3A0x25663c35956b1eac!2zTmcuIDI4NSDEkOG7mWkgQ-G6pW4sIExp4buFdSBHaWFpLCBCYSDEkMOsbmgsIEjDoCBO4buZaSwgVmnhu4d0IE5hbQ!5e0!3m2!1svi!2s!4v1642432612727!5m2!1svi!2s" allowfullscreen="" loading="lazy"></iframe>
                            </div>
                        </div>
                        <div class="lg:w-1/2 w-full px-6 ">
                            <form ref={form} onSubmit={handleSubmit(onSubmit)} class="w-full max-w-lg">
                                <div class="flex flex-wrap -mx-3 mb-6">
                                    <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                                        <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-first-name">
                                            Họ và Tên
                                        </label>
                                        <input name="name" {...register("name", { required: true })} class="appearance-none block w-full bg-gray-200 text-gray-700 border  rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" type="text" placeholder="Tên..." />
                                        {errors.name && <p class="text-red-500 text-xs italic">Không để trống!</p>}
                                    </div>
                                    <div class="w-full md:w-1/2 px-3">
                                        <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-last-name">
                                            Số Điện Thoại
                                        </label>
                                        <input name="phone"  {...register("phone", { required: true })} class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" type="number" placeholder="Số Điện Thoại..." />
                                        {errors.phone && <p class="text-red-500 text-xs italic">Không để trống!</p>}
                                    </div>
                                </div>
                                <div class="flex flex-wrap -mx-3 mb-6">
                                    <div class="w-full px-3">
                                        <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-password">
                                            E-mail
                                        </label>
                                        <input name="email"  {...register("email", { required: true })} class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="email" type="email" placeholder="Email..." />
                                        {errors.email && <p class="text-red-500 text-xs italic">Không để trống!</p>}
                                    </div>
                                </div>
                                <div class="flex flex-wrap -mx-3 mb-6">
                                    <div class="w-full px-3">
                                        <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-password">
                                            Nội Dung
                                        </label>
                                        <textarea name="desc"  {...register("desc", { required: true })} class=" no-resize appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 h-48 resize-none" id="message"></textarea>
                                        {errors.desc && <p class="text-red-500 text-xs italic">Không để trống!</p>}
                                    </div>
                                </div>
                                <div class="md:flex md:items-center">
                                    <div class="md:w-1/3">
                                        <button class="shadow bg-red-600 hover:bg-red-800 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded" type="submit">
                                            Gửi
                                        </button>
                                    </div>
                                    <div class="md:w-2/3"></div>
                                </div>
                            </form>

                        </div>
                    </div>
                </div>
            </section>
        </div>



    )
}

export default ContactPage