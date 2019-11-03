import React from 'react';
import Style from './Sidebar.less';
import avatar from '@/assets/images/Hitsuki9.jpg';
import Avatar from '@/components/common/Avatar';

export default function Sidebar () {
  return (
    <div className={Style.sidebar}>
      <Avatar className={Style.avatar} src={avatar} />
    </div>
  );
}
