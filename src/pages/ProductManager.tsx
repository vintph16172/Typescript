import React, { Key, useState } from 'react'
import { Link } from 'react-router-dom'
import { ProductType } from './type/product'
import { CategoryType } from './type/category'
import { Row, Col, Space, Table, Button, Input } from 'antd';
import AdminPageHeader from '../components/AdminPageHeader'
import { SearchOutlined } from '@ant-design/icons';




type ProductManagerProps = {
  products: ProductType[],
  categories: CategoryType[]
  onRemove: (id: number | undefined) => void,
  onRemoveAll: (id: number[]) => void
}
type datakey = {
  key: Key
}

const ProductManager = ({ products, categories, onRemove, onRemoveAll }: ProductManagerProps) => {
  // const { Column, ColumnGroup } = Table;
  console.log(categories);

  const [selected, setSelected] = useState<number[]>([])
  const hasSelected = selected.length > 0;


  const columns = [
    {
      title: "STT", dataIndex: "key", key: "key",
      sorter: (record1: any, record2: any) => { return record1.key > record2.key },
      // filters: [
      //   { text: "1", value: 1 },
      //   { text: "2", value: 2 }
      // ],
      // onFilter: (value: any, record: any) => {
      //   return record.key === value
      // }
    },
    { title: "ID", dataIndex: "_id", key: "_id" },
    {
      title: "Name", dataIndex: "name", key: "name",
      filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => {
        return <div className="">
          <Input
            autoFocus
            placeholder='Tìm Tên Sản Phẩm'
            value={selectedKeys[0]}
            onChange={(e) => {
              setSelectedKeys(e.target.value ? [e.target.value] : [])
              confirm({ closeDropDown: false })
            }}
            onPressEnter={() => { confirm() }}
            onBlur={() => { confirm() }}


          >

          </Input>
          <Button onClick={() => clearFilters()} type="primary" danger >Reset</Button>
        </div>
      },
      filterIcon: () => {
        return <SearchOutlined />
      },
      onFilter: (value: string, record: ProductType) => {
        return record.name.toLowerCase().includes(value.toLowerCase())
      }


    },
    {
      title: "Category", dataIndex: "category", key: "category",
      filters: categories.map(item => { return { text: item.name, value: item.name } }),
      onFilter: (value: any, record: any) => {
        return record.category == value
      }


    },
    {
      title: "Price", dataIndex: "price", key: "price",
      sorter: (record1: any, record2: any) => { return record1.price > record2.price }
    },
    {
      title: "View", dataIndex: "view", key: "view",
      sorter: (record1: any, record2: any) => { return record1.view > record2.view }
    },
    {
      title: "Status", dataIndex: "status", key: "status",
      
      filters: [
        {text: "Hoạt Động",value: "Hoạt Động"},
        {text: "Ẩn",value: "Ẩn"}
      ],
      onFilter: (value: any, record: any) => {
        return record.status == value
      }
    },
    Table.EXPAND_COLUMN,


    {
      title: "Hành Động", key: "action", render: (text: string, record: ProductType) => (
        <Space align="center" size="middle">
          <Button type="primary" className='btn-update'>
            <Link to={`/admin/products/${record._id}/edit`}>Sửa</Link>

          </Button>
          <Button type="primary" danger onClick={() => onRemove(record._id)}>
            Xóa
          </Button>
        </Space>
      ),
    }
  ]
  const dataTable = products.map((item, index) => { return { key: index + 1, _id: item._id, name: item.name, category: categories.filter(cate => { return cate._id == item.category }).map((item) => { return item.name }), price: item.price, view: item.view, status: item.status == 0 ? "Ẩn" : "Hoạt Động" } })

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
            const a = dataTable.map((item, index) => {
              if (item.key == keys) {
                return item.id
              }
            })

            setSelected(keys)
            console.log(selected);
          },
          onSelect: (record) => {

            console.log(record);



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