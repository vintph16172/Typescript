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
import Test from './features/page/Test';
import ProductAdd from './features/page/admin/product/ProductAdd';
import ProductDetail from './features/page/ProductDetail';
import ProductPage from './features/page/ProductPage';
import CategoryPage from './features/page/CategoryPage';
import FormCheckOut from './features/page/FormCheckOut';
import OrderHistory from './features/page/OrderHistory'

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
          <Route path="checkout" element={<FormCheckOut />} />
          <Route path="order/:id" element={<OrderHistory />} />
        </Route>

        <Route path="admin" element={<PrivateRoute ><AdminLayout /></PrivateRoute>} >
          <Route index element={<Navigate to="dashboard" />} />

          <Route path="dashboard" element={<h1>Admin Dashboard</h1>} />
          <Route path="products"  >
            <Route index element={<ListProduct />} />
            <Route path="add/:id" element={<ProductAdd  />} />
            <Route path=":id/edit" element={<ProductEdit />} />
          </Route >

        </Route>

        <Route path="/test" element={<Test />} />

        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />

        <Route path="*" element={<h1>Not Found</h1>} />

      </Routes>
    </div>
  );
}

export default App;
