import React, { useState, useEffect } from 'react';
import { Switch, List, Button, notification, Modal as Modalant } from 'antd';
import DragSortableList from "react-drag-sortable";
import { EditOutlined, DeleteOutlined, CheckOutlined, CloseOutlined } from "@ant-design/icons";

// API
// ....
import { updateMenuApi } from '../../.././../api/menu';
import { getAccessTokenApi } from '../../../../api/auth';

// COMPONENTS
// ....
import AddMenuFrom from '../AddMenuform';


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
                content: <MenuItem item={item} updateMenu={updateMenu} />,
            });
        });
        setListItems(listItems);
    }, [menu]);

    const updateMenu = (item, active) => {
        const accessToken = getAccessTokenApi();
        updateMenuApi(accessToken, item._id, { active })
            .then(result => {
                notification['success']({ message: result });
            });
    };

    const onSort = (sortedList, dropEvent) => {
        const accessToken = getAccessTokenApi();
        sortedList.forEach(item => {
            const { _id } = item.content.props.item;
            const order = item.rank;
            updateMenuApi(accessToken, _id, { order });
        });
    };

    const addMenuModal = () => {
        setIsVisibleModal(true);
        setModalTitle('New menu');
        setModalContent(
            <AddMenuFrom />
        );
    }

    return (
      <div className="menu-list">
        <div className="menu-list__header">
          <Button type="primary" onClick={addMenuModal}>
            {" "}
            New Menu{" "}
          </Button>
        </div>
        <div className="menu-list__items">
          <DragSortableList items={listItems} onSort={onSort} type="vertical" />
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
    const { item, updateMenu } = props;
    return (
        <List.Item
            actions={[
                <Switch defaultChecked={item.active} onChange={(e) => updateMenu(item, e)}
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
            <List.Item.Meta title={item.title} description={item.url} />
        </List.Item>
    );
}
