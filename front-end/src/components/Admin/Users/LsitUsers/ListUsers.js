import React, { useState } from 'react';
import { Switch, List, Avatar, Button } from 'antd';
import noAvatar from '../../../../assets/imgs/png/no-avatar.png';
import {
    EditOutlined, StopOutlined, DeleteOutlined, CheckOutlined
} from '@ant-design/icons';

// Components
// ....
import Modal from '../../../Modal';
import EditUserForm from '../EditUserForm';

import './ListUsers.scss';

export default function ListUsers(props) {
    const { usersActive, usersInactive } = props;
    const [viewUsersActive, setViewUsersActive] = useState(true);
    const [isVisibleModal, setIsVisibleModal] = useState(false);
    const [modalTitle, setModalTitle] = useState("");
    const [modalContent, setModalContent] = useState(null);
    
    return (
        <div className="list-users">
            <div className="list-users__switch">
                <Switch
                    defaultChecked
                    onChange={() => setViewUsersActive(!viewUsersActive)}
                />
                <span>
                    {viewUsersActive ? 'Showing Active users' : 'Showing Inactive users'}
                </span>
            </div>

            {viewUsersActive ? (
                <UserActive
                    usersActive={usersActive}
                    setIsVisibleModal={setIsVisibleModal}
                    setModalTitle={setModalTitle}
                    setModalContent={setModalContent}
                /> 
            ) : (
                    <UserInactive usersInactive={usersInactive} />
            )}

            <Modal
                title={modalTitle}
                isVisible={isVisibleModal}
                setIsVisible={setIsVisibleModal}
            >
                {modalContent}
            </Modal>
        </div>
    )

}

function UserActive(props) {
    const {
        usersActive,
        setIsVisibleModal,
        setModalTitle,
        setModalContent
    } = props;

    const editUser = user => {
        setIsVisibleModal(true);
        setModalTitle(`Editar ${!user.name ? '"no name"': user.name} : ${user.email}`)
        setModalContent(<EditUserForm user={user} />);
    }

    return (
        <List
            className="users-active"
            itemLayout="horizontal"
            dataSource={usersActive}
            renderItem={user => (
                <List.Item
                    actions={[
                        <Button
                            type="primary"
                            onClick={() => editUser(user)}
                            icon={<EditOutlined />}
                        >
                        </Button>,
                        <Button
                            type="danger"
                            onClick={() => console.log('deactivar user')}
                            icon={<StopOutlined />}
                        >
                        </Button>,
                        <Button
                            type="danger"
                            onClick={() => console.log('eliminar yuser')}
                            icon={<DeleteOutlined />}
                        ></Button>
                    ]}
                >
                    <List.Item.Meta
                        avatar={<Avatar src={user.avatar ? user.avatar : noAvatar} />}
                        title={`
                            ${user.name ? user.name : '...'} 
                            ${user.lastName ? user.lastName : '...'}
                        `}
                        description={user.email}
                    />
                </List.Item>
            )}
        />
    )
}

function UserInactive(props) {
    const { usersInactive } = props;

    return (
        <List
            className="users-active"
            itemLayout="horizontal"
            dataSource={usersInactive}
            renderItem={user => (
                <List.Item
                    actions={[
                        <Button
                            type="primary"
                            onClick={() => console.log('activar user')}
                            icon={<CheckOutlined />}
                        >
                        </Button>,
                        <Button
                            type="danger"
                            onClick={() => console.log('eliminar yuser')}
                            icon={<DeleteOutlined />}
                        ></Button>
                    ]}
                >
                    <List.Item.Meta
                        avatar={<Avatar src={user.avatar ? user.avatar : noAvatar} />}
                        title={`
                            ${user.name ? user.name : '...'} 
                            ${user.lastName ? user.lastName : '...'}
                        `}
                        description={user.email}
                    />
                </List.Item>
            )}
        />
    )
}