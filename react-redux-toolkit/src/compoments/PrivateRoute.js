import React from 'react'
import { Outlet } from 'react-router-dom'
import { Navigate } from 'react-router-dom'
import AdminLayout from '../features/layout/AdminLayout'
import { isAthenticate } from '../features/utils/localstorage'

const PrivateRoute = () => {
  // const isAdmin = true


  if (isAthenticate()) {
    const { user, token } = isAthenticate()
    if (user.role !== 1) {
      return <Navigate to="/signin" />
    }
  }
  return <AdminLayout />
}


export default PrivateRoute