import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Switch, List, Button, notification, Select} from 'antd';
import DragSortableList from 'react-drag-sortable';
import {
  EditOutlined,
  DeleteOutlined,
  CheckOutlined,
  CloseOutlined,
  LinkOutlined,
  FormatPainterOutlined,
  NumberOutlined,
} from "@ant-design/icons";

// API
// ....
import { updateMenuApi } from '../../.././../api/menu';
import { getAccessTokenApi } from '../../../../api/auth';

// COMPONENTS
// ....
import AddMenuForm from '../AddMenuForm';
import CreateMenu from '../CreateMenu';

import Modal from '../../../Modal';


import './MenuList.scss';


export default function MenuList(props) {
    const { menus, setReloadMenu } = props;
    const [listItems, setListItems] = useState([]);
    const [menuSelected, setMenuSelected] = useState("");
    const [selectMenu, setSelectMenu] = useState([]);
    const [isVisibleModal, setIsVisibleModal] = useState(false);
    const [modalTitle, setModalTitle] = useState('');
    const [modalContent, setModalContent] = useState(null);
    const { Option } = Select;

  useEffect(() => {
    //load the select menu
    const menuSelect = [];
    menus.forEach((menu) => {
      menuSelect.push(menu)
    });
    setSelectMenu(menuSelect);
    //Load item from selectedMenu
    const listItems = [];
    menus.forEach((menu) => {
      if (menu._id === menuSelected) {
        listItems.push({
          content: (
            <MenuItem
              items={menu.items}
              updateMenu={updateMenu}
              menuSelected={menuSelected}
            />
          ),
        });
      }
    });
    setListItems(listItems);
  }, [menus, menuSelected]);

  const updateMenu = (item, active) => {
    item.active = active;
    const accessToken = getAccessTokenApi();
    updateMenuApi(accessToken, item._id, { active })
      .then(result => {
        notification['success']({ message: result });
      });
  };

  const onSort = (sortedList, dropEvent) => {
    // const accessToken = getAccessTokenApi();
    // sortedList.forEach(item => {
    //   const { _id } = item.content.props.menu.items;
    //   const order = item.rank;
    //   updateMenuApi(accessToken, _id, { order });
    // });
  };

  const addItemModal = () => {
    setIsVisibleModal(true);
    setModalTitle("Add Item to Menu");
    setModalContent(
      <AddMenuForm
        setIsVisibleModal={setIsVisibleModal}
        setReloadMenu={setReloadMenu}
        menuSelected={menuSelected}
      />
    );
  };

  const addMenuModal = () => {
    setIsVisibleModal(true);
    setModalTitle("Add New Menu");
    setModalContent(
      <CreateMenu
        setIsVisibleModal={setIsVisibleModal}
        setReloadMenu={setReloadMenu}
      />
    );
  }

  return (
    <div className="menu-list">
      <div className="menu-list__header">
        <div className="menu-list__header-items">
          <span className="text">Select menu</span>
          <Select
            showSearch
            placeholder="Select menu"
            onChange={(e) => setMenuSelected(e)}
          >
            {selectMenu.map((data, key) => {
              return (
                <Option key={key} value={data._id}>
                  {data.title}
                </Option>
              );
            })}
          </Select>
          <span className="link">
            <Link to="#" onClick={addMenuModal} > or create a new menu </Link>
          </span>
        </div>
        {menuSelected ? 
          <div className="menu-list__header-items">
            <Button type="primary" onClick={addItemModal}>
              <p>Add New Item to Menu</p>
            </Button>
          </div>
          :
          null
        }
      </div>
      <div className="menu-list__items">
        <DragSortableList items={listItems} onSort={onSort} dropBackTransitionDuration={0.3} type="vertical" />
      </div>
      <Modal
        title={modalTitle}
        isVisible={isVisibleModal}
        setIsVisible={setIsVisibleModal}
      >
        {modalContent}
      </Modal>
    </div>
  );
}


function MenuItem(props) {
  const { items, updateMenu, menuSelected } = props;
  if (!menuSelected) {
    return null;
  } else {
    return (
      <List
        dataSource={items}
        renderItem={item => (
          <List.Item
            key={item._id}
            loading="true"
            actions={[
              <Switch
                defaultChecked={item.active}
                onChange={(e) => updateMenu(item, e)}
                checkedChildren={<CheckOutlined />}
                unCheckedChildren={<CloseOutlined />}
                title="Visibility"
              />,
              <Button type="primary">
                <EditOutlined />
              </Button>,
              <Button type="danger">
                <DeleteOutlined />
              </Button>,
            ]}
          >
            <List.Item.Meta
              title={item.title}
              description={
                <div className="details">
                  <LinkOutlined />
                  <span className="url" title="URL">
                    {item.url}
                  </span>
                  <FormatPainterOutlined />
                  <span className="cssClass" title="CSS class">
                    {item.cssClass}
                  </span>
                  <NumberOutlined />
                  <span className="anchorId" title="ID">
                    {item.anchorId}
                  </span>
                </div>
              }
            />
          </List.Item>
        )}
      />
        
    );
  }
}
