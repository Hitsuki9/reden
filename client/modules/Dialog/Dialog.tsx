import React, { useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { Modal, Tabs } from 'antd';
import Sign from '@/components/Sign';
import { State } from '@/store/reducer';
import { SetUserPayload } from '@/store/action';
import useAction from '@/hooks/useAction';
import { setValue, noop, platform } from '@/utils';
import { register, login } from '@/services';
import styles from './Dialog.less';

const { TabPane } = Tabs;
const refInitialValue = { resetFields: noop };

/**
 * 登录注册框
 */
export default function Dialog() {
  const visible = useSelector(
    (state: State) => state.status.loginAndRegisterDialogVisible
  );
  const actions = useAction();
  const [activeKey, setActiveKey] = useState('login');
  const loginRef = useRef<any>(refInitialValue);
  const registerRef = useRef<any>(refInitialValue);

  const callback = (user: SetUserPayload) => {
    actions.setUser(user);
    actions.setStatus('loginAndRegisterDialogVisible', false);
    setValue('token', user.token);

    const linkmanIds = user.linkmans.map((linkman) => ({
      type: linkman.type,
      id: linkman._id
    }));
    console.log(linkmanIds);
  };

  const loginHandler = async (username: string, password: string) => {
    const res = await login(
      username,
      password,
      platform.os,
      platform.browser,
      platform.environment
    );
    if (res) {
      callback(res);
    }
  };

  const registerHandler = async (username: string, password: string) => {
    const res = await register(
      username,
      password,
      platform.os,
      platform.browser,
      platform.environment
    );
    if (res) {
      callback(res);
    }
  };

  const changeHandler = (key: string) => {
    setActiveKey(key);
  };

  const closeHandler = () => {
    loginRef.current.resetFields();
    registerRef.current.resetFields();
    setActiveKey('login');
  };

  return (
    <Modal
      className={styles.dialog}
      width="400px"
      title=""
      visible={visible}
      footer={null}
      afterClose={closeHandler}
      onCancel={() => actions.setStatus('loginAndRegisterDialogVisible', false)}
    >
      <Tabs
        activeKey={activeKey}
        tabBarStyle={{ textAlign: 'center' }}
        onChange={changeHandler}
      >
        <TabPane tab="登录" key="login">
          <Sign
            ref={loginRef}
            btnText="登录"
            onSubmit={loginHandler}
            submitFlag={visible}
          />
        </TabPane>

        <TabPane tab="注册" key="register">
          <Sign
            ref={registerRef}
            btnText="注册"
            onSubmit={registerHandler}
            submitFlag={visible}
          />
        </TabPane>
      </Tabs>
    </Modal>
  );
}
