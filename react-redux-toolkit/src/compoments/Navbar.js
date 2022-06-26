import React, { useState, useEffect } from 'react'
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { Drawer, Button, Menu, Dropdown, Row, Col, Space, List, Avatar, Badge, Image, Form, Input } from 'antd';
import { DownOutlined, PlusOutlined, ShoppingCartOutlined, MinusOutlined, DeleteOutlined, LoginOutlined, SearchOutlined } from '@ant-design/icons';
import { useSelector, useDispatch } from 'react-redux'
import { CartLocal, isAthenticate } from '../features/utils/localstorage'
import { changeCartItem, changeTotalQuantity, addItemToCart, removeItemFromCart, decreaseQty, increaseQty } from '../features/slice/CartSlice';
import { getCategory } from '../features/slice/CategorySlice'
import { changeUserValue, logOut } from '../features/slice/UserSlice'

const Navbar = () => {
    const category = useSelector(data => data.category.value)
    const cart = useSelector(data => data.cart.items)
    const totalQuantity = useSelector(data => data.cart.totalQuantity)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const user = useSelector(data => data.user.value)
    let totalProduct = 0
    if (cart?.length !== 0) {
        cart?.forEach((product) => {
            totalProduct += product.price * product.quantity
        })
    }
    // const cart = CartLocal()
    console.log("Navbar", cart);
    console.log("Navbar-Cate", category);
    console.log("Navbar-User", user);
    console.log("Navbar-TotalQuantity", totalQuantity);
    const [visible, setVisible] = useState(false);

    const showDrawer = () => {
        setVisible(true);
    };

    const onClose = () => {
        setVisible(false);
    };

    const menu = (
        <Menu>
            {category?.map(item =>
                <Menu.Item>
                    <NavLink to={`/category/${item._id}`} className="inline-block py-2 px-4 text-black  no-underline" >{item.name}</NavLink>
                </Menu.Item>
            )}

        </Menu>
    );

    const userMenu = (
        <Menu>
            <Menu.Item>
                <NavLink to={`/users/${user?.user ? user.user._id : ""}`} className="inline-block py-2 px-4 text-black  no-underline" >Thông Tin Tài Khoản</NavLink>
            </Menu.Item>
            <Menu.Item>
                <NavLink to={`/order/${user?.user ? user.user._id : ""}`} className="inline-block py-2 px-4 text-black  no-underline" >Lịch sử Mua Hàng</NavLink>
            </Menu.Item>
            <Menu.Item>
                <NavLink to={`/admin/products`} className="inline-block py-2 px-4 text-black  no-underline" >Quản Trị</NavLink>
            </Menu.Item>
            <Menu.Item>
                <Button type="text" onClick={() => dispatch(logOut())} icon={<LoginOutlined />} >Đăng Xuất</Button>
            </Menu.Item>

        </Menu>
    );

    const onFinish = (values) => {
        console.log("Value", values);
        navigate(`/products?name=${values.search}`)

    };

   
    useEffect(() => {
        dispatch(changeCartItem(CartLocal()))
        dispatch(getCategory())
        dispatch(changeUserValue(isAthenticate()))
        // let totalQuantityCart = 0
        // for (let index = 0; index < cart.length; index++) {

        //     totalQuantityCart += cart[index].quantity
        // }
        // console.log("Navbar-totalQuantity", totalQuantityCart);
        // dispatch(changeTotalQuantity())
    }, [])




    return (
        <div>
            <div className="w-full flex-grow lg:flex lg:items-center lg:w-auto hidden mt-2 lg:mt-0 bg-white lg:bg-transparent text-black p-4 lg:p-0 z-20" id="nav-content">
                <ul className="list-reset lg:flex justify-end flex-1 items-center">

                    <li className="mr-3">
                        <NavLink to='/' className="inline-block py-2 px-4 text-black  no-underline" >Trang Chủ</NavLink>

                    </li>
                    <li className="mr-3">

                        <Dropdown overlay={menu}>
                            <NavLink to='/products' className="inline-block py-2 px-4 text-black  no-underline" >Sản Phẩm</NavLink>
                        </Dropdown>
                    </li>
                    <li className="mr-3">
                        <NavLink to='/contact' className="inline-block py-2 px-4 text-black  no-underline" >Liên Hệ</NavLink>

                    </li>
                  


                    {user?.user ? <Dropdown overlay={userMenu}>
                        <div>
                            <span className="inline-block py-2 px-4 text-black  no-underline">{user.user.name}</span>
                            <Avatar src={user.user.avatar} style={{ width: 32 }} />
                        </div>
                    </Dropdown> : <Link to={`/signin`} >Đăng Nhập</Link>

                    }

                    <Badge className="avatar-item" count={cart ? cart.length : ""}>
                        <Button className="h-6 w-6" type="text" icon={<ShoppingCartOutlined />} onClick={showDrawer}>

                        </Button>
                    </Badge>

                </ul>



                <>

                    <Drawer title={<p className="m-0">Giỏ Hàng <ShoppingCartOutlined /></p>} placement="right" onClose={onClose} visible={visible}>
                        <Menu>

                            <List
                                itemLayout="horizontal"
                                dataSource={cart}
                                renderItem={item => (
                                    <List.Item>
                                        <List.Item.Meta
                                            avatar={<Avatar shape="square" size={50} src={item.image} />}
                                            title={<Link to={`/products/${item._id}`} >{item.name}</Link>}
                                            description={
                                                <div>
                                                    <p>{item.price} VNĐ</p>
                                                    <Button onClick={() => dispatch(increaseQty(item))} className='inline-block' type="text" icon={<PlusOutlined />} ></Button>
                                                    <p className='inline-block' >{item.quantity}</p>
                                                    <Button onClick={() => dispatch(decreaseQty(item))} className='inline-block' type="text" icon={<MinusOutlined />} ></Button>

                                                </div>
                                            }
                                        />
                                        <div><Button onClick={() => dispatch(removeItemFromCart(item._id))} className='inline-block' type="text" danger icon={<DeleteOutlined />} ></Button></div>
                                    </List.Item>
                                )}
                            />

                            <Menu.Item >Tổng Cộng: {totalProduct} VNĐ</Menu.Item>
                            <Button type="primary" block>
                                <Link to={`/checkout`} >Thanh Toán</Link>
                            </Button>
                        </Menu>
                    </Drawer>
                </>
            </div>

            <div className="w-full flex-grow lg:flex lg:items-center lg:w-auto hidden mt-2 lg:mt-0 bg-white lg:bg-transparent text-black p-4 lg:p-0 z-20" id="nav-search" >
                <Form 
                    className='list-reset lg:flex justify-end flex-1 items-center'
                    size='small' name="horizontal_login" layout="inline" onFinish={onFinish}>
                    <Form.Item
                        name="search"
                       
                    >
                        <Input prefix={<SearchOutlined className="site-form-item-icon" />} placeholder="Tìm Kiếm..." />
                    </Form.Item>

                    <Form.Item shouldUpdate>
                        {() => (
                            <Button
                                type="primary"
                                htmlType="submit"

                            >
                                <SearchOutlined />
                            </Button>
                        )}
                    </Form.Item>
                </Form>


            </div>

        </div>
    )
}

export default Navbar