import React from 'react'
import { Outlet } from 'react-router-dom'
import { Navigate } from 'react-router-dom'
import AdminLayout from '../features/layout/AdminLayout'
import { isAthenticate } from '../features/utils/localstorage'

const PrivateRoute = () => {
    const isAdmin = true 
    const { user,token } = isAthenticate() 
    if(!isAdmin){
        return <Navigate to="/login" />
    }

  return <AdminLayout />
}


export default PrivateRoute