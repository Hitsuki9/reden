import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Drawer } from 'antd';
import styles from './Chat.less';
import Input from '@/components/Input';
import { State } from '@/store/reducer';
import Header from '@/components/Header';

export default function Chat () {
  const hasUserInfo = useSelector((state: State) => !!state.user);
  const linkman = useSelector((state: State) => (state.linkmans[state.focus]));
  const [showDrawer, setShowDrawer] = useState(false);

  const clickHandle = () => {
    setShowDrawer(true);
  };

  return (
    <div className={styles.chat}>
      <Drawer
        title="群组成员"
        placement="right"
        mask={false}
        style={{ position: 'absolute' }}
        getContainer={false}
        visible={showDrawer}
      >
        list
      </Drawer>
      {
        hasUserInfo
        && (
          <>
            {
              linkman
              && <Header name={linkman.name} type={linkman.type} clickHandler={clickHandle} />
            }
            <div className={styles.chatPanel}>
              {
                linkman ? '历史消息' : '先加个好友或者群组才能聊天哦~'
              }
            </div>
            <Input />
          </>
        )
      }
    </div>
  );
}
