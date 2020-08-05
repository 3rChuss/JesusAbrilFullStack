import React, { useState, useEffect } from 'react';
import { Switch, List, Avatar, Button, notification, Modal as ModalAntd } from 'antd';
import noAvatar from '../../../../assets/imgs/png/no-avatar.png';
import {
  EditOutlined,
  StopOutlined,
  DeleteOutlined,
  CheckOutlined,
  CloseOutlined,
} from "@ant-design/icons";

// API
// ....
import {
  getAvatarApi,
  activateUserApi,
  deleteUserApi,
} from "../../../../api/user";
import { getAccessTokenApi } from '../../../../api/auth';

// Components
// ....
import Modal from '../../../Modal';
import EditUserForm from '../EditUserForm';
import AddUserForm from '../AddUserForm';

import './ListUsers.scss';

// Const
// ....
const { confirm } = ModalAntd;
const showDeleteModal = (user, setReload) => {
    const accessToken = getAccessTokenApi();

    confirm({
        title: "⚠️ Remove user ⚠️",
        content: `Are you sure you want to delete the user ${user.email}?`,
        okText: "Delete User",
        okType: "danger",
        cancelText: "No! Cancel please",
        onOk() {
            deleteUserApi(accessToken, user._id)
              .then((response) => {
                notification["success"]({
                  message: "User deleted successfully.",
                });
                setReload(true);
              })
              .catch((err) => {
                notification["error"]({
                  message: err.message,
                });
              });
        },
    });
};

export default function ListUsers(props) {
    const { usersActive, usersInactive, setReload } = props;
    const [viewUsersActive, setViewUsersActive] = useState(true);
    const [isVisibleModal, setIsVisibleModal] = useState(false);
    const [modalTitle, setModalTitle] = useState("");
    const [modalContent, setModalContent] = useState(null);

    const addUserModal = () => {
        setIsVisibleModal(true)
        setModalTitle('Create new user');
        setModalContent(
            <AddUserForm setIsVisibleModal={setIsVisibleModal} setReload={setReload} />
        );
    }
    
    return (
      <div className="list-users">
        <div className="list-users__header">
          <div className="list-users__header-switch">
            <Switch
              defaultChecked
              onChange={() => setViewUsersActive(!viewUsersActive)}
              checkedChildren={<CheckOutlined />}
              unCheckedChildren={<CloseOutlined />}
            />
            <span>
              {viewUsersActive
                ? "Showing Active users"
                : "Showing Inactive users"}
            </span>
          </div>
          <Button type="primary" onClick={addUserModal}>
            New user
          </Button>
        </div>

        {viewUsersActive ? (
          <UsersActive
            usersActive={usersActive}
            setIsVisibleModal={setIsVisibleModal}
            setModalTitle={setModalTitle}
            setModalContent={setModalContent}
            setReload={setReload}
          />
        ) : (
          <UsersInactive usersInactive={usersInactive} setReload={setReload} />
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

function UsersActive(props) {
    const {
      usersActive,
      setIsVisibleModal,
      setModalTitle,
      setModalContent,
      setReload,
    } = props;

    const editUser = user => {
        setIsVisibleModal(true);
        setModalTitle(`Edit ${!user.name ? '"no name"': user.name} : ${user.email}`)
        setModalContent(
          <EditUserForm
            user={user}
            setIsVisibleModal={setIsVisibleModal}
            setReload={setReload}
          />
        );
    }

    return (
      <List
        className="users-active"
        itemLayout="horizontal"
        dataSource={usersActive}
        renderItem={(user) => (
            <UserActive user={user} editUser={editUser} setReload={setReload}/>
        )}
      />
    );
}

function UserActive(props) {
    const { user, editUser, setReload } = props;
    const [avatar, setAvatar]= useState(null)

    useEffect(() => {
        if (user.avatar) {
            getAvatarApi(user.avatar)
                .then(response => {
                    setAvatar(response)
                })
        } else {
            setAvatar(null);
        }
    }, [user]);

    const deactivateUser = () => {
      const accessToken = getAccessTokenApi();
      activateUserApi(accessToken, user._id, false)
        .then((response) => {
          notification["success"]({
            message: response,
          });
            setReload(true);
        })
        .catch((err) => {
          notification["error"]({
            message: err,
          });
        });
    };


    return (
      <List.Item
        actions={[
          <Button
            type="primary"
            onClick={() => editUser(user)}
            icon={<EditOutlined />}
          ></Button>,
          <Button
            type="danger"
            onClick={deactivateUser}
            icon={<StopOutlined />}
          ></Button>,
          <Button
            type="danger"
            onClick={() => showDeleteModal(user, setReload)}
            icon={<DeleteOutlined />}
          ></Button>,
        ]}
      >
        <List.Item.Meta
          avatar={<Avatar src={avatar ? avatar : noAvatar} />}
          title={`
                            ${user.name ? user.name : "..."} 
                            ${user.lastName ? user.lastName : "..."}
                        `}
          description={user.email}
        />
      </List.Item>
    );
}

function UsersInactive(props) {
    const { usersInactive, setReload } = props;

    return (
      <List
        className="users-active"
        itemLayout="horizontal"
        dataSource={usersInactive}
        renderItem={(user) => (
          <UserInactive user={user} setReload={setReload} />
        )}
      />
    );
}

function UserInactive(props) {
    const { user, setReload } = props;
    const [avatar, setAvatar] = useState(null);

    useEffect(() => {
        if (user.avatar) {
            getAvatarApi(user.avatar).then((response) => {
                setAvatar(response);
            });
        } else {
            setAvatar(null);
        }
    }, [user]);

    const activateUser = () => {
        const accessToken = getAccessTokenApi();
        activateUserApi(accessToken, user._id, true)
            .then(response => {
                notification['success']({
                    message: response
                });
                setReload(true);
            })
            .catch(err => {
                notification['error']({
                    message: err
                });
            });
    };

    return (
      <List.Item
        actions={[
          <Button
            type="success"
            onClick={activateUser}
            icon={<CheckOutlined />}
          ></Button>,
          <Button
            type="danger"
            onClick={() => showDeleteModal(user, setReload)}
            icon={<DeleteOutlined />}
          ></Button>,
        ]}
      >
        <List.Item.Meta
          avatar={<Avatar src={avatar ? avatar : noAvatar} />}
          title={`
                        ${user.name ? user.name : "..."} 
                        ${user.lastName ? user.lastName : "..."}
                    `}
          description={user.email}
        />
      </List.Item>
    );
}