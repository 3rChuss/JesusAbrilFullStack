import React, { useState, useCallback, useEffect } from 'react';
import { Avatar, Form, Input, Select, Button, Row, Col, notification } from 'antd';
import { useDropzone } from "react-dropzone";
import { UserOutlined, MailOutlined, LockOutlined } from "@ant-design/icons";

// API
// ....
import { getAvatarApi, uploadAvatarApi, updateUserApi } from '../../../../api/user';
import { getAccessTokenApi } from '../../../../api/auth';

import noAvatar from '../../../../assets/imgs/png/no-avatar.png';
import './EditUserForm.scss';

export default function EditUserForm(props) { 
  const { user, setIsVisibleModal, setReload } = props;
  const [avatar, setAvatar] = useState(null);
  const [userData, setUserData] = useState({});

  useEffect(() => {
    setUserData({
      name: user.name,
      lastName: user.lastName,
      email: user.email,
      role: user.role,
      avatar: user.avatar,
    });
  }, [user]);
  
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
  
  useEffect(() => {
    if (avatar) {
      setUserData({ ...userData, avatar: avatar.file })
      }
  }, [avatar]);

  const updateUser = e => {
    e.preventDefault();
    
    const token = getAccessTokenApi();
    let userUpdate = userData;

    if (userUpdate.password || userUpdate.repeatPassword) {
      if (userUpdate.password !== userUpdate.repeatPassword) {
        notification['error']({
          message: 'Passwords not equals'
        });
        return;
      } else {
        delete userUpdate.repeatPassword;
      }
    }

    if (!userUpdate.name || !userUpdate.lastName || !userUpdate.email) {
      notification['error']({
        message: "All inputs are required"
      });
      return;
    }
    if (typeof userUpdate.avatar === "object") {
      uploadAvatarApi(token, userUpdate.avatar, user._id)
        .then(response => {
          userUpdate.avatar = response.avatarName;
          updateUserApi(token, userUpdate, user._id)
            .then(result => {
              notification['success']({
                message: result.message
              });
              setIsVisibleModal(false);
              setReload(true);
            });
        });
    } else {
      updateUserApi(token, userUpdate, user._id).then((result) => {
        notification["success"]({
          message: result.message,
        });
        setIsVisibleModal(false);
        setReload(true);
      });
    }

  };

  return (
    <div className="edit-user-form">
      <UploadAvatar avatar={avatar} setAvatar={setAvatar} />
      <EditForm userData={userData} setUserData={setUserData} updateUser={updateUser} />
    </div>
  );
}
 
function UploadAvatar(props) {
  const { avatar, setAvatar } = props;
  const [avatarUrl, setAvatarUrl] = useState(null);

  useEffect(() => {
    if (avatar) {
      if (avatar.preview) {
        setAvatarUrl(avatar.preview)
      } else {
        setAvatarUrl(avatar)
      }
    } else {
      setAvatarUrl(null)
    }
  }, [avatar])

    const onDrop = useCallback(
        acceptedFiles => {
            const file = acceptedFiles[0];
            setAvatar({ file, preview: URL.createObjectURL(file) })
        }, [setAvatar]
    );

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
      accept: "image/jpeg, image/png, images/wepb",
      noKeyboard: true,
      onDrop,
    });

    return (
        <div className="upload-avatar" {...getRootProps()}>
            <input {...getInputProps()} />
            {isDragActive ? (
                <Avatar size={150} src={noAvatar} />
            ) : (
                <Avatar size={150} src={avatarUrl ? avatarUrl : noAvatar} />
            )}
        </div>
    )

}

function EditForm(props) {
    const { userData, setUserData, updateUser } = props;
    const { Option } = Select;

    return (
      <Form className="form-edit" onSubmitCapture={updateUser}>
        <Row gutter={24}>
          <Col span={12}>
            <Form.Item>
              <Input
                prefix={<UserOutlined />}
                placeholder="name"
                value={userData.name}
                onChange={(e) =>
                  setUserData({ ...userData, name: e.target.value })
                }
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item>
              <Input
                prefix={<UserOutlined />}
                placeholder="last name"
                value={userData.lastName}
                onChange={(e) =>
                  setUserData({ ...userData, lastName: e.target.value })
                }
              />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={24}>
          <Col span={12}>
            <Form.Item>
              <Input
                prefix={<MailOutlined />}
                placeholder="email"
                value={userData.email}
                onChange={(e) =>
                  setUserData({ ...userData, email: e.target.value })
                }
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item>
              <Select
                placeholder="role"
                onChange={(e) => setUserData({ ...userData, role: e })}
                value={userData.role}
              >
                <Option value="admin">Administrator</Option>
                <Option value="writer">Writer</Option>
                <Option value="user">User</Option>
              </Select>
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={24}>
          <Col span={12}>
            <Form.Item>
              <Input.Password
                prefix={<LockOutlined />}
                type="password"
                placeholder="new password"
                onChange={(e) =>
                  setUserData({ ...userData, password: e.target.value })
                }
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item>
              <Input.Password
                prefix={<LockOutlined />}
                type="password"
                placeholder="repeat new password"
                onChange={(e) =>
                  setUserData({ ...userData, repeatPassword: e.target.value })
                }
              />
            </Form.Item>
          </Col>
        </Row>
        <Form.Item>
          <Button type="primary" htmlType="submit" className="btn-submit">
            Update
          </Button>
        </Form.Item>
      </Form>
    );
}