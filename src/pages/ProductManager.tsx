import React from 'react'
import { Link } from 'react-router-dom'
import { ProductType } from './type/product'

type ProductManagerProps = {
  products: ProductType[],
  onRemove: (id: number ) => void,
  
}

const ProductManager = ({ products, onRemove }: ProductManagerProps) => {
  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>ID</th>
            <th>name</th>
            <th>Price</th>
            <th colSpan={2} ></th>
          </tr>
        </thead>
        <tbody>
          {products?.map((item, index) => {
            return <tr key={index}>
              <td>{index + 1}</td>
              <td>{item.id}</td>
              <td>{item.name}</td>
              <td>{item.price}</td>
              <td>
                
                <Link to={`/admin/products/${item.id}/edit`}>Edit</Link>
              </td>
              <td>
                <button onClick={() => onRemove(item.id)}>Remove</button>
              </td>
            </tr>
          })}
        </tbody>
      </table>

    </div>
  )
}

export default ProductManager