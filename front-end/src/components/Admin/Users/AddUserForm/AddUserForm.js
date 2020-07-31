import React, { useState } from 'react';
import { Form, Input, Select, Button, Row, Col, notification } from 'antd';
import { UserOutlined, MailOutlined, LockOutlined } from "@ant-design/icons";

import { createNewUser } from "../../../../api/user";
import { getAccessTokenApi } from '../../../../api/auth';

import './AddUserForm.scss';

export default function EditUserForm(props) {
    const { setIsVisibleModal, setReload } = props;
    const [userData, setUserData] = useState({});

    const addUser = e => {
        e.preventDefault();
        if (
            !userData.name ||
            !userData.lastName ||
            !userData.email ||
            !userData.role ||
            !userData.password ||
            !userData.repeatPassword
        ) {
            notification['error']({
                message: 'All inputs are required.'
            });
        } else if (userData.password !== userData.repeatPassword) {
                notification["error"]({
                  message: "Passwords must to be the same"
                });
        } else {
            const accessToken = getAccessTokenApi();
            createNewUser(accessToken, userData)
              .then((response) => {
                notification["success"]({
                  message: "User created successfully",
                });
                setIsVisibleModal(false);
                setReload(true);
                setUserData({});
              })
              .catch((err) => {
                notification["error"]({
                  message: err.message,
                });
              });
        }
    }
    return (
        <div className="add-user-form">
            <AddForm
                userData={userData}
                setUserData={setUserData}
                addUser={addUser}
            />
        </div>
    )
}


function AddForm(props) {
    const { userData, setUserData, addUser } = props;
    const { Option } = Select;
    return (
      <Form className="form-add" onSubmitCapture={addUser}>
        <Row gutter={24}>
          <Col span={12}>
            <Form.Item>
              <Input
                prefix={<UserOutlined />}
                placeholder="Name"
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
                placeholder="Last name"
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
                placeholder="Email"
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
                placeholder="Select a role"
                onChange={(e) => setUserData({ ...userData, role: e })}
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
                placeholder="Password"
                value={userData.password}
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
                placeholder="Repeat password"
                value={userData.repeatPassword}
                onChange={(e) =>
                  setUserData({ ...userData, repeatPassword: e.target.value })
                }
              />
            </Form.Item>
          </Col>
            </Row>
            <Form.Item>
                <Button type="primary" htmlType="submit" className="btn-submit">
                    Create new user
                </Button>
            </Form.Item>
      </Form>
    );
}