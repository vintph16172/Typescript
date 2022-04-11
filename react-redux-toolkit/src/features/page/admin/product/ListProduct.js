import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react';
import { deleteProducts, getProducts,onSelected,addId,changeBreadcrumb } from '../../../slice/ProductSlice';
import { Link } from 'react-router-dom'
import { Row, Col, Space, Table, Button, Input, Avatar } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { getCategory } from '../../../slice/CategorySlice';
import AdminPageHeader from '../../../../compoments/AdminPageHeader';
import { isAthenticate } from '../../../utils/localstorage'
import { changeUserValue } from '../../../slice/UserSlice';


const ListProduct = () => {
  const products = useSelector(data => data.products.value)
  const categories = useSelector(data => data.category.value)
  const selected = useSelector(data => data.products.selected)
  const arr = useSelector(data => data.products.arr)
  const breadcrumb = useSelector(data => data.products.breadcrumb)
  const user = useSelector(data => data.user.value)
  
  console.log("User",user);
  const dispatch = useDispatch()
  const hasSelected = selected.length > 0;

  console.log("Admin Products", products);
  console.log("Admin Products cate", categories);
  console.log("Admin Products  Selected", selected);

  const columns = [
    {
      title: "STT", dataIndex: "key", key: "key",
      sorter: (record1, record2) => { return record1.key > record2.key },
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
      title: "Ảnh", dataIndex: "image", key: "image", render: (text, record) => (
        <img className="w-28 " src={record.image} />
      ),
    },
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
      onFilter: (value, record) => {
        return record.name.toLowerCase().includes(value.toLowerCase())
      }


    },
    {
      title: "Category", dataIndex: "category", key: "category",
      filters: categories.map(item => { return { text: item.name, value: item.name } }),
      onFilter: (value, record) => {
        return record.category == value
      }


    },
    {
      title: "Price", dataIndex: "price", key: "price",
      sorter: (record1, record2) => { return record1.price > record2.price }
    },
    {
      title: "View", dataIndex: "view", key: "view",
      sorter: (record1, record2) => { return record1.view > record2.view }
    },
    {
      title: "Status", dataIndex: "status", key: "status",

      filters: [
        { text: "Hoạt Động", value: "Hoạt Động" },
        { text: "Ẩn", value: "Ẩn" }
      ],
      onFilter: (value, record) => {
        return record.status == value
      }
    },
    Table.EXPAND_COLUMN,


    {
      title: "Hành Động", key: "action", render: (text, record) => (
        <Space align="center" size="middle">
          <Button type="primary" className='btn-update'>
            <Link to={`/admin/products/${record._id}/edit`}>Sửa</Link>

          </Button>
          <Button type="primary" danger onClick={() => dispatch(deleteProducts(record._id))}>
            Xóa 
          </Button>
        </Space>
      ),
    }
  ]
  const dataTable = products.map((item, index) => { return { key: index + 1, _id: item._id,image: item.image, name: item.name, category: categories.filter(cate => { return cate._id == item.category }).map((item) => { return item.name }), price: item.price, view: item.view, status: item.status == 0 ? "Ẩn" : "Hoạt Động",desc: item.desc } })



  useEffect(() => {
    dispatch(getProducts())
    dispatch(getCategory())
    dispatch(changeBreadcrumb("Sản Phẩm"))
    dispatch(changeUserValue(isAthenticate()))
  }, [])

  return (
    <div className="container">
      <AdminPageHeader />
      <Button type="primary"  className="ml-6" >
            <Link to={`/admin/products/add/${user?.user?._id}`}>Thêm</Link>

      </Button>

      <span style={{ marginLeft: 8 }}>
        {hasSelected ? `Đã chọn ${selected.length} hàng` : ''}
      </span>

      {selected.length > 0 ? <Button type="primary" danger onClick={() => deleteProducts(arr)}>
        Xóa Hết
      </Button> : ""}


      <Table className="m-6"
        rowSelection={{

          selectedRowKeys: selected,
          onChange: (keys) => {
            console.log(keys);
            
            dispatch(onSelected(keys))
            // for (let index = 0; index < selected.length; index++) {
            //   const a = dataTable.filter((item, index)=>{ return item.key == selected[index] }).map((item)=> item._id);
            //   console.log("a",a);
            //   dispatch(addId(a))
            //   console.log("arr",arr);
            // }
            // const a = dataTable.filter((item, index)=>{ return item.key == keys }).map((item)=> item._id);
            //   console.log("a",a);
            //   dispatch(addId(a))
            //   console.log("arr",arr);
            
            // dataTable.filter(item2 => { return item2.key == keys }).map((item)
            
            
          },
          onSelect: (record) => {
            // dispatch(addId(record._id))
            // console.log(arr);
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
                
                dispatch(onSelected(newSelectedRowKeys))
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
                
                dispatch(onSelected(newSelectedRowKeys))
                console.log(selected);

              },

            }
          ]
        }}
        expandable={{
          expandedRowRender: record => <p>{record.desc}</p>,
          // rowExpandable: record => record.key == 1

        }}
        dataSource={dataTable}
        columns={columns}
        bordered
        // title={() => 'Header'}
        footer={() => { return  <span>Tổng Cộng {products.length} Bản Ghi</span>  }}
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

export default ListProduct