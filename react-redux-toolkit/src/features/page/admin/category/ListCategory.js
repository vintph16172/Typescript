import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react';
import { Link } from 'react-router-dom'
import { Row, Col, Space, Table, Button, Input, Avatar } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { changeBreadcrumb } from '../../../slice/ProductSlice';
import { getCategory,onSelected,deleteCategory } from '../../../slice/CategorySlice';
import AdminPageHeader from '../../../../compoments/AdminPageHeader';
import { isAthenticate } from '../../../utils/localstorage'
import { changeUserValue } from '../../../slice/UserSlice';


const ListCategory = () => {

  const categories = useSelector(data => data.category.value)
  const selected = useSelector(data => data.category.selected)
  const arr = useSelector(data => data.category.arr)
  const breadcrumb = useSelector(data => data.category.breadcrumb)
  const user = useSelector(data => data.user.value)
  
  console.log("User",user);
  const dispatch = useDispatch()
  const hasSelected = selected.length > 0;


  console.log("Admin Category cate", categories);
  console.log("Admin Products  Selected", selected);

  const columns = [
    {
      title: "STT", dataIndex: "key", key: "key",
      sorter: (record1, record2) => { return record1.key > record2.key }
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
      onFilter: (value, record) => {
        return record.name.toLowerCase().includes(value.toLowerCase())
      }


    },
    {
      title: "Ngày Tạo", dataIndex: "createdAt", key: "createdAt",
      sorter: (record1, record2) => { return record1.createdAt > record2.createdAt }
    },


    {
      title: "Hành Động", key: "action", render: (text, record) => (
        <Space align="center" size="middle">
          <Button type="primary" className='btn-update'>
            <Link to={`/admin/category/${record._id}/edit`}>Sửa</Link>

          </Button>
          <Button type="primary" danger onClick={() => dispatch(deleteCategory(record._id))}>
            Xóa
          </Button>
        </Space>
      ),
    }
  ]
  const dataTable = categories.map((item, index) => { return { key: index + 1, _id: item._id,name: item.name,createdAt: item.createdAt} })



  useEffect(() => {

    dispatch(getCategory())
    dispatch(changeBreadcrumb("Danh Mục"))
    dispatch(changeUserValue(isAthenticate()))
  }, [])

  return (
    <div className="container">
      <AdminPageHeader />
      <Button type="primary" className="ml-6" >
            <Link to={`/admin/category/add/${user?.user?._id}`}>Thêm</Link>

      </Button>

      <span style={{ marginLeft: 8 }}>
        {hasSelected ? `Đã chọn ${selected.length} hàng` : ''}
      </span>

      {selected.length > 0 ? <Button type="primary" danger onClick={() => deleteCategory(arr)}>
        Xóa Hết
      </Button> : ""}


      <Table className="m-6"
        rowSelection={{

          selectedRowKeys: selected,
          onChange: (keys) => {
            console.log(keys);
            
            dispatch(onSelected(keys))
    
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
        dataSource={dataTable}
        columns={columns}
        bordered
        // title={() => 'Header'}
        footer={() => { return <span>Tổng Cộng {categories.length} Bản Ghi</span> }}
      />


    </div>
  )
}

export default ListCategory