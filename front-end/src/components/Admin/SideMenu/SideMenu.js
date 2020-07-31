import React from 'react';
import { Link, withRouter } from 'react-router-dom';

import { Layout, Menu } from 'antd';
import {
  HomeOutlined,
  UserOutlined,
  RedEnvelopeOutlined,
  BarChartOutlined,
  EuroOutlined,
  MenuOutlined,
} from "@ant-design/icons";


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

          <Menu.Item key="/admin/menu">
            <Link to={"/admin/menu"}>
              <MenuOutlined />
              <span className="nav-text">Menu</span>
            </Link>
          </Menu.Item>

          <Menu.Item key="/admin/users">
            <Link to={"/admin/users"}>
              <UserOutlined />
              <span className="nav-text">Users</span>
            </Link>
          </Menu.Item>

          <Menu.Item key="/admin/newsletter">
            <Link to={"/admin/newsletter"}>
              <RedEnvelopeOutlined />
              <span className="nav-text">Newsletter</span>
            </Link>
          </Menu.Item>

          <Menu.Item key="/admin/analitycs">
            <Link to={"/admin/analitycs"}>
              <BarChartOutlined />
              <span className="nav-text">Analitycs</span>
            </Link>
          </Menu.Item>

          <Menu.Item key="/admin/payments">
            <Link to={"/admin/payments"}>
              <EuroOutlined />
              <span className="nav-text">Payments</span>
            </Link>
          </Menu.Item>
        </Menu>
      </Sider>
    );
}

export default withRouter(SideMenu);