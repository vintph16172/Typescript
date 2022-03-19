import { useState } from 'react'
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

function App() {
  const [count,setCount] = useState(0)
  const [myName,setMyName] = useState("Abc")
  const [status,setStatus] = useState(false)
  const [info,setInfo] = useState({
    name:"abc",
    age: 20
  })
  const [products,setProducts] = useState([
    {id:1,name:"product 1"},
    {id:2,name:"product 2"},
    {id:3,name:"product 3"}
  ])

  return (
    <div className="App">
      {/* Count: {count}
      <hr />
      Full Name: {myName}
      <hr />
      Status: {status ? "True" : "False"}
      <hr />
      Info: {info.name} - {info.age}
      <hr />
      Products: {products.map(item => <div className="">{item.id} - {item.name}</div> )}


      <ShowInfo name="Dat" age={20}/> */}
      <header>
          {/* <ul>
            <li><NavLink to="/">Home Page</NavLink></li>
            <li><NavLink to="/products">Products Page</NavLink></li>
            <li><NavLink to="/about">About Page</NavLink></li>
          </ul> */}
      </header>
      <main>
        <Routes>
          <Route path="/" element={<WebsiteLayout />}>
            <Route index element={<HomePage />}  />
            <Route path="product" element={<ProductPage />} />
            <Route path='about' element={<AboutPage/>} />
            <Route path="/product/:id" element={<ProductDetail />} />
          </Route>
          
          <Route path="admin" element={<AdminLayout />} >
            <Route index element={<Navigate to="dashboard" />} />

            <Route path="dashboard" element={<h1>Admin Dashboard</h1>} />

          </Route>

          <Route path="*" element={<h1>Not Found</h1>} />
        </Routes>

      </main>


    </div>
  )
}

export default App
