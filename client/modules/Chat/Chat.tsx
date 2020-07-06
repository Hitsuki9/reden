import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Drawer, Empty } from 'antd';
import classNames from 'classnames';
import useUserInfo from '@/hooks/useUserInfo';
import Input from '@/components/Input';
import { State } from '@/store/reducer';
import Header from '@/components/Header';
import CommonClass from '@style/constant';
import style from './Chat.less';

export default function Chat() {
  const hasUserInfo = useUserInfo();
  const linkman = useSelector((state: State) => state.linkmans[state.focus]);
  const [showDrawer, setShowDrawer] = useState(false);

  const clickHandle = () => {
    setShowDrawer(true);
  };

  return (
    <div className={style.chat}>
      <Drawer
        title="群组信息"
        placement="right"
        mask={false}
        style={{ position: 'absolute' }}
        getContainer={false}
        visible={showDrawer}
      >
        list
      </Drawer>
      {hasUserInfo && (
        <>
          {linkman && (
            <Header
              name={linkman.name}
              type={linkman.type}
              clickHandler={clickHandle}
            />
          )}
          <div className={style.chatPanel}>
            {linkman ? (
              '历史消息'
            ) : (
              <div
                className={classNames(style.emptyWrap, CommonClass.FlexCenter)}
              >
                <Empty description="先加个好友或者群组才能聊天哦~" />
              </div>
            )}
          </div>
          <Input />
        </>
      )}
    </div>
  );
}
