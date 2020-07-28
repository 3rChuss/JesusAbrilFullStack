import React from 'react';
import { Link, withRouter } from 'react-router-dom';

import { Layout, Menu } from 'antd';
import {
    HomeOutlined,
    UserOutlined,
    RedEnvelopeOutlined,
    BarChartOutlined,
    EuroOutlined
    } from '@ant-design/icons';


import './SideMenu.scss';

function SideMenu(props) {
    const { menuCollapsed, location } = props;
    const { Sider } = Layout;

    return (
      <Sider className="side-menu" collapsed={menuCollapsed}>
            <Menu
                theme="dark"
                mode="inline"
                defaultSelectedKeys={[location.pathname]}
            >
                <Menu.Item key="/admin">
                    <Link to={"/admin"}>
                    <HomeOutlined />
                    <span className="nav-text">Dashboard</span>
                    </Link>
                </Menu.Item>

                <Menu.Item key="/admin/users">
                    <Link to={"/admin/users"}>
                        <UserOutlined />
                        <span className="nav-text">Users</span>
                    </Link>
                </Menu.Item>

                <Menu.Item key="/admin/">
                    <Link to={"/admin/"}>
                    <RedEnvelopeOutlined />
                    <span className="nav-text">Newsletter</span>
                    </Link>
                </Menu.Item>

                <Menu.Item key="/admin/">
                    <Link to={"/admin/"}>
                        <BarChartOutlined />
                        <span className="nav-text">Analitycs</span>
                    </Link>
                </Menu.Item>

                <Menu.Item key="/admin/">
                    <Link to={"/admin/"}>
                        <EuroOutlined />
                        <span className="nav-text">Payments</span>
                    </Link>
                </Menu.Item>
            </Menu>
      </Sider>
    );
}

export default withRouter(SideMenu);