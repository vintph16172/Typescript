import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react';
import { deleteProducts, getProducts, addId, changeBreadcrumb } from '../../../slice/ProductSlice';
import { Link } from 'react-router-dom'
import { Row, Col, Space, Table, Button, Input, Avatar } from 'antd';
import { SearchOutlined,EnvironmentOutlined,CheckCircleOutlined } from '@ant-design/icons';
import { getCategory } from '../../../slice/CategorySlice';
import AdminPageHeader from '../../../../compoments/AdminPageHeader';
import { isAthenticate } from '../../../utils/localstorage'
import { changeUserValue } from '../../../slice/UserSlice';
import { onSelected, getCarts, getDetailCarts, editCarts } from "../../../slice/CartSlice"


const ListCart = () => {
    const products = useSelector(data => data.products.value)
    const categories = useSelector(data => data.category.value)
    const selected = useSelector(data => data.cart.selected)
    const arr = useSelector(data => data.products.arr)
    const breadcrumb = useSelector(data => data.products.breadcrumb)
    const user = useSelector(data => data.user.value)
    const cart = useSelector(data => data.cart.listCart)
    const cartDetail = useSelector(data => data.cart.listDetailCart)

    console.log("Cart", cart);
    console.log("CartDetail", cartDetail);
    console.log("User", user);
    const dispatch = useDispatch()
    const hasSelected = selected.length > 0;

    console.log("Admin Products", products);
    console.log("Admin Products cate", categories);
    console.log("Admin Products  Selected", selected);

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
            title: "Email", dataIndex: "email", key: "email",

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
                    {record.status !== "Đang Giao Hàng" ? <Button type="primary" className='btn-update' onClick={() => {
                        const recordUpdate = record
                        recordUpdate.status = 0
                        console.log(recordUpdate);
                        dispatch(editCarts(recordUpdate))
                    }}>
                        <CheckCircleOutlined /> 0
                    </Button> : <Button type="primary"  className='btn-update' onClick={() => {
                        const recordUpdate = record
                        recordUpdate.status = 1
                        console.log(recordUpdate);
                        dispatch(editCarts(recordUpdate))
                    }}>
                        <EnvironmentOutlined /> 1
                    </Button>}


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

    const dataTable = cart?.map((item, index) => { return { key: index + 1, _id: item._id, name: item.name,email: item.email, address: item.address, phone: item.phone, total: item.total + " VNĐ", status: item.status == 0 ? "Đang Giao Hàng" : "Giao Hàng Thành Công" } })

    useEffect(() => {
        dispatch(getCarts())
        dispatch(getDetailCarts())
        dispatch(getProducts())
        dispatch(getCategory())
        dispatch(changeBreadcrumb("Đơn Hàng"))
        dispatch(changeUserValue(isAthenticate()))
    }, [])

    return (
        <div className="container">
            <AdminPageHeader />

            <span style={{ marginLeft: 8 }}>
                {hasSelected ? `Đã chọn ${selected.length} hàng` : ''}
            </span>

            {selected.length > 0 ? <Button type="primary" danger onClick={() => deleteProducts(arr)}>
                Xóa Hết
            </Button> : ""}


            <Table className="mt-28 mx-6"
                rowSelection={{

                    selectedRowKeys: selected,
                    onChange: (keys) => {
                        console.log(keys);
                        dispatch(onSelected(keys))

                    },
                    onSelect: (record) => {

                        console.log(record);

                    },

                    selections: [
                        Table.SELECTION_ALL,
                        Table.SELECTION_INVERT,
                        Table.SELECTION_NONE,
                        {
                            key: "odd",
                            text: "Số Lẻ",
                            onSelect: changableRowKeys => {
                                let newSelectedRowKeys = [];
                                newSelectedRowKeys = changableRowKeys.filter((key, index) => {
                                    if (index % 2 !== 0) {
                                        return false;
                                    }
                                    return true;
                                });
                                // this.setState({ selectedRowKeys: newSelectedRowKeys });

                                dispatch(onSelected(newSelectedRowKeys))
                                console.log(selected);

                            },

                        },
                        {
                            key: "even",
                            text: "Số Chẵn",
                            onSelect: changableRowKeys => {
                                let newSelectedRowKeys = [];
                                newSelectedRowKeys = changableRowKeys.filter((key, index) => {
                                    if (index % 2 !== 0) {
                                        return true;
                                    }
                                    return false;
                                });
                                // this.setState({ selectedRowKeys: newSelectedRowKeys });

                                dispatch(onSelected(newSelectedRowKeys))
                                console.log(selected);

                            },

                        }
                    ]
                }}
                expandable={{
                    expandedRowRender: record => {

                        return cartDetail.map(item => {
                            const detailCart = []
                            if (record._id == item.cart) {
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

export default ListCart