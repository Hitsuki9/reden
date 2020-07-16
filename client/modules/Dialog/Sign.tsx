import React, { useState, forwardRef, Ref, FC } from 'react';
import { Form, Input, Button } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { noop } from '@/utils';
import style from './Sign.less';

interface SignProps {
  /** 按钮文案 */
  btnText?: string;
  /** 表单提交回调 */
  onFinish?: (username: string, password: string) => Promise<any>;
  /** 额外的判断是否提交的参数 */
  submitFlag?: boolean;
  /** 表单名称 */
  name?: string;
  /** 表单实例 ref */
  forwardedRef: Ref<any>;
}

const Sign: FC<SignProps> = ({
  btnText = '提交',
  onFinish: finishHandler = noop,
  submitFlag = true,
  name = 'form',
  forwardedRef
}) => {
  const [loading, setLoading] = useState(false);

  const _finishHandler = async (values: Record<string, any>) => {
    if (loading || !submitFlag) {
      return;
    }
    setLoading(true);
    await finishHandler(values.username, values.password);
    setLoading(false);
  };

  return (
    <Form ref={forwardedRef} onFinish={_finishHandler} name={name}>
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
          className={style.dialogBtn}
          type="primary"
          htmlType="submit"
          loading={loading}
        >
          {btnText}
        </Button>
      </Form.Item>
    </Form>
  );
};

export default forwardRef(
  (
    { btnText, onFinish: finishHandler, submitFlag, name }: Partial<SignProps>,
    ref: Ref<any>
  ) => (
    <Sign
      btnText={btnText}
      onFinish={finishHandler}
      submitFlag={submitFlag}
      forwardedRef={ref}
      name={name}
    />
  )
);
