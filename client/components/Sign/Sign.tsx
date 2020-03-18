import React, { useState, forwardRef, Ref } from 'react';
import { Form, Input, Button } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { noop } from '@/utils';
import styles from './Sign.less';

interface SignProps {
  /** 按钮文案 */
  btnText?: string;
  /** 表单提交回调 */
  onFinish?: (username: string, password: string) => Promise<any>;
  /** 额外的判断是否提交的参数 */
  submitFlag?: boolean;
  /** 表单实例 ref */
  forwardedRef: Ref<any>;
}

function Sign(props: SignProps) {
  const [loading, setLoading] = useState(false);
  const {
    btnText = '提交',
    onFinish: handleFinish = noop,
    submitFlag = true,
    forwardedRef
  } = props;

  const finishHandler = async (values: Record<string, any>) => {
    if (loading || !submitFlag) {
      return;
    }
    setLoading(true);
    await handleFinish(values.username, values.password);
    setLoading(false);
  };

  return (
    <Form ref={forwardedRef} onFinish={finishHandler}>
      <Form.Item
        name="username"
        rules={[{ required: true, message: '请填写用户名' }]}
      >
        <Input
          prefix={<UserOutlined style={{ color: 'rgba(0, 0, 0, 0.25)' }} />}
          placeholder="用户名"
          allowClear
          autoComplete="off"
          maxLength={30}
        />
      </Form.Item>

      <Form.Item
        name="password"
        rules={[{ required: true, message: '请填写密码' }]}
      >
        <Input
          prefix={<LockOutlined style={{ color: 'rgba(0, 0, 0, 0.25)' }} />}
          type="password"
          placeholder="密码"
          allowClear
          maxLength={10}
        />
      </Form.Item>

      <Form.Item>
        <Button
          className={styles.dialogBtn}
          type="primary"
          htmlType="submit"
          loading={loading}
        >
          {btnText}
        </Button>
      </Form.Item>
    </Form>
  );
}

export default forwardRef((props: Partial<SignProps>, ref: Ref<any>) => {
  const { btnText, onFinish, submitFlag } = props;
  return (
    <Sign
      btnText={btnText}
      onFinish={onFinish}
      submitFlag={submitFlag}
      forwardedRef={ref}
    />
  );
});
