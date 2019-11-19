import React from 'react';
import { useSelector } from 'react-redux';
import { Modal, Tabs } from 'antd';
import { State } from '@/store/reducer';
import useAction from '@/hooks/useAction';
import { noop } from '@/utils';

const { TabPane } = Tabs;

export default function Dialog () {
  const visible = useSelector((state: State) => state.status.loginAndRegisterDialogVisible);
  const actions = useAction();

  return (
    <>
      {
        visible
        && (
          <Modal
            title="Modal"
            visible={visible}
            onOk={noop}
            onCancel={() => actions.setStatus('loginAndRegisterDialogVisible', false)}
          >
            <Tabs defaultActiveKey="1" onChange={noop}>
              <TabPane tab="登录" key="1">
                Login
              </TabPane>
              <TabPane tab="注册" key="2">
                Register
              </TabPane>
            </Tabs>
          </Modal>
        )
      }
    </>
  );
}
