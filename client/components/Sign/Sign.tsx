import React, { useState } from 'react';
import {
  Form,
  Input,
  Icon,
  Button
} from 'antd';
import { noop } from '@/utils';
import styles from './Sign.less';

interface SignProps {
  /** 按钮名 */
  btnName?: string;
  /** 表单提交回调 */
  handleSubmit?: (username: string, password: string) => void;
}

export default function Sign (props: SignProps) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { btnName = '提交', handleSubmit = noop } = props;

  return (
    <Form onSubmit={noop}>
      <Form.Item>
        <Input
          value={username}
          prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
          placeholder="用户名"
          allowClear
          onChange={(event) => setUsername(event.target.value)}
          onPressEnter={() => handleSubmit(username, password)}
        />
      </Form.Item>

      <Form.Item>
        <Input
          value={password}
          prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
          type="password"
          placeholder="密码"
          allowClear
          onChange={(event) => setPassword(event.target.value)}
          onPressEnter={() => handleSubmit(username, password)}
        />
      </Form.Item>

      <Form.Item>
        <Button
          className={styles.dialogBtn}
          type="primary"
          onClick={() => handleSubmit(username, password)}
        >
          {btnName}
        </Button>
      </Form.Item>
    </Form>
  );
}
