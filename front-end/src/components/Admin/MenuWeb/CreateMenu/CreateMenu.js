import React, { useState } from "react";
import { Form, Input, Button, notification } from "antd";

import { addMenuApi } from "../../../../api/menu";
import { getAccessTokenApi } from "../../../../api/auth";

import './CreateMenu.scss';

export default function CreateMenu(props) {
    const { setIsVisibleModal, setReloadMenu } = props;
    const [menuName, setMenuName] = useState("");

    const addMenu = e => {
        e.preventDefault();
        let data = {
            title: menuName
        };
        if (!menuName) {
            notification['error']({
                message: 'Menu name required.'
            });
        } else {
            const accessToken = getAccessTokenApi();
            addMenuApi(accessToken, data)
                .then((response) => {
                    notification['success']({
                        message: 'Menu created.'
                    });
                    setIsVisibleModal(false);
                    setReloadMenu(true);
                    setMenuName("");
                })
                .catch(err => {
                    notification['error']({
                        message: err
                    });
                });
        }
    }

    return (
        <div className="create-menu">
            <AddForm setMenuName={setMenuName} addMenu={addMenu}></AddForm>
        </div>
    )
}

function AddForm(props) {
    const { setMenuName, addMenu } = props;

    return (
        <Form
            className="form-create"
            onSubmitCapture={addMenu}
        >
            <Form.Item label={<em>Menu Name</em>}>
                <Input
                    placeholder="e.g: Menu-top"
                    onChange={(e) => setMenuName(e.target.value)}
                />
            </Form.Item>
            <Form.Item>
                <Button type="primary" htmlType="submit" className="btn-submit">
                    Create new menu
                </Button>
            </Form.Item>
        </Form>
    );

}