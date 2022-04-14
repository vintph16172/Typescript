import React from 'react';

import { Navigate, NavLink, Route, Routes } from 'react-router-dom'

import './App.css';
import HomePage from './features/page/HomePage';
import WebsiteLayout from './features/layout/WebsiteLayout';
import ListProduct from './features/page/admin/product/ListProduct';
import PrivateRoute from './compoments/PrivateRoute'
import AdminLayout from './features/layout/AdminLayout';
import ProductEdit from './features/page/admin/product/ProductEdit';
import SignIn from './features/page/SignIn';
import SignUp from './features/page/SignUp';

import ProductAdd from './features/page/admin/product/ProductAdd';
import ProductDetail from './features/page/ProductDetail';
import ProductPage from './features/page/ProductPage';
import CategoryPage from './features/page/CategoryPage';
import FormCheckOut from './features/page/FormCheckOut';
import OrderHistory from './features/page/OrderHistory'
import ListCategory from './features/page/admin/category/ListCategory';
import CategoryAdd from './features/page/admin/category/CategoryAdd';
import CategoryEdit from './features/page/admin/category/CategoryEdit';
import ListUser from './features/page/admin/user/ListUser'
import ListCart from './features/page/admin/cart/ListCart';
import UserProfile from './features/page/UserProfile';
import ContactPage from './features/page/ContactPage';

function App() {
  return (
    <div className="App">


      <Routes>
        <Route path="/" element={<WebsiteLayout />} >
          <Route index element={<HomePage />} />
          <Route path="products">
            <Route index element={<ProductPage />} />
            <Route path=":id" element={<ProductDetail />} />
          </Route>
          <Route path="category">
            <Route path=":id" element={<CategoryPage />} />
          </Route>

          <Route path="contact" element={<ContactPage />} />
          <Route path="users/:id" element={<UserProfile />} />
          <Route path="checkout" element={<FormCheckOut />} />
          <Route path="order/:id" element={<OrderHistory />} />

        </Route>

        <Route path="admin" element={<PrivateRoute ><AdminLayout /></PrivateRoute>} >
          <Route index element={<Navigate to="dashboard" />} />

          <Route path="dashboard" element={<h1>Admin Dashboard</h1>} />

          <Route path="products"  >
            <Route index element={<ListProduct />} />
            <Route path="add/:id" element={<ProductAdd />} />
            <Route path=":id/edit" element={<ProductEdit />} />
          </Route >

          <Route path="category"  >
            <Route index element={<ListCategory />} />
            <Route path="add/:id" element={<CategoryAdd />} />
            <Route path=":id/edit" element={<CategoryEdit />} />
          </Route >

          <Route path='users' element={<ListUser />} />
          <Route path='cart' element={<ListCart />} />


        </Route>

        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />

        <Route path="*" element={<h1>Not Found</h1>} />

      </Routes>
    </div>
  );
}

export default App;
