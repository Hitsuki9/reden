import React, { useMemo } from 'react';
import { Modal, Avatar, Button } from 'antd';
import { addFriend, ItemType, Item } from '@/services';
import useAction from '@/hooks/useAction';

interface InfoProps {
  /** 展示信息类型 */
  type: ItemType;
  /** 对话框是否可见 */
  visible: boolean;
  /** 负载数据 */
  payload: Item;
  /** 对话框关闭回调 */
  onClose: () => void;
}

export default function Info(props: InfoProps) {
  const { type, visible, payload, onClose } = props;
  const actions = useAction();
  const infoMap = useMemo(
    () => ({
      user: {
        btnText: '添加好友',
        clickHandler: async (user: Item) => {
          const linkman = await addFriend(user._id);
          onClose();
          if (linkman) {
            actions.addLinkman(linkman);
          }
        }
      },
      group: {
        btnText: '加入群组',
        clickHandler: () => {}
      }
    }),
    []
  );

  return (
    <Modal onCancel={onClose} closable={false} visible={visible} footer={null}>
      <div>
        <Avatar size={60} src={payload.avatar} />
        <Button
          type="primary"
          onClick={() => infoMap[type].clickHandler(payload)}
        >
          {infoMap[type].btnText}
        </Button>
      </div>
    </Modal>
  );
}
