import React from 'react';
import { useSelector } from 'react-redux';
import classNames from 'classnames';
import { Avatar, Tooltip, Icon } from 'antd';
import styles from './Sidebar.less';
import { State } from '@/store/reducer';
import useLogin from '@/hooks/useLogin';

interface BtnItem {
  /** Tooltip 提示文字 */
  title: string;
  /** 按钮图标 */
  icon: string;
  /** 跳转链接 */
  href?: string;
}

const btnGroup: BtnItem[] = [
  { title: 'GitHub', icon: 'github', href: 'https://github.com/Hitsuki9/fiora-v9' },
  { title: '设置', icon: 'setting' },
  { title: '注销', icon: 'logout' }
];

/**
 * 点击事件回调
 * @param href 跳转链接
 */
const handleClick = (href?: string) => {
  window.open(href);
};

export default function Sidebar () {
  const isLogin = useLogin();
  const avatar = useSelector((state: State) => (state.user ? state.user.avatar : undefined));

  return (
    <div className={styles.sidebar}>
      <div className={styles.avatarWrap}>
        {
          isLogin
          && <Avatar className={styles.avatar} src={avatar} size={60} />
        }
      </div>
      <div className={classNames(styles.btnGroupWrap, 'flex-v-center')}>
        {
          btnGroup.map((item) => {
            if (!isLogin && (item.title === '设置' || item.title === '注销')) {
              return null;
            }
            return (
              <Tooltip placement="right" title={item.title} key={item.title}>
                <Icon
                  className={styles.btnItem}
                  type={item.icon}
                  role="button"
                  onClick={() => handleClick(item.href)}
                />
              </Tooltip>
            );
          })
        }
      </div>
    </div>
  );
}
