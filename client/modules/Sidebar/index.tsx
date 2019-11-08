import React from 'react';
import { Avatar, Tooltip, Button } from 'antd';
import Style from './Sidebar.less';
import avatar from '@/assets/images/Hitsuki9.jpg';

interface BtnItem {
  /** Tooltip 提示文字 */
  title: string;
  /** 按钮图标 */
  icon: string;
  /** 跳转链接 */
  href: string;
}

export default function Sidebar () {
  const handleClick = (href: string) => {
    window.open(href);
  };

  const btnGroup: BtnItem[] = [
    { title: 'GitHub', icon: 'github', href: 'https://github.com/Hitsuki9/fiora-v9' }
  ];

  return (
    <div className={Style.sidebar}>
      <Avatar className={Style.avatar} src={avatar} size={60} />
      {
        btnGroup.map((item) => (
          <Tooltip placement="right" title={item.title} key={item.title}>
            <Button shape="circle" icon={item.icon} onClick={() => handleClick(item.href)} />
          </Tooltip>
        ))
      }
    </div>
  );
}
