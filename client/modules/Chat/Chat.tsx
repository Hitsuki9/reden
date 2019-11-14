import React from 'react';
import classNames from 'classnames';
import styles from './Chat.less';
import Input from '@/components/Input';

export default function Chat () {
  return (
    <div className={styles.chat}>
      <div className={styles.chatPanel}>
        chatPanel
      </div>
      <div className={classNames(styles.inputBar, 'flex-center')}>
        <Input />
      </div>
    </div>
  );
}
