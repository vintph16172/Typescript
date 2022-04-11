import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react';
import { changeBreadcrumb } from '../../../slice/ProductSlice';
import { Link } from 'react-router-dom'
import { Row, Col, Space, Table, Button, Input, Avatar } from 'antd';
import { SearchOutlined,UserDeleteOutlined,UserAddOutlined } from '@ant-design/icons';
import { getCategory } from '../../../slice/CategorySlice';
import AdminPageHeader from '../../../../compoments/AdminPageHeader';
import { isAthenticate } from '../../../utils/localstorage'
import { changeUserValue, getUsers, onSelected, editUsers } from '../../../slice/UserSlice';


const ListUser = () => {

    const breadcrumb = useSelector(data => data.products.breadcrumb)
    const user = useSelector(data => data.user.value)
    const listUser = useSelector(data => data.user.listValue)
    const selected = useSelector(data => data.user.selected)

    console.log("User", listUser);
    const dispatch = useDispatch()

    const columns = [
        {
            title: "STT", dataIndex: "key", key: "key",
            sorter: (record1, record2) => { return record1.key > record2.key },
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
            title: "Email", dataIndex: "email", key: "email"
        },
        {
            title: "Role", dataIndex: "role", key: "role",

            filters: [
                { text: "Admin", value: 1 },
                { text: "Người Dùng", value: 0 }
            ],
            onFilter: (value, record) => {
                return record.status == value
            }
        },
        {
            title: "Hành Động", key: "action", render: (text, record) => (
                <Space align="center" size="middle">
                    {record.role == "Người Dùng" ? <Button type="primary"  className='btn-update' onClick={() => {
                        const recordUpdate = record
                        recordUpdate.role = 1
                        dispatch(editUsers(recordUpdate))
                    }}>
                        <UserAddOutlined /> 
                    </Button> : <Button type="primary" disabled className='btn-update' onClick={() => {
                        const recordUpdate = record
                        recordUpdate.role = 0
                        dispatch(editUsers(recordUpdate))
                    }}>
                        <UserDeleteOutlined /> 
                    </Button>}


                </Space>
            ),
        }
    ]
    const dataTable = listUser.map((item, index) => { return { key: index + 1, _id: item._id, name: item.name, email: item.email, role: item.role == 0 ? "Người Dùng" : "Admin" } })



    useEffect(() => {
        dispatch(getUsers())
        dispatch(changeBreadcrumb("Tài Khoản"))
        dispatch(changeUserValue(isAthenticate()))
    }, [])

    return (
        <div className="container">
            <AdminPageHeader />





            <Table className="m-6"
                rowSelection={{

                    selectedRowKeys: selected,
                    onChange: (keys) => {
                        console.log(keys);

                        dispatch(onSelected(keys))



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
                dataSource={dataTable}
                columns={columns}
                bordered
                // title={() => 'Header'}
                footer={() => { return <span>Tổng Cộng {listUser.length} Bản Ghi</span> }}
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

export default ListUser