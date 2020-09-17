import React, { useState } from 'react';
import { Form, Input, Button, Col, Row, notification } from 'antd';
import { FontSizeOutlined, EditOutlined, TagOutlined } from "@ant-design/icons";

import { updateMenuApi } from "../../../../api/menu";
import { getAccessTokenApi } from '../../../../api/auth';

import './AddMenuForm.scss'
import MenuWeb from '../../../../pages/Admin/MenuWeb/MenuWeb';

export default function AddMenuForm(props) {
  const { setIsVisibleModal, setReloadMenu, menuSelected } = props;

  const [menuData, setMenuData] = useState({});

  const addMenu = (e) => {
    e.preventDefault();
    let data = {
      title: menuData.title,
      url: `https://${menuData.url}`,
      cssClass: menuData.cssClass,
      anchorId: menuData.anchorId,
    };

    if (!data.title || !data.url || !menuData.url) {
      notification["error"]({
        message: "Title and URL are required",
      });
    } else {
      const accessToken = getAccessTokenApi();
      data.active = false;
      data.order = 1000;

      updateMenuApi(accessToken, menuSelected, data)
        .then((response) => {
          notification["success"]({
            message: response.message,
          });
          setIsVisibleModal(false);
          setReloadMenu(true);
          setMenuData({});
          data = {};
        })
        .catch((err) => {
          notification["error"]({
            message: err,
          });
        });
    };
  };

  return (
    <div className="add-menu-form">
      <AddForm
        menuData={menuData}
        setMenuData={setMenuData}
        addMenu={addMenu}
      />
    </div>
  );
};
               

function AddForm(props) {
    const { menuData, setMenuData, addMenu } = props;
    let domainName = window.location.origin
      .replace("https://", "")
      .replace("www.", "")
      .split(/[/?#]/)[2];

    return (
      <Form className="form-add" onSubmitCapture={addMenu}>
        <Form.Item>
          <Input
            prefix={<FontSizeOutlined />}
            placeholder="Title"
            value={MenuWeb.title}
            onChange={(e) =>
              setMenuData({ ...menuData, title: e.target.value })
            }
          />
        </Form.Item>
        <Form.Item>
          <Input
            addonBefore="https://"
            placeholder="URL"
            value={MenuWeb.url}
            onChange={(e) => setMenuData({ ...menuData, url: e.target.value })}
            autoComplete="true"
            list="current"
          />
          <datalist id="current">
            <option value={domainName + '/'} />
          </datalist>
        </Form.Item>

        <Row gutter={[8, 8]}>
          <Col span={12}>
            <Form.Item>
              <Input
                prefix={<EditOutlined />}
                placeholder="CSS Classes"
                value={MenuWeb.cssClass}
                onChange={(e) =>
                  setMenuData({ ...menuData, cssClass: e.target.value })
                }
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item>
              <Input
                prefix={<TagOutlined />}
                placeholder="Id"
                value={MenuWeb.anchorId}
                onChange={(e) =>
                  setMenuData({ ...menuData, anchorId: e.target.value })
                }
              />
            </Form.Item>
          </Col>
        </Row>

        <Form.Item>
          <Button type="primary" htmlType="submit" className="btn-submit">
            Add new menu
          </Button>
        </Form.Item>
      </Form>
    );
}