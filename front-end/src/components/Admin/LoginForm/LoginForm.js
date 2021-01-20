import React, { useState }from 'react';
import { Form, Input, Button, notification, Checkbox } from "antd";
import { UserOutlined, LockOutlined } from '@ant-design/icons';

import { ACCESS_TOKEN, REFRESH_TOKEN } from '../../../utils/constants';

// API
// ....
import { signInApi } from '../../../api/user';

// CSS
// ....
import './LoginForm.scss';


export default function LoginForm() {
    const [inputs, setInputs] = useState({
        email: "",
        password: "",
        remember_me: false,
    });

    const changeForm = (e) => {
        setInputs({
            ...inputs,
            [e.target.name]: e.target.value,
        });
    }

    const login = async () => {

        const result = await signInApi(inputs);

        if (result.message) {
            notification["error"]({
                message: result.message,
            });
        } else {
            const { accessToken, refreshToken } = result;
            localStorage.setItem(ACCESS_TOKEN, accessToken);
            localStorage.setItem(REFRESH_TOKEN, refreshToken);

            //pending the remember_me to keep alive session

            notification["success"]({
                message: "Login Successful",
            });

            window.location.href = "/admin";
        }
    }

    return (
      <Form
        className="login-form"
        onChange={changeForm}
        onSubmitCapture={login}
        initialValues={{
          remember: true,
        }}
      >
        <Form.Item>
          <Input
            prefix={<UserOutlined style={{ color: "rgba(0,0,0,.25" }} />}
            type="email"
            name="email"
            placeholder="Email"
            className="login-form__input"
            required
          />
        </Form.Item>
        <Form.Item>
          <Input.Password
            prefix={<LockOutlined style={{ color: "rgba(0,0,0,.25" }} />}
            type="password"
            name="password"
            placeholder="Password"
                    className="login-form__input"
                    required
          />
        </Form.Item>
        <Form.Item
          name="remember_me"
          valuePropName="checked"
          className="login-form__checkbox"
        >
          <Checkbox>Remember me</Checkbox>
        </Form.Item>
        <Form.Item>
          <Button htmlType="submit" className="login-form__button">
            Sign In
          </Button>
        </Form.Item>
      </Form>
    );
}