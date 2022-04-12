import React,{useState} from 'react'
import { Link, Outlet } from 'react-router-dom'
import { Layout, Menu, Breadcrumb, Avatar, Image } from 'antd';
import {
    DesktopOutlined,
    PieChartOutlined,
    FileOutlined,
    TeamOutlined,
    UserOutlined,
} from '@ant-design/icons';
import logo from '../../img/logo.png'


const AdminLayout = () => {
    const { Header, Content, Footer, Sider } = Layout;
    const { SubMenu } = Menu;
    const [collapsed, setCollapsed] = useState(false)

    return (
        // <div>

        //     <main>
        //         <Outlet />
        //     </main>
        // </div>
        // <SiderDemo />
        <Layout style={{ minHeight: '100vh' }}>
            <Sider collapsible collapsed={collapsed} onCollapse={() => { setCollapsed(!collapsed) }}>
                <div className="logo flex justify-center py-2" >
                    <img src={logo} alt="" className="h-12" />
                </div>
               

                <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">

                    <Menu.Item key="1" icon={<PieChartOutlined />}>
                        <Link to={`/admin/products`} >Sản Phẩm</Link>
                    </Menu.Item>
                    <Menu.Item key="2" icon={<DesktopOutlined />}>
                        <Link to={`/admin/category`} >Danh Mục</Link>
                    </Menu.Item>
                    <Menu.Item key="3" icon={<DesktopOutlined />}>
                        <Link to={`/admin/users`} >Người Dùng</Link>
                    </Menu.Item>
                    <Menu.Item key="4" icon={<DesktopOutlined />}>
                        <Link to={`/admin/cart`} >Đơn Hàng</Link>
                    </Menu.Item>
                    {/* <SubMenu key="sub1" icon={<UserOutlined />} title="User">
                        <Menu.Item key="3">Tom</Menu.Item>
                        <Menu.Item key="4">Bill</Menu.Item>
                        <Menu.Item key="5">Alex</Menu.Item>
                    </SubMenu>
                    <SubMenu key="sub2" icon={<TeamOutlined />} title="Team">
                        <Menu.Item key="6">Team 1</Menu.Item>
                        <Menu.Item key="8">Team 2</Menu.Item>
                    </SubMenu> */}
                  
                </Menu>
            </Sider>
            <Layout className="site-layout">
                <Header className="site-layout-background" style={{ padding: 0 }} />
                <Content style={{ margin: '0 16px' }}>
                    {/* <Breadcrumb style={{ margin: '16px 0' }}>
              <Breadcrumb.Item>User</Breadcrumb.Item>
              <Breadcrumb.Item>Bill</Breadcrumb.Item>
            </Breadcrumb> */}
                    <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
                        < Outlet />
                    </div>
                </Content>
                <Footer style={{ textAlign: 'center' }}>FastFood ©2022 Created by vintph16172</Footer>
            </Layout>
        </Layout>
    )
}

export default AdminLayout