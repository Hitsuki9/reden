import React, { MouseEvent } from 'react';
import { Icon } from 'antd';
import classNames from 'classnames';
import styles from './Header.less';
import { noop } from '@/utils';
import useLogin from '@/hooks/useLogin';

interface HeaderProps {
  /** 联系人名称 */
  name: string;
  /** 联系人类型 */
  type: string;
  /** 功能按钮点击事件回调 */
  clickHandler?: (event: MouseEvent) => void;
}

const iconStyle = {
  fontSize: '24px'
};

export default function Header (props: HeaderProps) {
  const { name = '', type = '', clickHandler = noop } = props;
  const isLogin = useLogin();

  return (
    <div className={classNames(styles.header, 'flex-v-center')}>
      <h2 className={styles.name}>
        {name}
      </h2>
      {
        isLogin && type === 'group'
        && (
          <Icon
            className="iconfont"
            style={iconStyle}
            role="button"
            type="team"
            onClick={clickHandler}
          />
        )
      }
    </div>
  );
}
