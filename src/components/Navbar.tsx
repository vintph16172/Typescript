import React from 'react'
import { NavLink } from 'react-router-dom';
import { NavDropdown } from 'react-bootstrap'

type Props = {}

const Navbar = (props: Props) => {
  return (
    // <ul className="navbar-nav me-auto mb-2 mb-lg-0">
    //   <li className="nav-item">
    //     <NavLink className="nav-link active" aria-current="page" to="/">Home</NavLink>
    //   </li>
    //   <li className="nav-item">
    //     <NavLink className="nav-link" to="/product">Product </NavLink>
    //   </li>
    //   <li className="nav-item">
    //     <NavLink className="nav-link" to="/about">About </NavLink>
    //   </li>
    // </ul>
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
      <button
        id="navAction"
        className="mx-auto lg:mx-0 hover:underline bg-white text-gray-800 font-bold rounded-full mt-4 lg:mt-0 py-4 px-8 shadow opacity-75 focus:outline-none focus:shadow-outline transform transition hover:scale-105 duration-300 ease-in-out"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      </button>
    </div>
  )
}

export default Navbar