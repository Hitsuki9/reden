import React, { memo, FC } from 'react';
import classNames from 'classnames';
import { Avatar } from 'antd';
import CommonClass from '@style/constant';
import style from './Card.less';

interface CardProps {
  /** 联系人名称 */
  name: string;
  /** 联系人头像 */
  avatar: string;
  /** 额外的样式 */
  extraStyle?: Record<string, string>;
}

const Card: FC<CardProps> = ({ name, avatar, extraStyle }) => (
  <div
    style={extraStyle}
    className={classNames(style.card, CommonClass.FlexVCenter)}
  >
    <Avatar className={CommonClass.Unselectable} src={avatar} size={48} />
    <div className={style.content}>
      <span>{name}</span>
    </div>
  </div>
);

export default memo(Card);
