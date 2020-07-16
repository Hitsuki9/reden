import React, { useState, KeyboardEvent } from 'react';
import { useSelector } from 'react-redux';
import { Drawer, Empty } from 'antd';
import Icon from '@ant-design/icons';
import classNames from 'classnames';
import useLogin from '@/hooks/useLogin';
import useUserInfo from '@/hooks/useUserInfo';
import useAction from '@/hooks/useAction';
import Input from '@/components/Input';
import Post from '@/components/Icons/Post';
import { sendMessage } from '@/services';
import { State } from '@/store/reducer';
import { noop } from '@/utils';
import CommonClass from '@style/constant';
import Header from './Header';
import style from './Chat.less';

export default function Chat() {
  const isLogin = useLogin();
  const hasUserInfo = useUserInfo();
  const actions = useAction();
  const linkman = useSelector((state: State) => state.linkmans[state.focus]);
  const [showDrawer, setShowDrawer] = useState(false);
  const [content, setContent] = useState('');
  const keyDownHandler = async (event: KeyboardEvent<HTMLInputElement>) => {
    if (!content) return;
    if (!linkman) return;
    const { keyCode } = event;
    if (keyCode && keyCode !== 13) return;
    setContent('');
    await sendMessage(linkman._id, linkman.type, 'text', content);
  };

  const clickHandler = () => {
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
              onClick={clickHandler}
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

          {/* 输入框 */}
          <div className={classNames(style.inputWrap, CommonClass.FlexCenter)}>
            {isLogin ? (
              <Input
                content={content}
                placeholder="随便聊点啥吧~"
                onChange={(event) => setContent(event.target.value)}
                onKeyDown={keyDownHandler}
                suffix={
                  <Icon
                    className={classNames(style.post, CommonClass.Pointer)}
                    component={Post}
                    onClick={noop}
                  />
                }
              />
            ) : (
              <p className={style.guest}>
                游客朋友你好, 请
                <b
                  className={CommonClass.Pointer}
                  role="button"
                  onClick={() =>
                    actions.setStatus('loginAndRegisterDialogVisible', true)
                  }
                  onKeyUp={noop}
                >
                  登录
                </b>
                后参与聊天
              </p>
            )}
          </div>
        </>
      )}
    </div>
  );
}
