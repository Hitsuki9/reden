import React from 'react';
import { useSelector } from 'react-redux';
import {
  Modal,
  Tabs,
  Form,
  Input,
  Icon,
  Button
} from 'antd';
import { State } from '@/store/reducer';
import useAction from '@/hooks/useAction';
import { noop, fetch } from '@/utils';

const { TabPane } = Tabs;

export default function Dialog () {
  const visible = useSelector((state: State) => state.status.loginAndRegisterDialogVisible);
  const actions = useAction();

  const login = async () => {
    const [err, res] = await fetch('register', {
      username: 'hitsuki9',
      password: 't8e8a8c0h2'
    });
    console.log(err, res);
  };

  return (
    <>
      {
        visible
        && (
          <Modal
            title="Modal"
            visible={visible}
            footer={null}
            onOk={noop}
            onCancel={() => actions.setStatus('loginAndRegisterDialogVisible', false)}
          >
            <Tabs defaultActiveKey="1" onChange={noop}>
              <TabPane tab="登录" key="1">
                <Form onSubmit={noop}>
                  <Form.Item>
                    <Input
                      prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                      placeholder="用户名"
                    />
                  </Form.Item>

                  <Form.Item>
                    <Input
                      prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                      type="password"
                      placeholder="密码"
                    />
                  </Form.Item>

                  <Form.Item>
                    <Button type="primary" onClick={login}>
                      登录
                    </Button>
                  </Form.Item>
                </Form>
              </TabPane>

              <TabPane tab="注册" key="2">
                <Form onSubmit={noop}>
                  <Form.Item>
                    <Input
                      prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                      placeholder="用户名"
                    />
                  </Form.Item>

                  <Form.Item>
                    <Input
                      prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                      type="password"
                      placeholder="密码"
                    />
                  </Form.Item>
                </Form>
              </TabPane>
            </Tabs>
          </Modal>
        )
      }
    </>
  );
}
