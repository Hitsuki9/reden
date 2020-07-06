import React, { MouseEvent } from 'react';
import { TeamOutlined } from '@ant-design/icons';
import classNames from 'classnames';
import { noop } from '@/utils';
import useLogin from '@/hooks/useLogin';
import CommonClass from '@style/constant';
import styles from './Header.less';

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

export default function Header(props: HeaderProps) {
  const { name = '', type = '', clickHandler = noop } = props;
  const isLogin = useLogin();

  return (
    <div className={classNames(styles.header, CommonClass.FlexVCenter)}>
      <h2 className={styles.name}>{name}</h2>
      {isLogin && type === 'group' && (
        <TeamOutlined
          className={CommonClass.Iconfont}
          style={iconStyle}
          role="button"
          onClick={clickHandler}
        />
      )}
    </div>
  );
}
