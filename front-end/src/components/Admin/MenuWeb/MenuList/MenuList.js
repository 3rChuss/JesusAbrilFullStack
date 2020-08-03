import React, { useState, useEffect } from 'react';
import { Switch, List, Button, notification, Modal as Modalant } from 'antd';
import DragSortableList from "react-drag-sortable";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";

import Modal from '../../../Modal';

import './MenuList.scss';

const { confirm } = Modalant;

export default function MenuList(props) {
    const { menu, setReloadMenu } = props;
    const [listItems, setListItems] = useState([]);
    const [isVisibleModal, setIsVisibleModal] = useState(false);
    const [modalTitle, setModalTitle] = useState('');
    const [modalContent, setModalContent] = useState(null);

    useEffect(() => {
        const listItems = [];
        menu.forEach(item => {
            listItems.push({
              content: <MenuItem item={item} />,
            });
        });
        setListItems(listItems);
    }, [menu])

    const onSort = (sortedList, dropEvent) => {
        console.log(sortedList);
    };

    return (
        <div className="menu-list">
            <div className="menu-list__header">
                <Button type="primary"> New Menu </Button>
            </div>
            <div className="menu-list__items">
                <DragSortableList items={listItems} />
            </div>
        </div>
        
    );
}


function MenuItem(props) {
    const { item } = props;
    return (
      <List.Item
        actions={[
          <Switch defaultChecked={item.active} />,
          <Button type="primary">
            <EditOutlined />
          </Button>,
          <Button type="danger">
            <DeleteOutlined />
          </Button>,
        ]}
      >
        <List.Item.Meta title={item.title} description={item.url} />
      </List.Item>
    );
}
