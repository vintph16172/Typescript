import React from 'react'
import { Outlet } from 'react-router-dom'
import { Navigate } from 'react-router-dom'
import AdminLayout from '../features/layout/AdminLayout'


const PrivateRoute = () => {
    const isAdmin = true 
    if(!isAdmin){
        return <Navigate to="/login" />
    }

  return <AdminLayout />
}


export default PrivateRoute