import React, { useState, useEffect } from 'react';
import { Form, Ixon, Input, Button, Col, Row, notification } from 'antd';
import { FontSizeOutlined, EditOutlined, TagOutlined } from "@ant-design/icons";

import { updateMenuApi } from '../../../../api/menu';
import { getAccessTokenApi } from '../../../../api/auth';

import './EditMenuWebForm.scss';

export default function EditMenuWebForm (props) {
    const { setIsVisibleModal, setReloadMenuWeb, menu, menuSelected } = props;
  const [menuData, setMenuData] = useState(menu);

  useEffect(() => {
    setMenuData(menu);
  }, [menu]);

  const editMenu = (e) => {
    e.preventDefault();
    if (!menuData.title || !menuData.url) {
      notification['error']({ message: 'Tittle and Url are required' })
    } else {
      const accesToken = getAccessTokenApi();

      updateMenuApi(accesToken, 'edit-menu', menuSelected, menuData)
        .then(response => {
          if (response.status == 404) {
            notification['error']({
              message: response
            })
          }
      })
    }
  }

    return (
      <div className="edit-menu-web-form">
            <EditForm
                menuData={menuData}
                setMenuData={setMenuData}
                editMenu={editMenu}
            />
      </div>
    );
}

function EditForm(props) {
    const { menuData, setMenuData, editMenu } = props;
    let domainName = window.location.origin;

    return (
      <Form className="form-edit" onSubmitCapture={editMenu}>
        <Form.Item>
          <Input
            prefix={<FontSizeOutlined />}
            placeholder="Title"
            value={menuData.title}
            onChange={(e) =>
              setMenuData({ ...menuData, title: e.target.value })
            }
          />
        </Form.Item>
        <Form.Item>
          <Input
            addonBefore="https://"
            placeholder="URL"
            value={menuData.url}
            onChange={(e) => setMenuData({ ...menuData, url: e.target.value })}
            autoComplete="true"
            list="current"
          />
          <datalist id="current">
            <option value={domainName + "/"} />
          </datalist>
        </Form.Item>

        <Row gutter={[8, 8]}>
          <Col span={12}>
            <Form.Item>
              <Input
                prefix={<EditOutlined />}
                placeholder="CSS Classes"
                value={menuData.cssClass}
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
                value={menuData.anchorId}
                onChange={(e) =>
                  setMenuData({ ...menuData, anchorId: e.target.value })
                }
              />
            </Form.Item>
          </Col>
        </Row>

        <Form.Item>
          <Button type="primary" htmlType="submit" className="btn-submit">
            Update menu
          </Button>
        </Form.Item>
      </Form>
    );
}