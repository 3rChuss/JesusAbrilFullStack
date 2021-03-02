import React, { useState, useEffect } from 'react';
import { Menu } from 'antd';
import { Link } from 'react-router-dom'

import { getMenuApi } from '../../../api/menu';

import logo from '../../../assets/imgs/png/logo-white.png'
import './MenuTop.scss';


export default function MenuTop() { 
  const [menuData, setMenuData] = useState([]);

  useEffect(() => {
    getMenuApi().then(response => {
      const arrayItems = [];
      response.menus.forEach(menu => {
        menu.title.toLowerCase().indexOf("top") > -1 && arrayItems.push(...menu.items);
      });
      setMenuData(arrayItems);
    });
  }, []);

    return (
      <Menu className="menu-top-web" mode="horizontal">
        <Menu.Item className="menu-top-web__logo">
          <Link to={"/"}>
            <img src={logo} alt="appmaku"></img>
          </Link>
        </Menu.Item>
        {
          menuData.map((item) => {
            const external = item.url.indexOf("http") > -1 ? true : false;
            if (external) {
              return (
                <Menu.Item key={item._id} className="menu-top-web__item">
                  <a href={item.url}>{item.title}</a>
                </Menu.Item>
              )
            } else {
              return (
                <Menu.Item key={item._id} className="menu-top-web__item">
                  <Link to={item.url}>{item.title}</Link>
                </Menu.Item>
              )
            }
          }
        )}
      </Menu>
    );
 }