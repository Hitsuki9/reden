import React from 'react';
import { Avatar } from 'antd';
import styles from './Card.less';

interface CardProps {
  /** 联系人名称 */
  name: string;
  /** 联系人头像 */
  avatar: string;
}

export default function Card (props: CardProps) {
  const { name, avatar } = props;

  return (
    <div className={styles.card}>
      <Avatar src={avatar} size={48} />
      <span>{name}</span>
    </div>
  );
}
