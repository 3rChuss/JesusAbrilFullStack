import React from 'react';
import { Layout, Tabs } from 'antd';
import { Redirect } from 'react-router-dom';
import { getAccessTokenApi } from '../../../api/auth';

// ASSETS
// ....
import Logo from '../../../assets/imgs/png/wtlogo.png';
import './SignIn.scss';

// COMPONENTS
// ....
import RegisterForm from '../../../components/Admin/RegisterForm';
import LoginForm from '../../../components/Admin/LoginForm';

export default function SignIn() { 
    const { Content } = Layout;
    const { TabPane } = Tabs;

    if (getAccessTokenApi()) {
        return <Redirect to="/admin" />;
    }
    return (
        <Layout className="sign-in">
            <Content className="sign-in__content">
                <h1 className="sign-in__content-logo">
                    <img src={Logo} alt="Your Logo here"/>
                </h1>
                <div className="sign-in__content-tabs">
                    <Tabs type="card">
                        <TabPane tab={<span>Login</span>} key='1'>
                            <LoginForm />
                        </TabPane>
                        <TabPane tab={<span>Sign Up</span>} key="2">
                            <RegisterForm />
                        </TabPane>
                    </Tabs>
                </div>
            </Content>
        </Layout>
    )
 }