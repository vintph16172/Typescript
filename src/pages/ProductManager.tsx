import React, { Key, useState } from 'react'
import { Link } from 'react-router-dom'
import { ProductType } from './type/product'
import { Row, Col, Space, Table, Button } from 'antd';
import AdminPageHeader from '../components/AdminPageHeader'



type ProductManagerProps = {
  products: ProductType[],
  onRemove: (id: number | undefined) => void,
  onRemoveAll: (id: number[]) => void
}
type datakey = {
  key: Key
}

const ProductManager = ({ products, onRemove, onRemoveAll }: ProductManagerProps) => {
  // const { Column, ColumnGroup } = Table;

  const [selected, setSelected] = useState<number[]>([])
  const hasSelected = selected.length > 0;


  const columns = [
    {
      title: "STT", dataIndex: "key", key: "key",
      sorter: (record1:any, record2:any) => { return record1.key > record2.key },
      filters:[
        {text:"1",value:1},
        {text:"2",value:2}
      ],
      onFilter:(value:any,record:any)=>{
        return record.key === value
      }
    },
    { title: "ID", dataIndex: "id", key: "id" },
    { title: "Name", dataIndex: "name", key: "name" },
    { title: "Price", dataIndex: "price", key: "price" },
    Table.EXPAND_COLUMN,
    
    
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
      <span style={{ marginLeft: 8 }}>
        {hasSelected ? `Đã chọn ${selected.length} hàng` : ''}
      </span>
      {selected.length > 0 ? <Button type="primary" danger onClick={() => onRemoveAll(selected)}>
            Xóa Hết
      </Button> : ""}
      <Table className="m-6"
        rowSelection={{

          selectedRowKeys: selected,
          onChange: (keys) => {
            console.log(keys);
            // if(selected.length == 0){
            //   [...selected,1]
            // }
           const a = dataTable.map((item, index)=> {
             if(item.key == keys){
               return item.id
             }
           })
            
            setSelected(keys)
            console.log(selected);
          },
          onSelect: (record) => {
            
            // console.log(record);
            


          },

          selections: [
            Table.SELECTION_ALL,
            Table.SELECTION_INVERT,
            Table.SELECTION_NONE,
            {
              key: "odd",
              text: "Số Lẻ",
              onSelect: changableRowKeys => {
                let newSelectedRowKeys = [];
                newSelectedRowKeys = changableRowKeys.filter((key, index) => {
                  if (index % 2 !== 0) {
                    return false;
                  }
                  return true;
                });
                // this.setState({ selectedRowKeys: newSelectedRowKeys });
                setSelected(newSelectedRowKeys)
                console.log(selected);

              },

            },
            {
              key: "even",
              text: "Số Chẵn",
              onSelect: changableRowKeys => {
                let newSelectedRowKeys = [];
                newSelectedRowKeys = changableRowKeys.filter((key, index) => {
                  if (index % 2 !== 0) {
                    return true;
                  }
                  return false;
                });
                // this.setState({ selectedRowKeys: newSelectedRowKeys });
                setSelected(newSelectedRowKeys)
                console.log(selected);

              },

            }
          ]
        }}
        expandable={{
          expandedRowRender: record => <p>Alo</p>,
          // rowExpandable: record => record.key == 1

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