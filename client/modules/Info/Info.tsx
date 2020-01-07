import React from 'react';
import { Modal, Avatar, Button } from 'antd';
import { User, Group } from '@/services';

interface InfoProps {
  /** 展示信息类型 */
  type: 'user' | 'group';
  /** 对话框是否可见 */
  visible: boolean;
  /** 负载数据 */
  payload: User | Group;
  /** 对话框关闭回调 */
  onClose: () => void;
}

export default function Info(props: InfoProps) {
  const { type, visible, payload, onClose } = props;
  const infoMap = {
    user: {
      btnText: '申请好友'
    },
    group: {
      btnText: '加入群组'
    }
  };

  return (
    <Modal onCancel={onClose} closable={false} visible={visible} footer={null}>
      <div>
        <Avatar size={60} src={payload.avatar} />
        <Button type="primary">{infoMap[type].btnText}</Button>
      </div>
    </Modal>
  );
}
