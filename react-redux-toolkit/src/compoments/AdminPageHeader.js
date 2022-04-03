import React from 'react'
import { Breadcrumb,PageHeader } from 'antd'
import { HomeOutlined, UserOutlined } from '@ant-design/icons';
import { useSelector, useDispatch } from 'react-redux'

const AdminPageHeader = () => {
    const breadcrumb = useSelector(data => data.products.breadcrumb)
    console.log("breadcrumb",breadcrumb);

    
    
    return (
      <div className="">
          <div className="ml-6 pt-4">
              <Breadcrumb >
                  <Breadcrumb.Item href="/">
                      <HomeOutlined />
                  </Breadcrumb.Item>
                  <Breadcrumb.Item href="/admin/dashboard">
                      <UserOutlined />
                      <span>Dashboard</span>
                  </Breadcrumb.Item>
                  <Breadcrumb.Item>{breadcrumb}</Breadcrumb.Item>
              </Breadcrumb>
          </div>
          <PageHeader
              className="site-page-header"
              title={breadcrumb}

          />
          



      </div>
  )
}

export default AdminPageHeader