import React, { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { listUserDetail } from '../../api/user'
import { Image, Carousel, Row, Col, Card, List } from 'antd';
import { changeDetail } from '../slice/UserSlice';

import { changeCartItem,addItemToCart } from '../slice/CartSlice';
import { Link } from 'react-router-dom'
import { CartLocal } from '../utils/localstorage'




const UserProfile = () => {
    const userDetail = useSelector(data => data.user.detail)
    const dispatch = useDispatch()
    const { id } = useParams();
    console.log("id",id);
    console.log("UserDetail",userDetail);

    useEffect(() => {
        const getUserDetail = async () => {
            const {data} = await listUserDetail(id)
            dispatch(changeDetail(data))
        }
        getUserDetail()
    },[id])

    return (
        <div class="bg-gray-100 mt-28 py-2">
            <div class="container mx-auto mb-5 p-5">
                <div class="md:flex no-wrap md:-mx-2 ">

                    <div class="w-full md:w-3/12 md:mx-2">

                        <div class="bg-white p-3 border-t-4 border-green-400">
                            <div class="image overflow-hidden">
                                <img class="h-auto w-full mx-auto"
                                    src={userDetail.avatar}
                                    alt="" />
                            </div>
                            <h1 class="text-gray-900 font-bold text-xl leading-8 my-1">{userDetail.name}</h1>
                            <h3 class="text-gray-600 font-lg text-semibold leading-6">Owner at Her Company Inc.</h3>
                            <p class="text-sm text-gray-500 hover:text-gray-600 leading-6">Lorem ipsum dolor sit amet
                                consectetur adipisicing elit.
                                Reprehenderit, eligendi dolorum sequi illum qui unde aspernatur non deserunt</p>
                            <ul
                                class="bg-gray-100 text-gray-600 hover:text-gray-700 hover:shadow py-2 px-3 mt-3 divide-y rounded shadow-sm">
                                <li class="flex items-center py-3">
                                    <span>Chức Vụ</span>
                                    <span class="ml-auto"><span
                                        class="bg-green-500 py-1 px-2 rounded text-white text-sm">{userDetail.role == 0? "Người Dùng":"Admin"}</span></span>
                                </li>
                                <li class="flex items-center py-3">
                                    <span>Tham Gia Từ</span>
                                    <span class="ml-auto">{userDetail.createdAt}</span>
                                </li>
                            </ul>
                        </div>

                        <div class="my-4"></div>

                       

                    </div>

                    <div class="w-full md:w-9/12 mx-2 h-64">

                        <div class="bg-white p-3 shadow-sm rounded-sm">
                            <div class="flex items-center space-x-2 font-semibold text-gray-900 leading-8">
                                <span clas="text-green-500">
                                    <svg class="h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                        stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                    </svg>
                                </span>
                                <span class="tracking-wide">Thông Tin Cá Nhân</span>
                            </div>
                            <div class="text-gray-700">
                                <div class="grid md:grid-cols-2 text-sm">
                                    <div class="grid grid-cols-2">
                                        <div class="px-4 py-2 font-semibold">Tên Tài Khoản</div>
                                        <div class="px-4 py-2">{userDetail.name}</div>
                                    </div>
                                    <div class="grid grid-cols-2">
                                        <div class="px-4 py-2 font-semibold">Email.</div>
                                        <div class="px-4 py-2">
                                            <a class="text-blue-800" href="mailto:jane@example.com">{userDetail.email}</a>
                                        </div>
                                    </div>
                                    <div class="grid grid-cols-2">
                                        <div class="px-4 py-2 font-semibold">Địa Chỉ</div>
                                        <div class="px-4 py-2">{userDetail.address}</div>
                                    </div>
                                    <div class="grid grid-cols-2">
                                        <div class="px-4 py-2 font-semibold">Số Điện Thoại</div>
                                        <div class="px-4 py-2">{userDetail.phone}</div>
                                    </div>
                                    
                                </div>
                            </div>
                            <button
                                class="block w-full text-blue-800 text-sm font-semibold rounded-lg hover:bg-gray-100 focus:outline-none focus:shadow-outline focus:bg-gray-100 hover:shadow-xs p-3 my-4">
                                Sửa Thông Tin</button>
                        </div>


                        <div class="my-4"></div>


                        <div class="bg-white p-3 shadow-sm rounded-sm">

                            <div class="grid grid-cols-2">
                                <div>
                                    <div class="flex items-center space-x-2 font-semibold text-gray-900 leading-8 mb-3">
                                        <span clas="text-green-500">
                                            <svg class="h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                                stroke="currentColor">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                            </svg>
                                        </span>
                                        <span class="tracking-wide">Experience</span>
                                    </div>
                                    <ul class="list-inside space-y-2">
                                        <li>
                                            <div class="text-teal-600">Owner at Her Company Inc.</div>
                                            <div class="text-gray-500 text-xs">March 2020 - Now</div>
                                        </li>
                                        <li>
                                            <div class="text-teal-600">Owner at Her Company Inc.</div>
                                            <div class="text-gray-500 text-xs">March 2020 - Now</div>
                                        </li>
                                        <li>
                                            <div class="text-teal-600">Owner at Her Company Inc.</div>
                                            <div class="text-gray-500 text-xs">March 2020 - Now</div>
                                        </li>
                                        <li>
                                            <div class="text-teal-600">Owner at Her Company Inc.</div>
                                            <div class="text-gray-500 text-xs">March 2020 - Now</div>
                                        </li>
                                    </ul>
                                </div>
                                <div>
                                    <div class="flex items-center space-x-2 font-semibold text-gray-900 leading-8 mb-3">
                                        <span clas="text-green-500">
                                            <svg class="h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                                stroke="currentColor">
                                                <path fill="#fff" d="M12 14l9-5-9-5-9 5 9 5z" />
                                                <path fill="#fff"
                                                    d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                    d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" />
                                            </svg>
                                        </span>
                                        <span class="tracking-wide">Education</span>
                                    </div>
                                    <ul class="list-inside space-y-2">
                                        <li>
                                            <div class="text-teal-600">Masters Degree in Oxford</div>
                                            <div class="text-gray-500 text-xs">March 2020 - Now</div>
                                        </li>
                                        <li>
                                            <div class="text-teal-600">Bachelors Degreen in LPU</div>
                                            <div class="text-gray-500 text-xs">March 2020 - Now</div>
                                        </li>
                                    </ul>
                                </div>
                            </div>

                        </div>

                    </div>
                </div>
            </div>
        </div >
    )
}

export default UserProfile