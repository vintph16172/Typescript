import React from 'react'
import { Navigate } from 'react-router-dom'

type PrivateRouteProps = {
    children: JSX.Element
}

const PrivateRoute = ({children}: PrivateRouteProps) => {
    const isAdmin = true 
    if(!isAdmin){
        return <Navigate to="/login" />
    }

  return children
}

export default PrivateRoute