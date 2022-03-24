import React from 'react'
import { useForm, SubmitHandler } from 'react-hook-form';
import { ProductType } from './type/product'
import { useNavigate } from 'react-router-dom'

type ProductUpdateProps = {
    product: ProductType,
    onUpdate: 
}

const ProductUpdate = (props: ProductUpdateProps) => {
  return (
    <div>ProductUpdate</div>
  )
}

export default ProductUpdate