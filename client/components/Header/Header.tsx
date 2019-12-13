import React, { MouseEvent } from 'react';
import { Icon } from 'antd';
import classNames from 'classnames';
import styles from './Header.less';
import { noop } from '@/utils';

interface HeaderProps {
  /** 联系人名称 */
  name: string;
  /** 联系人类型 */
  type: string;
  /** 功能按钮点击事件回调 */
  clickHandler?: (event: MouseEvent) => void;
}

export default function Header (props: HeaderProps) {
  const { name = '', clickHandler = noop } = props;

  return (
    <div className={classNames(styles.header, 'flex-v-center')}>
      <h2 className={styles.name}>
        <span>{name}</span>
      </h2>
      <Icon role="button" type="team" onClick={clickHandler} />
    </div>
  );
}
