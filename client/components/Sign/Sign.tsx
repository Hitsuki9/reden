import React, { FormEvent } from 'react';
import {
  Form,
  Input,
  Icon,
  Button
} from 'antd';
import { FormComponentProps } from 'antd/lib/form/Form';
import { noop } from '@/utils';
import styles from './Sign.less';

interface SignProps extends FormComponentProps {
  /** 按钮名 */
  btnName?: string;
  /** 表单提交回调 */
  handleSubmit?: (username: string, password: string) => void;
}

function Sign (props: SignProps) {
  const {
    btnName = '提交',
    handleSubmit = noop,
    form: { getFieldDecorator, validateFields }
  } = props;

  const submitHandler = (event: FormEvent) => {
    event.preventDefault();
    validateFields((err, values) => {
      if (!err) {
        handleSubmit(values.username, values.password);
      }
    });
  };

  return (
    <Form onSubmit={submitHandler}>
      <Form.Item>
        {
          getFieldDecorator(
            'username',
            {
              rules: [
                { required: true, message: '请填写用户名' }
              ]
            }
          )(
            <Input
              prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder="用户名"
              allowClear
              autoComplete="off"
              onPressEnter={submitHandler}
            />
          )
        }
      </Form.Item>

      <Form.Item>
        {
          getFieldDecorator(
            'password',
            {
              rules: [
                { required: true, message: '请填写密码' }
              ]
            }
          )(
            <Input
              prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
              type="password"
              placeholder="密码"
              allowClear
              autoComplete="off"
              onPressEnter={submitHandler}
            />
          )
        }
      </Form.Item>

      <Form.Item>
        <Button
          className={styles.dialogBtn}
          type="primary"
          htmlType="submit"
        >
          {btnName}
        </Button>
      </Form.Item>
    </Form>
  );
}

export default Form.create<SignProps>()(Sign);
