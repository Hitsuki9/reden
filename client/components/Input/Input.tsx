import React from 'react';
import classNames from 'classnames';
import { Icon } from 'antd';
import useLogin from '@/hooks/useLogin';
import useAction from '@/hooks/useAction';
import { noop } from '@/utils';
import Post from '@/components/Icons/Post';
import styles from './Input.less';

export default function Input() {
  const isLogin = useLogin();
  const actions = useAction();
  const unlistedJSX = (
    <p className={styles.guest}>
      游客朋友你好, 请
      <b
        className="btn-pointer"
        role="button"
        onClick={() => actions.setStatus('loginAndRegisterDialogVisible', true)}
        onKeyUp={noop}
      >
        登录
      </b>
      后参与聊天
    </p>
  );
  const listedJSX = (
    <div className={styles.inputWrap}>
      <input className={styles.innerInput} onKeyUp={noop} type="text" />
      <Icon
        className={classNames(styles.post, 'btn-pointer')}
        component={Post}
      />
    </div>
  );

  return (
    <div className={classNames(styles.input, 'flex-center')}>
      {isLogin ? listedJSX : unlistedJSX}
    </div>
  );
}
