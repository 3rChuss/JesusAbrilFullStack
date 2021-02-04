import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Switch, List, Button, notification, Select, Modal as ModalAntd } from 'antd';
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
import { updateMenuApi, deleteItemApi } from '../../.././../api/menu';
import { getAccessTokenApi } from '../../../../api/auth';

// COMPONENTS
// ....
import AddMenuForm from '../AddMenuForm';
import CreateMenu from '../CreateMenu';
import EditMenuWebForm from '../EditMenuWebForm';

import Modal from '../../../Modal';

import './MenuList.scss';


//Notificacion Config
notification.config({
  duration: 2,
});


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
    //Load the selected menu
    const menuSelect = [];
    menus.forEach((menu) => {
      menuSelect.push(menu)
    });
    setSelectMenu(menuSelect);
    //Load item from menuSelected
    const listItems = [];

    for (let i = 0; i < menus.length; i++) {
      const element = menus[i];
      if (element._id === menuSelected) {
        element.items.forEach((item) => {
          listItems.push({
            content: (
              <MenuItem
                item={item}
                updateMenu={updateMenu}
                menuSelected={menuSelected}
                editMenuWebModal={editMenuWebModal}
                deleteItem={deleteItem}
              />
            ),
          });
        })
      }
    }
    listItems.sort((a, b) => {
      return a.content.props.item.order - b.content.props.item.order;
    });
    setListItems(listItems);
    setReloadMenu(false);
  }, [menus, menuSelected]);

  const updateMenu = (menu, data) => {
    const accessToken = getAccessTokenApi();
    updateMenuApi(accessToken, "activate-menu", menu, data).then(
      (result) => {
        notification["success"]({ message: result });
      }
    );
    setReloadMenu(true);
  };

  const onSort = (sortedList, dropEvent) => {
    const accessToken = getAccessTokenApi();
    sortedList.forEach(item => {
      const { _id } = item.content.props.item;
      const { menuSelected } = item.content.props;
      const order = item.rank;
      updateMenuApi(accessToken, "update-menu", menuSelected, { _id, order })
        .then(result => {
          notification["success"]({ message: result });
        });
    })
    setReloadMenu(true);
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
  };

  const editMenuWebModal = (menu) => {
    setIsVisibleModal(true);
    setModalTitle(`Editing menu: ${menu.title}`);
    setModalContent(
      <EditMenuWebForm
        setIsVisibleModal={setIsVisibleModal}
        setReloadMenu={setReloadMenu}
        menu={menu}
        menuSelected={menuSelected}
      />
    )

  };

  const deleteItem = (item) => {
    const accessToken = getAccessTokenApi();
    ModalAntd.confirm({
      title: "You're about to delete a menu item",
      content: `🚨 Are you sure you want to delete de item: ${item.title}?`,
      okText: "Yes, remove it! ✔",
      okType: "danger",
      cancelText: "Cancel ✖",
      onOk() {
        deleteItemApi(accessToken, menuSelected, item)
          .then((response) => {
            notification["success"]({
              message: response,
            });
            setReloadMenu(true);
          })
          .catch((err) => {
            notification["error"]({
              message: err,
            });
          });
      },
    });
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
            <Link to="#" onClick={addMenuModal}>
              {" "}
              or create a new menu{" "}
            </Link>
          </span>
        </div>
        {menuSelected ? (
          <div className="menu-list__header-items">
            <Button type="primary" onClick={addItemModal}>
              <p>Add New Item to Menu</p>
            </Button>
          </div>
        ) : null}
      </div>
      {menuSelected ? (
        <div className="menu-list__items">
          <DragSortableList
            items={listItems}
            onSort={onSort}
            dropBackTransitionDuration={0.3}
            type="vertical"
          />
        </div>
      ) : (
        <div className="empty">No menu selected yet</div>
      )}
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
  const { item, updateMenu, menuSelected, editMenuWebModal, deleteItem } = props;
  if (!menuSelected) {
    return null;
  } else {
    return (
      <List.Item
        key={item._id}
        loading="true"
        actions={[
          <Switch
            defaultChecked={item.active}
            onChange={(e) => updateMenu(menuSelected, { "id" : item._id, "active" : e })}
            checkedChildren={<CheckOutlined />}
            unCheckedChildren={<CloseOutlined />}
            title="Visibility"
          />,
          <Button type="primary" onClick={() => editMenuWebModal(item)}>
            <EditOutlined />
          </Button>,
          <Button type="danger" onClick={() => deleteItem(item)}>
            <DeleteOutlined />
          </Button>,
        ]}
      >
        <List.Item.Meta
          title={item.title}
          description={
            <div className="details">
              <LinkOutlined />
              <span className="url" title="URL" role="link">
                <Link to={window.location.origin + item.url} target="_blank">
                  {item.url}
                </Link>
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
    );
  }
}
