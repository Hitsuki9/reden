import React from 'react';
import styles from './Chat.less';
import useLogin from '@/hooks/useLogin';

export default function Chat () {
  const isLogin = useLogin();

  return (
    <div className={styles.chat}>
      <div className={styles.chatPanel}>
        chatPanel
      </div>
      <div className={styles.inputBar}>
        {
          isLogin
            ? 'input'
            : 'login'
        }
      </div>
    </div>
  );
}
