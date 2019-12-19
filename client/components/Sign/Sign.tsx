import React, { FormEvent, useState } from 'react';
import { Form, Input, Icon, Button } from 'antd';
import { FormComponentProps } from 'antd/lib/form/Form';
import { noop } from '@/utils';
import styles from './Sign.less';

interface SignProps extends FormComponentProps {
  /** 按钮名 */
  btnName?: string;
  /** 表单提交回调 */
  onSubmit?: (username: string, password: string) => Promise<any>;
}

function Sign(props: SignProps) {
  const [loading, setLoading] = useState(false);
  const {
    btnName = '提交',
    onSubmit: handleSubmit = noop,
    form: { getFieldDecorator, validateFields }
  } = props;

  const submitHandler = (event: FormEvent) => {
    event.preventDefault();
    if (loading) {
      return;
    }
    validateFields(async (err, values) => {
      if (!err) {
        setLoading(true);
        await handleSubmit(values.username, values.password);
        setLoading(false);
      }
    });
  };

  return (
    <Form onSubmit={submitHandler}>
      <Form.Item>
        {getFieldDecorator('username', {
          rules: [{ required: true, message: '请填写用户名' }]
        })(
          <Input
            prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
            placeholder="用户名"
            allowClear
            autoComplete="off"
            maxLength={30}
            onPressEnter={submitHandler}
          />
        )}
      </Form.Item>

      <Form.Item>
        {getFieldDecorator('password', {
          rules: [{ required: true, message: '请填写密码' }]
        })(
          <Input
            prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
            type="password"
            placeholder="密码"
            allowClear
            maxLength={10}
            onPressEnter={submitHandler}
          />
        )}
      </Form.Item>

      <Form.Item>
        <Button
          className={styles.dialogBtn}
          type="primary"
          htmlType="submit"
          loading={loading}
        >
          {btnName}
        </Button>
      </Form.Item>
    </Form>
  );
}

export default Form.create<SignProps>()(Sign);
