import React, { MouseEvent } from 'react';
import { useSelector } from 'react-redux';
import classNames from 'classnames';
import { Avatar, Tooltip } from 'antd';
import Icon, {
  GithubOutlined,
  SettingOutlined,
  ExportOutlined
} from '@ant-design/icons';
import { State } from '@/store/reducer';
import useLogin from '@/hooks/useLogin';
import useAction from '@/hooks/useAction';
import { noop, removeItem } from '@/utils';
import message from '@/utils/message';
import socket from '@/utils/socket';
import styles from './Sidebar.less';

interface BtnItem {
  /** Tooltip 提示文字 */
  title: string;
  /** 按钮图标 */
  Icon: typeof Icon;
  /** 点击事件回调 */
  handleClick: (event: MouseEvent) => void;
  /** 是否要求登录 */
  requireLogin?: boolean;
}

export default function Sidebar() {
  const isLogin = useLogin();
  const actions = useAction();
  const avatar = useSelector((state: State) =>
    state.user ? state.user.avatar : undefined
  );
  const btnGroup: BtnItem[] = [
    {
      title: 'GitHub',
      Icon: GithubOutlined,
      handleClick() {
        window.open('https://github.com/Hitsuki9/fiora-v9');
      }
    },
    {
      title: '设置',
      Icon: SettingOutlined,
      handleClick: noop,
      requireLogin: true
    },
    {
      title: '退出登录',
      Icon: ExportOutlined,
      handleClick() {
        actions.logout();
        removeItem('token');
        message.success('您已退出登录');
        socket.disconnect();
        socket.connect();
      },
      requireLogin: true
    }
  ];

  return (
    <div className={styles.sidebar}>
      <div className={classNames(styles.avatarWrap, 'flex-h-center')}>
        {isLogin && (
          <Avatar
            className={classNames(styles.avatar, 'pointer')}
            src={avatar}
            size={60}
          />
        )}
      </div>
      <div className={classNames(styles.btnGroupWrap, 'flex-v-center')}>
        {btnGroup.map((item) => {
          if (!isLogin && item.requireLogin) {
            return null;
          }
          return (
            <Tooltip placement="right" title={item.title} key={item.title}>
              <item.Icon
                className={classNames(styles.btnItem, 'flex-center')}
                role="button"
                onClick={item.handleClick}
              />
            </Tooltip>
          );
        })}
      </div>
    </div>
  );
}
