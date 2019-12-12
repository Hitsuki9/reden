import React from 'react';
import { useSelector } from 'react-redux';
import classNames from 'classnames';
import styles from './Chat.less';
import Input from '@/components/Input';
import { State } from '@/store/reducer';

export default function Chat () {
  const hasUserInfo = useSelector((state: State) => !!state.user);
  const inputStyle = {
    display: hasUserInfo ? 'flex' : 'none'
  };

  return (
    <div className={styles.chat}>
      <div className={styles.chatPanel}>
        chatPanel
      </div>
      <div
        className={classNames(styles.inputBar, 'flex-center')}
        style={inputStyle}
      >
        <Input />
      </div>
    </div>
  );
}
