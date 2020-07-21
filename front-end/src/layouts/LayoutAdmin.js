import React, { useState } from 'react';
import { Layout } from 'antd';
import { Route, Redirect, Switch} from 'react-router-dom';

// Components
// ....
import MenuTop from '../components/Admin/MenuTop/MenuTop';
import SideMenu from '../components/Admin/SideMenu';
import AdminSignIn from '../pages/Admin/SignIn';

import './LayoutAdmin.scss';

export default function LayoutAdmin (props) {

    const { routes } = props;
    const [menuCollapsed, setMenuCollapsed] = useState(false);
    const { Header, Content, Footer } = Layout;

    const user = null;

    if(!user) {
        return (
            <>
                <Route path="/admin/login" component={AdminSignIn} />
                <Redirect to="/admin/login" />
            </>
        )
    }

    return (
        <Layout>
            {/* Side Menu */}
            <SideMenu menuCollapsed={menuCollapsed}/>
            <Layout className="layout-admin" style={{marginLeft: menuCollapsed ? "80px" : "200px"}}>
                <Header className="layout-admin__header">
                    {/* Menu Top */}
                    <MenuTop menuCollapsed={menuCollapsed} setMenuCollapsed={setMenuCollapsed}/>
                </Header>
                <Content className="layout-admin__content">
                   <LoadRoutes routes={routes}></LoadRoutes>
                </Content>
                <Footer className="layout-admin__footer">
                    Jesus Abril
                </Footer>
            </Layout>
        </Layout>
    )
};

// Load the routes
// ....

function LoadRoutes({routes}) {
    return (
        <Switch>
            {routes.map((route, index) => (
                <Route 
                    key={index}
                    path={route.path}
                    exact={route.exact}
                    component={route.component}
                />
            ))}
        </Switch>
    )
}