import React, { useEffect } from 'react'

import { Carousel, Card, Tabs } from 'antd';
import { AppleOutlined, AndroidOutlined } from '@ant-design/icons';
import { useSelector, useDispatch } from 'react-redux'
import { getProducts } from '../slice/ProductSlice';
import { getCategory } from '../slice/CategorySlice';
import { Link } from 'react-router-dom'
import banner1 from '../../img/main-content-thongtin1.png'
import banner2 from '../../img/main-content-thongtin2.png'
import banner3 from '../../img/main-content-thongtin3.png'
import banner4 from '../../img/main-content-thongtin4.png'

const HomePage = () => {
    // require('react-dom');
    // window.React2 = require('react');

    // console.log(window.React1 === window.React2);

    const products = useSelector(data => data.products.value)
    const categories = useSelector(data => data.category.value)
    const dispatch = useDispatch()
    console.log('home', products);
    console.log('home', categories);
    const { Meta } = Card;
    const { TabPane } = Tabs;
    const productView = []
    const productNew = []

    if (products.length !== 0) {
        const data2 = [...products];
        console.log("d2", data2);

        const productSortView = data2.sort(function (a, b) {
            return b.view - a.view
        });

        for (let index = 0; index < 4; index++) {
            productView.push(productSortView[index])

        }
        for (let index = 1; index < 5; index++) {
            productNew.push(data2[data2.length - index])

        }
        console.log("View", productView);
        console.log("new", productNew);
    }




    useEffect(() => {
        console.log(123);
        dispatch(getCategory())
        dispatch(getProducts())

    }, [])

    return (




        <div className="leading-normal tracking-normal text-white gradient">

            <Carousel autoplay dotPosition={"top"}>
                <div className="pt-24">

                    <div className="container mt-4 px-3 mx-auto flex flex-wrap flex-col md:flex-row items-center ">
                        {/*Left Col*/}
                        <div className="flex flex-col w-full md:w-3/5 justify-center items-start text-center md:text-left">
                            {/* <p className="uppercase tracking-loose w-full">What business are you?</p> */}
                            <h1 className="my-4 text-5xl font-bold leading-tight">
                                Khuyến Mãi Lên Đến 50%!
                            </h1>
                            <p className="leading-normal text-2xl mb-8">
                                Áp dụng từ 18/3 - 25/3!
                            </p>
                            <button className="mx-auto lg:mx-0 hover:underline bg-white text-gray-800 font-bold rounded-full my-6 py-4 px-8 shadow-lg focus:outline-none focus:shadow-outline transform transition hover:scale-105 duration-300 ease-in-out">
                                Đặt Ngay
                            </button>
                        </div>
                        {/*Right Col*/}
                        <div className="w-full md:w-2/5 md:flex py-6 text-end justify-end">
                            {/* <img className="w-full md:w-4/5 z-50" src="hero.png" /> */}

                            <img className="w-full md:w-full h-64  " src={banner1} alt="" />
                        </div>
                    </div>

                </div>

                <div className="pt-24">

                    <div className="container mt-4 px-3 mx-auto flex flex-wrap flex-col md:flex-row items-center ">
                        {/*Left Col*/}
                        <div className="flex flex-col w-full md:w-3/5 justify-center items-start text-center md:text-left">
                            {/* <p className="uppercase tracking-loose w-full">What business are you?</p> */}
                            <h1 className="my-4 text-5xl font-bold leading-tight">
                                Khuyến Mãi Lên Đến 50%!
                            </h1>
                            <p className="leading-normal text-2xl mb-8">
                                Áp dụng từ 18/3 - 25/3!
                            </p>
                            <button className="mx-auto lg:mx-0 hover:underline bg-white text-gray-800 font-bold rounded-full my-6 py-4 px-8 shadow-lg focus:outline-none focus:shadow-outline transform transition hover:scale-105 duration-300 ease-in-out">
                                Đặt Ngay
                            </button>
                        </div>
                        {/*Right Col*/}
                        <div className="w-full md:w-2/5 md:flex py-6 text-end justify-end">
                            {/* <img className="w-full md:w-4/5 z-50" src="hero.png" /> */}

                            <img className="w-full md:w-full h-64  " src={banner2} alt="" />
                        </div>
                    </div>

                </div>

                <div className="pt-24">

                    <div className="container mt-4 px-3 mx-auto flex flex-wrap flex-col md:flex-row items-center ">
                        {/*Left Col*/}
                        <div className="flex flex-col w-full md:w-3/5 justify-center items-start text-center md:text-left">
                            {/* <p className="uppercase tracking-loose w-full">What business are you?</p> */}
                            <h1 className="my-4 text-5xl font-bold leading-tight">
                                Khuyến Mãi Lên Đến 50%!
                            </h1>
                            <p className="leading-normal text-2xl mb-8">
                                Áp dụng từ 18/3 - 25/3!
                            </p>
                            <button className="mx-auto lg:mx-0 hover:underline bg-white text-gray-800 font-bold rounded-full my-6 py-4 px-8 shadow-lg focus:outline-none focus:shadow-outline transform transition hover:scale-105 duration-300 ease-in-out">
                                Đặt Ngay
                            </button>
                        </div>
                        {/*Right Col*/}
                        <div className="w-full md:w-2/5 md:flex py-6 text-end justify-end">
                            {/* <img className="w-full md:w-4/5 z-50" src="hero.png" /> */}

                            <img className="w-full md:w-full h-64  " src={banner3} alt="" />
                        </div>
                    </div>

                </div>

            </Carousel>


            <div className="relative -mt-12 lg:-mt-24">
                <svg viewBox="0 0 1428 174" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
                    <g stroke="none" strokeWidth={1} fill="none" fillRule="evenodd">
                        <g transform="translate(-2.000000, 44.000000)" fill="#FFFFFF" fillRule="nonzero">
                            <path d="M0,0 C90.7283404,0.927527913 147.912752,27.187927 291.910178,59.9119003 C387.908462,81.7278826 543.605069,89.334785 759,82.7326078 C469.336065,156.254352 216.336065,153.6679 0,74.9732496" opacity="0.100000001" />
                            <path d="M100,104.708498 C277.413333,72.2345949 426.147877,52.5246657 546.203633,45.5787101 C666.259389,38.6327546 810.524845,41.7979068 979,55.0741668 C931.069965,56.122511 810.303266,74.8455141 616.699903,111.243176 C423.096539,147.640838 250.863238,145.462612 100,104.708498 Z" opacity="0.100000001" />
                            <path d="M1046,51.6521276 C1130.83045,29.328812 1279.08318,17.607883 1439,40.1656806 L1439,120 C1271.17211,77.9435312 1140.17211,55.1609071 1046,51.6521276 Z" id="Path-4" opacity="0.200000003" />
                        </g>
                        <g transform="translate(-4.000000, 76.000000)" fill="#FFFFFF" fillRule="nonzero">
                            <path d="M0.457,34.035 C57.086,53.198 98.208,65.809 123.822,71.865 C181.454,85.495 234.295,90.29 272.033,93.459 C311.355,96.759 396.635,95.801 461.025,91.663 C486.76,90.01 518.727,86.372 556.926,80.752 C595.747,74.596 622.372,70.008 636.799,66.991 C663.913,61.324 712.501,49.503 727.605,46.128 C780.47,34.317 818.839,22.532 856.324,15.904 C922.689,4.169 955.676,2.522 1011.185,0.432 C1060.705,1.477 1097.39,3.129 1121.236,5.387 C1161.703,9.219 1208.621,17.821 1235.4,22.304 C1285.855,30.748 1354.351,47.432 1440.886,72.354 L1441.191,104.352 L1.121,104.031 L0.457,34.035 Z" />
                        </g>
                    </g>
                </svg>

            </div>

            <section className="bg-white border-b py-8">
                <div className="container max-w-5xl mx-auto m-8">
                    <h1 className="w-full my-2 text-5xl font-bold leading-tight text-center text-gray-800">
                        Giới Thiệu
                    </h1>
                    <div className="w-full mb-4">
                        <div className="h-1 mx-auto gradient w-64 opacity-25 my-0 py-0 rounded-t" />
                    </div>
                    <div className="flex flex-wrap">
                        <div className="w-5/6 sm:w-1/2 p-6">
                            <h3 className="text-3xl text-gray-800 font-bold leading-none mb-3">
                                Thương Hiệu Đồ Ăn Nhanh FastFood
                            </h3>
                            <p className="text-gray-600 mb-8">
                                Chất lượng, uy tín là mục tiêu số 1 của FastFood. Khăng định vị thế của chuỗi đồ ăn nhanh số 1 Việt Nam!
                                <br />
                                <br />
                                Từ CEO vintph16172

                            </p>
                        </div>
                        <div className="w-full sm:w-1/2 p-6">

                            <img src={banner1} className="w-full sm:h-64 mx-auto" />
                        </div>
                    </div>
                    <div className="flex flex-wrap flex-col-reverse sm:flex-row">
                        <div className="w-full sm:w-1/2 p-6 mt-6">
                            <img src={banner4} className="w-full sm:h-64 mx-auto" />
                        </div>
                        <div className="w-full sm:w-1/2 p-6 mt-6">
                            <div className="align-middle">
                                <h3 className="text-3xl text-gray-800 font-bold leading-none mb-3">
                                    Thương Hiệu Đồ Ăn Nhanh FastFood
                                </h3>
                                <p className="text-gray-600 mb-8">
                                    Chất lượng, uy tín là mục tiêu số 1 của FastFood. Khăng định vị thế của chuỗi đồ ăn nhanh số 1 Việt Nam!
                                    <br />
                                    <br />
                                    Từ CEO vintph16172

                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>


            <section className="bg-white border-b py-8">
                <div className="container mx-auto flex flex-wrap pt-4 pb-12">
                    <h1 className="w-full my-2 text-5xl font-bold leading-tight text-center text-gray-800">
                        Sản Phẩm Hot Nhất
                    </h1>
                    <div className="w-full mb-4">
                        <div className="h-1 mx-auto gradient w-64 opacity-25 my-0 py-0 rounded-t" />
                    </div>

                    {productView?.map((item, index) =>
                        <div key={index} className="w-full md:w-1/4 p-6 flex flex-col flex-grow flex-shrink">
                            <Card
                                hoverable
                                // style={{ width: 378 }}
                                className={"flex-1 bg-white rounded-t rounded-b-none overflow-hidden shadow"}
                                cover={<Link to={`/products/${item._id}`}  ><img className="h-72" alt="example" src={item.image} /></Link>}
                            >
                                <Meta title={
                                    <div className="w-full font-bold text-xl text-gray-800 px-6">
                                        <Link className="font-bold text-xl text-gray-800  " to={`/products/${item._id}`} >{item.name}</Link>
                                    </div>
                                } description={
                                    <div className="">
                                        <p className="text-gray-800 text-base px-6 mb-5">
                                            <Link className="text-gray-800 text-base" to={`category/${item.category}`} >{categories.filter(cate => { return cate._id == item.category }).map((item2) => { return item2.name })}</Link>
                                        </p>

                                        <Link to={`products/${item._id}`} >
                                            <button className="mx-auto lg:mx-2 hover:underline gradient text-white font-bold rounded-full my-6 py-4 px-8 shadow-lg focus:outline-none focus:shadow-outline transform transition hover:scale-105 duration-300 ease-in-out">
                                                {item.price} VNĐ
                                            </button>
                                        </Link>
                                    </div>
                                }
                                />
                            </Card>
                        </div>
                    )}




                </div>
            </section>

            <section className="bg-white border-b py-8">
                <div className="container mx-auto flex flex-wrap pt-4 pb-12">
                    <h1 className="w-full my-2 text-5xl font-bold leading-tight text-center text-gray-800">
                        Sản Phẩm Mới Nhất
                    </h1>
                    <div className="w-full mb-4">
                        <div className="h-1 mx-auto gradient w-64 opacity-25 my-0 py-0 rounded-t" />
                    </div>

                    {productNew?.map((item, index) =>
                        <div key={index} className="w-full md:w-1/4 p-6 flex flex-col flex-grow flex-shrink">
                            <Card
                                hoverable
                                // style={{ width: 378 }}
                                className={"flex-1 bg-white rounded-t rounded-b-none overflow-hidden shadow"}
                                cover={<Link to={`/products/${item._id}`}  ><img className="h-72" alt="example" src={item.image} /></Link>}
                            >
                                <Meta title={
                                    <div className="w-full font-bold text-xl text-gray-800 px-6">
                                        <Link className="font-bold text-xl text-gray-800  " to={`/products/${item._id}`} >{item.name}</Link>
                                    </div>
                                } description={
                                    <div className="">
                                        <p className="text-gray-800 text-base px-6 mb-5">
                                            <Link className="text-gray-800 text-base" to={`category/${item.category}`} >{categories.filter(cate => { return cate._id == item.category }).map((item2) => { return item2.name })}</Link>
                                        </p>

                                        <Link to={`products/${item._id}`} >
                                            <button className="mx-auto lg:mx-2 hover:underline gradient text-white font-bold rounded-full my-6 py-4 px-8 shadow-lg focus:outline-none focus:shadow-outline transform transition hover:scale-105 duration-300 ease-in-out">
                                                {item.price} VNĐ
                                            </button>
                                        </Link>
                                    </div>
                                }
                                />
                            </Card>
                        </div>
                    )}




                </div>
            </section>


            <section className="bg-white border-b py-8">
                <div className="container mx-auto flex flex-wrap pt-4 pb-12">
                    <h1 className="w-full my-2 text-5xl font-bold leading-tight text-center text-gray-800">
                        Danh Mục
                    </h1>

                    <div className="w-full mb-4">
                        <div className="h-1 mx-auto gradient w-64 opacity-25 my-0 py-0 rounded-t" />
                    </div>
                    <div className="w-full md:w-full pt-0 p-6 flex flex-col flex-grow flex-shrink">
                        <Tabs defaultActiveKey="1" centered>
                            {categories?.map((item, index) => {
                                const productByCate = []
                                products.map(item2 => {
                                    if (item2.category == item._id) {
                                        productByCate.push(item2)
                                    }
                                })
                                console.log(productByCate);
                                const cateItem = []
                                if (productByCate.length >= 4) {
                                    for (let index = 0; index < 4; index++) {
                                        cateItem.push(productByCate[index])

                                    }
                                } else {
                                    for (let index = 0; index < productByCate.length; index++) {
                                        cateItem.push(productByCate[index])

                                    }
                                }

                                return <TabPane tab={<span className="pb-4">
                                    {item.name}
                                </span>} key={index + 1}>
                                    <div className="container mx-auto flex flex-wrap pt-4 pb-12">

                                        {cateItem?.map((item, index) =>
                                            <div className="w-full md:w-1/4 p-6 flex flex-col flex-grow flex-shrink">
                                                <Card
                                                    hoverable
                                                    // style={{ width: 378 }}
                                                    className={"flex-1 bg-white rounded-t rounded-b-none overflow-hidden shadow"}
                                                    cover={<Link to={`/products/${item._id}`}  ><img className="h-72" alt="example" src={item.image} /></Link>}
                                                >
                                                    <Meta title={
                                                        <div className="w-full font-bold text-xl text-gray-800 px-6">
                                                            <Link className="font-bold text-xl text-gray-800  " to={`/products/${item._id}`} >{item.name}</Link>
                                                        </div>
                                                    } description={
                                                        <div className="">
                                                            <p className="text-gray-800 text-base px-6 mb-5">
                                                                <Link className="text-gray-800 text-base" to={`category/${item.category}`} >{categories.filter(cate => { return cate._id == item.category }).map((item2) => { return item2.name })}</Link>
                                                            </p>

                                                            <Link to={`products/${item._id}`} >
                                                                <button className="mx-auto lg:mx-2 hover:underline gradient text-white font-bold rounded-full my-6 py-4 px-8 shadow-lg focus:outline-none focus:shadow-outline transform transition hover:scale-105 duration-300 ease-in-out">
                                                                    {item.price} VNĐ
                                                                </button>
                                                            </Link>
                                                        </div>
                                                    }
                                                    />
                                                </Card>
                                            </div>
                                        )}
                                        



                                    </div>
                                </TabPane>

                            })}

                            {/* <TabPane tab="Tab 2" key="2">
                                Content of Tab Pane 2
                            </TabPane>
                            <TabPane tab="Tab 3" key="3">
                                Content of Tab Pane 3
                            </TabPane> */}
                        </Tabs>

                    </div>







                </div>
            </section>



            

            {/* Change the colour #f8fafc to match the previous section colour */}
            <svg className="wave-top" viewBox="0 0 1439 147" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
                <g stroke="none" strokeWidth={1} fill="none" fillRule="evenodd">
                    <g transform="translate(-1.000000, -14.000000)" fillRule="nonzero">
                        <g className="wave" fill="#f8fafc">
                            <path d="M1440,84 C1383.555,64.3 1342.555,51.3 1317,45 C1259.5,30.824 1206.707,25.526 1169,22 C1129.711,18.326 1044.426,18.475 980,22 C954.25,23.409 922.25,26.742 884,32 C845.122,37.787 818.455,42.121 804,45 C776.833,50.41 728.136,61.77 713,65 C660.023,76.309 621.544,87.729 584,94 C517.525,105.104 484.525,106.438 429,108 C379.49,106.484 342.823,104.484 319,102 C278.571,97.783 231.737,88.736 205,84 C154.629,75.076 86.296,57.743 0,32 L0,0 L1440,0 L1440,84 Z" />
                        </g>
                        <g transform="translate(1.000000, 15.000000)" fill="#FFFFFF">
                            <g transform="translate(719.500000, 68.500000) rotate(-180.000000) translate(-719.500000, -68.500000) ">
                                <path d="M0,0 C90.7283404,0.927527913 147.912752,27.187927 291.910178,59.9119003 C387.908462,81.7278826 543.605069,89.334785 759,82.7326078 C469.336065,156.254352 216.336065,153.6679 0,74.9732496" opacity="0.100000001" />
                                <path d="M100,104.708498 C277.413333,72.2345949 426.147877,52.5246657 546.203633,45.5787101 C666.259389,38.6327546 810.524845,41.7979068 979,55.0741668 C931.069965,56.122511 810.303266,74.8455141 616.699903,111.243176 C423.096539,147.640838 250.863238,145.462612 100,104.708498 Z" opacity="0.100000001" />
                                <path d="M1046,51.6521276 C1130.83045,29.328812 1279.08318,17.607883 1439,40.1656806 L1439,120 C1271.17211,77.9435312 1140.17211,55.1609071 1046,51.6521276 Z" opacity="0.200000003" />
                            </g>
                        </g>
                    </g>
                </g>
            </svg>

            <section className="container mx-auto text-center pb-6  py-6 mb-12">
                <h1 className="w-full my-2 text-5xl font-bold leading-tight text-center text-white">
                    Call to Action
                </h1>
                <div className="w-full mb-4">
                    <div className="h-1 mx-auto bg-white w-1/6 opacity-25 my-0 py-0 rounded-t" />
                </div>
                <h3 className="my-4 text-3xl leading-tight">
                   Đặt Hàng Ngay Để Nhận Nhiều Ưu Đãi!
                </h3>
                <button className="mx-auto lg:mx-0 hover:underline bg-white text-gray-800 font-bold rounded-full my-6 py-4 px-8 shadow-lg focus:outline-none focus:shadow-outline transform transition hover:scale-105 duration-300 ease-in-out">
                    Đặt Ngay!
                </button>
            </section>
        </div>
    )
}

export default HomePage