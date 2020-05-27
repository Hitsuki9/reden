import React, { memo, FC } from 'react';
import classNames from 'classnames';
import { Avatar } from 'antd';
import styles from './Card.less';

interface CardProps {
  /** 联系人名称 */
  name: string;
  /** 联系人头像 */
  avatar: string;
  /** 额外的样式 */
  extraStyle?: Record<string, string>;
}

const Card: FC<CardProps> = (props) => {
  const { name, avatar, extraStyle } = props;

  return (
    <div
      style={extraStyle}
      className={classNames(styles.card, 'flex-v-center')}
    >
      <Avatar src={avatar} size={48} />
      <div className={styles.content}>
        <span>{name}</span>
      </div>
    </div>
  );
};

export default memo(Card);
