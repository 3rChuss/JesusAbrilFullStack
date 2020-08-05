import React, { useState } from 'react';
import { Form, Input, Button, Select, notification } from 'antd';
import { FontSizeOutlined } from '@ant-design/icons';

import './AddMenuForm.scss'

export default function AddMenuForm(props) {
    const { reload, setReload } = props;

    return (
      <div className="add-menu-form">
        <AddForm />
      </div>
    );
}

function AddForm(props) {
    const { Option } = Select;

    const selectBefore = (
        <Select
            defaultValue="https://"
            style={{ width: 90 }}
            //onChange={}
        >
            <Option value="https://">https://</Option>
            <Option value="http://">http://</Option>
        </Select>
    )

    return (
        <Form className="form-add">
            <Form.Item>
                <Input
                    prefix={<FontSizeOutlined />}
                    placeholder="Title"
                    //value={}
                    //onChange={}
                />
            </Form.Item>
            <Form.Item>
                <Input
                    addonBefore={selectBefore}
                    placeholder="URL"
                    //value={}
                    //onChange={}
                />
            </Form.Item>
            <Form.Item>
                <Button type="primary" htmlType="submit" className="btn-submit">
                    Add new menu
                </Button>
            </Form.Item>
        </Form>
    )
}