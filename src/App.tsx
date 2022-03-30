import { useEffect, useState } from 'react'
import logo from './logo.svg'
import './App.css'

import ShowInfo from './components/ShowInfo'
import { Navigate, NavLink, Route, Routes } from 'react-router-dom'
import HomePage from './pages/HomePage'
import ProductPage from './pages/ProductPage'
import AboutPage from './pages/AboutPage'
import WebsiteLayout from './pages/layouts/WebsiteLayout'
import AdminLayout from './pages/layouts/AdminLayout'
import ProductDetail from './pages/ProductDetail'
import { ProductType } from './pages/type/product'
import { listProducts, remove, add, update } from './api/product'
import ProductManager from './pages/ProductManager'
import ProductAdd from './pages/ProductAdd'
import ProductEdit from './pages/ProductEdit'
import PrivateRoute from './components/PrivateRoute'
import SignUp from './pages/SignUp'
import SignIn from './pages/SignIn'
import { listCate } from './api/category'
import { CategoryType } from './pages/type/category'

function App() {
  const [products, setProducts] = useState<ProductType[]>([]);
  const [categories, setCategories] = useState<CategoryType[]>([])

  useEffect(() => {
    const getProducts = async () => {
      const { data } = await listProducts();
      setProducts(data);
      console.log(products);
    }
    getProducts();
    const getCate = async () => {
      const { data } = await listCate()
      setCategories(data);
      console.log(categories);
      
    }
    getCate();
  }, [])
  const removeItem = (id: Number | undefined) => {
    console.log(id);
    remove(id)

    setProducts(products.filter(item => item._id !== id))

  }
  const removeItemAll = (idArray: number[]) => {
    console.log(idArray);
    
    for (let index = 0; index < idArray.length; index++) {
      
      remove(idArray[index])
      setProducts(products.filter(item => item._id !== idArray[index]))
    }

    

  }
  const onHanldeAdd = async (product: ProductType) => {
    const { data } = await add(product);
    setProducts([...products, data]);

  }
  const onHanldeEdit = async (product: ProductType) => {
    const { data } = await update(product)
    setProducts(products.map(item => item._id === data.id ? data : item))
  }

  return (
    <div className="App">


      <main>
        <Routes>
          <Route path="/" element={<WebsiteLayout />}>
            <Route index element={<HomePage products={products} categories={categories} />} />
            <Route path="products"  >
              <Route index element={<ProductPage />} />
              <Route path=":id" element={<ProductDetail />} />
            </Route>
            <Route path='about' element={<AboutPage />} />

          </Route>

          <Route path="admin" element={<PrivateRoute><AdminLayout /></PrivateRoute>} >
            <Route index element={<Navigate to="dashboard" />} />

            <Route path="dashboard" element={<h1>Admin Dashboard</h1>} />
            <Route path="products"  >
              <Route index element={<ProductManager products={products} categories={categories} onRemove={removeItem} onRemoveAll={removeItemAll} />} />
              <Route path="add" element={<ProductAdd onAdd={onHanldeAdd} />} />
              <Route path=":id/edit" element={<ProductEdit onEdit={onHanldeEdit} />} />
            </Route >

          </Route>

          <Route path="/login" element={<h1> Login Page </h1>} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/signin" element={<SignIn />} />

          <Route path="*" element={<h1>Not Found</h1>} />
        </Routes>

      </main>


    </div>
  )
}

export default App
