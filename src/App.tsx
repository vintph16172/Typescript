import { useEffect, useState } from 'react'
import logo from './logo.svg'
import './App.css'
import ShowInfo from './components/ShowInfo'
import {Navigate, NavLink, Route, Routes} from 'react-router-dom'
import HomePage from './pages/HomePage'
import ProductPage from './pages/ProductPage'
import AboutPage from './pages/AboutPage'
import WebsiteLayout from './pages/layouts/WebsiteLayout'
import AdminLayout from './pages/layouts/AdminLayout'
import ProductDetail from './pages/ProductDetail'
import { ProductType } from './pages/type/product'
import { listProducts, remove, add } from './api/product'
import ProductManager from './pages/ProductManager'
import ProductAdd from './pages/ProductAdd'

function App() {
  const [products, setProducts] = useState<ProductType[]>([]);

  useEffect(() => {
      const getProducts = async () => {
            const { data } = await listProducts();
            setProducts(data);
      }
      getProducts();
  }, [])
  const removeItem =  (id: Number)=>{
    console.log(id);
    remove(id)

    setProducts(products.filter(item => item.id !== id))
    
  }
  const onHanldeAdd = async (product: ProductType) => {
    const { data } = await add(product);
    setProducts([...products, data]);
    
  }


  return (
    <div className="App">
       
      
      <main>
        <Routes>
          <Route path="/" element={<WebsiteLayout />}>
            <Route index element={<HomePage />}  />
            <Route path="products"  >
              <Route index element={<ProductPage />} />
              <Route path=":id" element={<ProductDetail />} />
            </Route>
            <Route path='about' element={<AboutPage/>} />
            
          </Route>
          
          <Route path="admin" element={<AdminLayout />} >
            <Route index element={<Navigate to="dashboard" />} />

            <Route path="dashboard" element={<h1>Admin Dashboard</h1>} />
            <Route path="products" element={<ProductManager products={products} onRemove={removeItem} />} />
            <Route path="products/add" element={<ProductAdd onAdd={onHanldeAdd}  />} />
          </Route>

          <Route path="*" element={<h1>Not Found</h1>} />
        </Routes>

      </main>


    </div>
  )
}

export default App
