import React, { useState, useEffect } from 'react';
import { Menu } from 'antd';
import { Link } from 'react-router-dom'

import { getMenuApi } from '../../../api/menu';

import logo from '../../../assets/imgs/png/logo-white.png'
import './MenuTop.scss';


export default function MenuTop() { 
    const { menuData, setMenuData } = useState([]);

    useEffect(() => {
        getMenuApi().then(response => {
            response.menus.forEach(menu => {
                console.log(menu);
            });
        });

    }, [])

    return (
      <Menu className="menu-top-web" mode="horizontal">
            <Menu.Item className="menu-top-web__logo">
                <Link to={"/"}>
                    <img src={logo} alt="appmaku"></img>
                </Link>
        </Menu.Item>
        <Menu.Item className="menu-top-web__item">
          <Link to={"/contact"}>Contacto</Link>
        </Menu.Item>
        <div className="menu-top-web__social">social...</div>
      </Menu>
    );
 }