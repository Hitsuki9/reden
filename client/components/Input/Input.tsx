import React from 'react';
import useLogin from '@/hooks/useLogin';
import styles from './Input.less';

export default function Input () {
  const isLogin = useLogin();

  if (!isLogin) {
    return (
      <p className={styles.guest}>
        游客朋友你好, 请
        <b className="btn-pointer" role="button"> 登录 </b>
        后参与聊天
      </p>
    );
  }

  return (
    <div className={styles.inputWrap}>
      <input
        className={styles.input}
        type="text"
      />
    </div>
  );
}
