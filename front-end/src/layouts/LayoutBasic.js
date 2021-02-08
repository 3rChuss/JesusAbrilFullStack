import React from 'react';
import { Route, Switch } from 'react-router-dom';

// Components
import MenuTop from "../components/Web/MenuTop";

import { Layout, Row, Col} from 'antd';
import './LayoutBasic.scss';

export default function LayoutBasic(props) {

    const { routes } = props;
    const { Content, Footer } = Layout;

    return (
      <Row>
        <Col md={4} />
            <Col md={16}>
                <MenuTop/>
          <LoadRoutes routes={routes} />
          <Footer>Jesus Abril</Footer>
        </Col>
        <Col md={4} />
      </Row>
    );
};

function LoadRoutes({routes}) {
    return (
        <Switch>
            {routes.map((route, index) => (
                <Route 
                    key={index}
                    path={route.path}
                    component={route.component}
                    exact={route.exact}
                />
            ))}
        </Switch>
    )
}
