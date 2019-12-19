import React, { KeyboardEvent, MouseEvent, useState } from 'react';
import { useSelector } from 'react-redux';
import classNames from 'classnames';
import { Icon } from 'antd';
import useLogin from '@/hooks/useLogin';
import useAction from '@/hooks/useAction';
import { noop } from '@/utils';
import Post from '@/components/Icons/Post';
import styles from './Input.less';
import { State } from '@/store/reducer';

export default function Input() {
  const isLogin = useLogin();
  const actions = useAction();
  const [content, setContent] = useState('');
  const linkman = useSelector((state: State) => state.linkmans[state.focus]);
  const sendHandler = (event: KeyboardEvent | MouseEvent) => {
    if (!content) return;
    const { charCode } = event as KeyboardEvent;
    if (charCode && charCode !== 13) return;
    console.log(content);
    console.log(linkman);
  };

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
      <input
        placeholder="随便聊点啥吧~"
        className={classNames(styles.innerInput, 'inner-input')}
        defaultValue={content}
        onKeyPress={sendHandler}
        onInput={(event) => setContent(event.currentTarget.value)}
        type="text"
      />
      <Icon
        className={classNames(styles.post, 'btn-pointer')}
        component={Post}
        onClick={sendHandler}
      />
    </div>
  );

  return (
    <div className={classNames(styles.input, 'flex-center')}>
      {isLogin ? listedJSX : unlistedJSX}
    </div>
  );
}
