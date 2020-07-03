import React from 'react';
import { Link } from 'react-router-dom';

import { Layout, Menu } from 'antd';
import {
    HomeOutlined,
    MenuUnfoldOutlined
    } from '@ant-design/icons';


import './SideMenu.scss';

export default function SideMenu(props) {
    const { menuCollapsed } = props;
    const { Sider } = Layout;

    return (
        <Sider className="side-menu" collapsed={menuCollapsed}>
            <Menu theme="dark" mode="inline" defaultSelectedKeys={["1"]}>
                <Menu.Item key="1">
                    <Link to={"/admin"}>
                        <HomeOutlined />
                        <span className="nav-text">Home</span>
                    </Link>
                </Menu.Item>

                <Menu.Item key="2">
                    <Link to={"/admin/menu-web"}>
                        <MenuUnfoldOutlined />
                        <span className="nav-text">Menu Web</span>
                    </Link>
                </Menu.Item>
            </Menu>
        </Sider>
    )
}