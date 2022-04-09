import React, { useState, useEffect } from 'react'
import { NavLink, Link } from 'react-router-dom';
import { Drawer, Button, Menu, Dropdown, Row, Col, Space, List, Avatar } from 'antd';
import { DownOutlined, PlusOutlined, ShoppingCartOutlined, MinusOutlined, DeleteOutlined } from '@ant-design/icons';
import { useSelector, useDispatch } from 'react-redux'
import { CartLocal } from '../features/utils/localstorage'
import { changeCartItem, changeTotalQuantity, addItemToCart, removeItemFromCart, decreaseQty, increaseQty } from '../features/slice/CartSlice';

const Navbar = () => {
    const cart = useSelector(data => data.cart.items)
    const totalQuantity = useSelector(data => data.cart.totalQuantity)
    const dispatch = useDispatch()
    let totalProduct = 0
    if (cart.length !== 0) {
        cart.forEach((product) => {
            totalProduct += product.price * product.quantity
        })
    }
    // const cart = CartLocal()
    console.log("Navbar", cart);
    console.log("Navbar-TotalQuantity", totalQuantity);
    const [visible, setVisible] = useState(false);

    const showDrawer = () => {
        setVisible(true);
    };

    const onClose = () => {
        setVisible(false);
    };


    useEffect(() => {
        dispatch(changeCartItem(CartLocal()))
        let totalQuantityCart = 0
        for (let index = 0; index < cart.length; index++) {

            totalQuantityCart += cart[index].quantity
        }
        console.log("Navbar-totalQuantity", totalQuantityCart);
        // dispatch(changeTotalQuantity())
    }, [])




    return (
        <div className="w-full flex-grow lg:flex lg:items-center lg:w-auto hidden mt-2 lg:mt-0 bg-white lg:bg-transparent text-black p-4 lg:p-0 z-20" id="nav-content">
            <ul className="list-reset lg:flex justify-end flex-1 items-center">

                <li className="mr-3">
                    <NavLink to='/' className="inline-block py-2 px-4 text-black  no-underline" >Trang Chủ</NavLink>
                    {/* <a className="inline-block py-2 px-4 text-black font-bold no-underline" href="#">Active</a> */}
                </li>
                <li className="mr-3">
                    <NavLink to='/products' className="inline-block py-2 px-4 text-black  no-underline" >Sản Phẩm</NavLink>
                    {/* <a className="inline-block text-black no-underline hover:text-gray-800 hover:text-underline py-2 px-4" href="#">link</a> */}
                </li>
                <li className="mr-3">
                    <NavLink to='/category' className="inline-block py-2 px-4 text-black  no-underline" >Danh Mục</NavLink>
                    {/* <NavDropdown title="Dropdown" id="basic-nav-dropdown">
          <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
          <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
          <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
          <NavDropdown.Divider />
          <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
        </NavDropdown> */}
                    {/* <a className="inline-block text-black no-underline hover:text-gray-800 hover:text-underline py-2 px-4" href="#">link</a> */}
                </li>
            </ul>
            {/* <button
                id="navAction"
                className="mx-auto lg:mx-0 hover:underline bg-white text-gray-800 font-bold rounded-full mt-4 lg:mt-0 py-4 px-8 shadow opacity-75 focus:outline-none focus:shadow-outline transform transition hover:scale-105 duration-300 ease-in-out"
            >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
            </button> */}
            {/* <Dropdown overlay={menu}>
               
                <svg onClick={e => e.preventDefault()} xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
            </Dropdown> */}
            <>
                <Button type="text" icon={<ShoppingCartOutlined />} onClick={showDrawer}>

                </Button>
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

                        <Menu.Item danger>{totalProduct} VNĐ</Menu.Item>
                        <Button type="primary" block>
                            <Link to={`/checkout`} >Thanh Toán</Link>
                        </Button>
                    </Menu>
                </Drawer>
            </>
        </div>
    )
}

export default Navbar