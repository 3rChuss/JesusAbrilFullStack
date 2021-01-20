import React from 'react';
import { Button } from 'antd';
import {
    DoubleLeftOutlined,
    DoubleRightOutlined,
    PoweroffOutlined
} from '@ant-design/icons';

import { logout } from '../../../api/auth';

import Logo from '../../../assets/imgs/png/wtlogo.png';
import './MenuTop.scss';

export default function MenuTop(props) {
    const { menuCollapsed, setMenuCollapsed } = props;

    const logoutUser = () => {
        logout();
        window.location.reload();
    }

    return (
        <div className="menu-top">
            <div className="menu-top__left">
                {/* LOGO */}
                <img 
                    src={Logo}
                    alt=""
                    className="menu-top__left-logo" 
                />
                <Button type="link" onClick={() => setMenuCollapsed(!menuCollapsed)} style={{ marginLeft: menuCollapsed ? "0px" : "100px" }}>
                    { menuCollapsed ? 
                        <DoubleRightOutlined /> :
                        <DoubleLeftOutlined />
                    }
                </Button>
            </div>
            <div className="menu-top__right">
                <Button type="link" onClick={logoutUser}>
                    <PoweroffOutlined />
                </Button>
            </div>
        </div>
    )
}