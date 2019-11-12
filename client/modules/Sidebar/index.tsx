import React from 'react';
import classNames from 'classnames';
import { Avatar, Tooltip, Button } from 'antd';
import useLogin from '@/hooks/useLogin';
import Style from './Sidebar.less';
import avatar from '@/assets/images/Hitsuki9.jpg';

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
  { title: '设置', icon: 'setting' }
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

  return (
    <div className={Style.sidebar}>
      <div className={Style['avatar-wrap']}>
        {
          isLogin
          && <Avatar className={Style.avatar} src={avatar} size={60} />
        }
      </div>
      <div className={classNames(Style['btn-group-wrap'], 'flex-v-center')}>
        {
          btnGroup.map((item) => {
            if (!isLogin && item.title === '设置') {
              return null;
            }
            return (
              <Tooltip placement="right" title={item.title} key={item.title}>
                <Button shape="circle" icon={item.icon} onClick={() => handleClick(item.href)} />
              </Tooltip>
            );
          })
        }
      </div>
    </div>
  );
}
