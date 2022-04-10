import React, { useEffect } from 'react'
import { List, Typography, Row, Col, Card, Space, Table, Button, Input, Avatar, Tag } from 'antd';
import { useSelector, useDispatch } from 'react-redux'
import { getCartDetail, getDetailCartByID } from '../slice/CartSlice'
import { Link, useParams, useLocation, useSearchParams, useNavigate } from 'react-router-dom'
import { SearchOutlined } from '@ant-design/icons';
import { changeUserValue } from '../slice/UserSlice'

import { getCategory } from '../slice/CategorySlice';
import { CartLocal, isAthenticate } from '../utils/localstorage'
import { deleteProducts, getProducts, onSelected, addId, changeBreadcrumb } from '../slice/ProductSlice';

const OrderHistory = () => {
    const userData = useSelector(data => data.user.value)
    const order = useSelector(data => data.cart.orderHistory)
    const products = useSelector(data => data.products.value)
    const categories = useSelector(data => data.category.value)
    const { user } = isAthenticate()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { id } = useParams();
    const { Meta } = Card;

    console.log("Order", order);
    console.log("User", userData);
    console.log("Product", products);
    console.log(id);

    const columns = [
        {
            title: "STT", dataIndex: "key", key: "key",
            sorter: (record1, record2) => { return record1.key > record2.key },

        },
        {
            title: "ID", dataIndex: "_id", key: "_id",
            filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => {
                return <div className="">
                    <Input
                        autoFocus
                        placeholder='Tìm Tên Sản Phẩm'
                        value={selectedKeys[0]}
                        onChange={(e) => {
                            setSelectedKeys(e.target.value ? [e.target.value] : [])
                            confirm({ closeDropDown: false })
                        }}
                        onPressEnter={() => { confirm() }}
                        onBlur={() => { confirm() }}


                    >

                    </Input>
                    <Button onClick={() => clearFilters()} type="primary" danger >Reset</Button>
                </div>
            },
            filterIcon: () => {
                return <SearchOutlined />
            },
            onFilter: (value, record) => {
                return record._id.toLowerCase().includes(value.toLowerCase())
            }
        },
        {
            title: "Name", dataIndex: "name", key: "name",
            filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => {
                return <div className="">
                    <Input
                        autoFocus
                        placeholder='Tìm Tên Sản Phẩm'
                        value={selectedKeys[0]}
                        onChange={(e) => {
                            setSelectedKeys(e.target.value ? [e.target.value] : [])
                            confirm({ closeDropDown: false })
                        }}
                        onPressEnter={() => { confirm() }}
                        onBlur={() => { confirm() }}


                    >

                    </Input>
                    <Button onClick={() => clearFilters()} type="primary" danger >Reset</Button>
                </div>
            },
            filterIcon: () => {
                return <SearchOutlined />
            },
            onFilter: (value, record) => {
                return record.name.toLowerCase().includes(value.toLowerCase())
            }


        },
        {
            title: "Địa Chỉ", dataIndex: "address", key: "address",



        },
        {
            title: "Số Điện Thoại", dataIndex: "phone", key: "phone",

        },
        {
            title: "Tổng Giá", dataIndex: "total", key: "total",
            sorter: (record1, record2) => { return record1.total > record2.total }
        },
        {
            title: "Trạng Thái", dataIndex: "status", key: "status",

            filters: [
                { text: "Đang Giao Hàng", value: "Đang Giao Hàng" },
                { text: "Giao Hàng Thành Công", value: "Giao Hàng Thành Công" }
            ],
            onFilter: (value, record) => {
                return record.status == value
            }
        },
        Table.EXPAND_COLUMN,


        {
            title: "Hành Động", key: "action", render: (text, record) => (
                <Space align="center" size="middle">
                    <Button type="primary" danger onClick={() => dispatch(deleteProducts(record._id))}>
                        Xóa
                    </Button>
                </Space>
            ),
        }
    ]

    const columns2 = [
        {
            title: "STT", dataIndex: "key", key: "key",
            sorter: (record1, record2) => { return record1.key > record2.key },
        },
        { title: "ID", dataIndex: "_id", key: "_id" },
        {
            title: "Ảnh", dataIndex: "image", key: "image", render: (text, record) => (
                <img className="w-28 " src={record.image} />
            ),
        },
        {
            title: "Name", dataIndex: "name", key: "name",
            filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => {
                return <div className="">
                    <Input
                        autoFocus
                        placeholder='Tìm Tên Sản Phẩm'
                        value={selectedKeys[0]}
                        onChange={(e) => {
                            setSelectedKeys(e.target.value ? [e.target.value] : [])
                            confirm({ closeDropDown: false })
                        }}
                        onPressEnter={() => { confirm() }}
                        onBlur={() => { confirm() }}


                    >

                    </Input>
                    <Button onClick={() => clearFilters()} type="primary" danger >Reset</Button>
                </div>
            },
            filterIcon: () => {
                return <SearchOutlined />
            },
            onFilter: (value, record) => {
                return record.name.toLowerCase().includes(value.toLowerCase())
            }


        },
        {
            title: "Category", dataIndex: "category", key: "category",
            filters: categories.map(item => { return { text: item.name, value: item.name } }),
            onFilter: (value, record) => {
                return record.category == value
            }


        },
        {
            title: "Price", dataIndex: "price", key: "price",
            sorter: (record1, record2) => { return record1.price > record2.price }
        },
        {
            title: "Số Lượng", dataIndex: "quantity", key: "quantity",

        },
        {
            title: "Tổng Giá", dataIndex: "total", key: "total",

        }





    ]


    const dataTable = order?.cart?.map((item, index) => { return { key: index + 1, _id: item._id, name: item.name, address: item.address, phone: item.phone, total: item.total + " VNĐ", status: item.status == 0 ? "Đang Giao Hàng" : "Giao Hàng Thành Công" } })

    // order?.cart?.map(cart => {
    //     order.detailCart.map(item => {
    //         if (cart._id == item.cart._id) {

    //             detailCart.push(item)
    //             console.log("detailCart", detailCart);
    //             return products.map(item2 => {
    //                 if (item.product == item2._id) {
    //                     const DetailCartTable = detailCart.map((item, index) => { return { key: index + 1, _id: item._id, image: item2.image, name: item2.name, category: categories.filter(cate => { return cate._id == item2.category }).map((item3) => { return item3.name }), price: item2.price, quantity: item.quantity, total: item.total } })
    //                     console.log(DetailCartTable);
    //                 }
    //             })

    //         }
    //     })
    // })





    useEffect(() => {

        dispatch(changeUserValue(isAthenticate()))
        dispatch(getCartDetail(user.email))
        dispatch(getCategory())
        dispatch(getProducts())


    }, [])

    return (
        <div>

            <Table className="mt-28 mx-6"

                expandable={{
                    expandedRowRender: record => {

                        // return order.detailCart.map(item => {
                        //     if (record._id == item.cart._id) {
                        //         // dispatch(getDetailCartByID(item._id))
                        //         // .then((result)=>{
                        //         //    console.log(result.payload);
                        //         // })
                        //         const data = [

                        //         ];
                        //         data.push(item)

                        //         return <List
                        //             header={<div>Header</div>}
                        //             footer={<div>Footer</div>}
                        //             bordered
                        //             dataSource={data}
                        //             renderItem={item => (
                        //                 <List.Item>
                        //                     <Typography.Text mark>[ITEM]</Typography.Text> {item._id}
                        //                 </List.Item>
                        //             )}
                        //         />
                        //     }
                        // })


                        return order.detailCart.map(item => {

                            const detailCart = []
                            if (record._id == item.cart._id) {

                                detailCart.push(item)
                                console.log("detailCart", detailCart);
                                return products.map(item2 => {
                                    if (item.product == item2._id) {
                                        const DetailCartTable = detailCart.map((item, index) => { return { key: index + 1, _id: item._id, image: item2.image, name: item2.name, category: categories.filter(cate => { return cate._id == item2.category }).map((item3) => { return item3.name }), price: item2.price, quantity: item.quantity, total: item.total } })
                                        return <Table className="m-6"

                                            // pagination={{ position: none }}
                                            dataSource={DetailCartTable}
                                            columns={columns2}
                                            bordered
                                            // title={() => 'Header'}
                                            footer={() => { return <span>Hiển thị 10/{products.length}</span> }}
                                        />

                                      

                                    }
                                })

                            }
                        })





                    }


                }}
                dataSource={dataTable}
                columns={columns}
                bordered
                // title={() => 'Header'}
                footer={() => { return <span>Hiển thị 10/{products.length}</span> }}
            />

        </div>
    )
}

export default OrderHistory