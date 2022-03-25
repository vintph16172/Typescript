import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { ProductType } from './type/product'
import { Row, Col, Space, Table, Button } from 'antd';
import AdminPageHeader from '../components/AdminPageHeader'



type ProductManagerProps = {
  products: ProductType[],
  onRemove: (id: number | undefined) => void,

}

const ProductManager = ({ products, onRemove }: ProductManagerProps) => {
  // const { Column, ColumnGroup } = Table;

  const [selected,setSelected] = useState([])

 
  
  const columns = [
    { title: "STT", dataIndex: "key", key: "key" },
    { title: "ID", dataIndex: "id", key: "id" },
    { title: "Name", dataIndex: "name", key: "name" },
    { title: "Price", dataIndex: "price", key: "price" },
    {
      title: "Hành Động", key: "action", render: (text: string, record: ProductType) => (
        <Space align="center" size="middle">
          <Button type="primary" className='btn-update'>
            <Link to={`/admin/products/${record.id}/edit`}>Sửa</Link>
          </Button>
          <Button type="primary" danger onClick={() => onRemove(record.id)}>
            Xóa
          </Button>
        </Space>
      ),
    }
  ]
  const dataTable = products.map((item, index) => { return { key: index + 1, id: item.id, name: item.name, price: item.price } })

  return (
    <div className="container">
      <AdminPageHeader breadcrumb="Quản trị Sản Phẩm" />
      
      <Table className="m-6" 
      rowSelection={{

        selectedRowKeys:selected,
        onChange:(keys)=>{
          console.log(keys);
          
          setSelected(keys)
          console.log(selected);
        },
        onSelect: (item)=>{
          
          console.log(item);
          
          
          
        }
      }}
      dataSource={dataTable} 
      columns={columns} 
      bordered
      // title={() => 'Header'}
      footer={() => { return <span>Hiển thị 10/{products.length}</span> }}
      />


      {/* <table>
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
      </table> */}

    </div>
  )
}

export default ProductManager