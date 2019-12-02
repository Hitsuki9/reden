import React from 'react';
import { useSelector } from 'react-redux';
import {
  Modal,
  Tabs
} from 'antd';
import Sign from '@/components/Sign';
import { State } from '@/store/reducer';
import useAction from '@/hooks/useAction';
import { noop, fetch } from '@/utils';

const { TabPane } = Tabs;

/**
 * 登录注册框
 */
export default function Dialog () {
  const visible = useSelector((state: State) => state.status.loginAndRegisterDialogVisible);
  const actions = useAction();

  async function login (username: string, password: string) {
    const [err, res] = await fetch('login', {
      username,
      password
    });
    console.log(err, res);
  }

  async function register (username: string, password: string) {
    const [err, res] = await fetch('register', {
      username,
      password
    });
    console.log(err, res);
  }

  // const loginProps = {
  //   btnName: '登录',
  //   handleSubmit: login
  // };

  // const registerProps = {
  //   btnName: '注册',
  //   handleSubmit: register
  // };

  return (
    <>
      {
        visible
        && (
          <Modal
            title=""
            visible={visible}
            footer={null}
            onOk={noop}
            onCancel={() => actions.setStatus('loginAndRegisterDialogVisible', false)}
          >
            <Tabs defaultActiveKey="1" onChange={noop} tabBarStyle={{ textAlign: 'center' }}>
              <TabPane tab="登录" key="1">
                <Sign btnName="登录" handleSubmit={login} />
              </TabPane>

              <TabPane tab="注册" key="2">
                <Sign btnName="注册" handleSubmit={register} />
              </TabPane>
            </Tabs>
          </Modal>
        )
      }
    </>
  );
}
