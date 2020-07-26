import React, { useState } from 'react';
import { Form, Input, Button, Checkbox, notification} from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { minLengthValidation, emailValidation } from '../../../utils/formValidation';

import { signUpApi } from '../../../api/user';

import './RegisterForm.scss';

export default function RegisterForm() {

    const [inputs, setInputs] = useState({
        email: "",
        password: "",
        repeatPassword: "",
        privacyPolicy: false
    });

    const [formValid, setFormValid] = useState({
        email: false,
        password: false,
        repeatPassword: false,
        privacyPolicy: false
    })

    const changeForm = e => {
        if(e.target.name === "privacyPolicy") {
            setInputs({
                ...inputs,
                [e.target.name]: e.target.checked
            });
        } else {
            setInputs({
                ...inputs,
                [e.target.name]: e.target.value
            });
        }
    }

    const inputValidation = e => {
        if (e.target.type === "password") {
            setFormValid({ ...formValid, [e.target.name]: minLengthValidation(e.target, 8) })
        }
        if (e.target.type === "checkbox") {
            setFormValid({...formValid, [e.target.name]: e.target.checked })
        }
        if (e.target.type === "email") {
            setFormValid({ ...formValid, [e.target.name]: emailValidation(e.target) })
        }
    }

    const register = async e => {
        if ( !inputs.email ||
             !inputs.password ||
             !inputs.repeatPassword ||
             !inputs.privacyPolicy ) {
                notification['error']({
                    message: 'All inputs are required'
                })
        } else {
            if (inputs.password !== inputs.repeatPassword) {
                notification['error']({
                    message: 'Both password should be the same'
                })
            } else {
                // Connect to the API and register user
                const result = await signUpApi(inputs);

                if (result.status !== 200) {
                    notification['error']({
                        message: 'User already registered'
                    })
                } else {
                    notification['success']({
                        message: 'User created, please check you email'
                    })
                }
                // Reset the form
                resetForm();
            }
        }
    }

    const resetForm = () => {
        const input = document.getElementsByTagName('input');
        for (let i = 0; i < input.length; i++){
            input[i].classList.remove('success');
            input[i].classList.remove('error');
        }
        setInputs({
            email: "",
            password: "",
            repeatPassword: "",
            privacyPolicy: false
        })

        setFormValid({
            email: false,
            password: false,
            repeatPassword: false,
            privacyPolicy: false
        })
    }

    return (
        <Form className="register-form" onChange={changeForm} onSubmitCapture={register}>
            <Form.Item
                rules={[
                    {
                        type:"email",
                        message: 'Email not valid'
                    },
                    { 
                        required: true, 
                        message: 'Please input your email'
                    }
                ]}>
                <Input
                    name="email"
                    prefix={<UserOutlined style={{ color: "rgba(0,0,0,.25)" }} />}
                    type="email"
                    placeholder="your@email.arg"
                    className="register-form__input"
                    onChange={inputValidation}
                    value={inputs.email}
                />
            </Form.Item>
            <Form.Item
                rules={[
                    { 
                        required: true, 
                        message: 'Please input your password'
                    }
                ]}>
                <Input.Password
                    name="password"
                    prefix={<LockOutlined style={{color: "rgba(0,0,0,.25)"}}/>}
                    type="password"
                    placeholder="Password"
                    className="register-form__input"
                    onChange={inputValidation}
                    value={inputs.password}
                />
            </Form.Item>
            <Form.Item 
                rules={[
                    { 
                        required: true, 
                        message: 'Please input your password again'
                    }
                ]}>
                <Input.Password
                    name="repeatPassword"
                    prefix={<LockOutlined style={{color: "rgba(0,0,0,.25)"}}/>}
                    type="password"
                    placeholder="Repeat Password"
                    className="register-form__input"
                    onChange={inputValidation}
                    value={inputs.repeatPassword}
                />
            </Form.Item>
            <Form.Item
                rules={[
                    {
                        required: true,
                        message: 'You need to agree to register'
                    }
                ]}>
                <Checkbox
                    name="privacyPolicy"
                    checked={inputs.privacyPolicy} 
                    onChange={inputValidation}
                >
                    I have read and agreed the privacy policy
                </Checkbox>
            </Form.Item>
            <Form.Item>
                <Button htmlType="submit" type="primary" className="register-form__button">
                    Register
                </Button>
            </Form.Item>
        </Form>
    )
}