import React, { useMemo, FC } from 'react';
import classNames from 'classnames';
import { Modal, Avatar, Button } from 'antd';
import { addFriend, ItemType, Item, joinGroup } from '@/services';
import useAction from '@/hooks/useAction';
import CommonClass from '@style/constant';

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

const Info: FC<InfoProps> = ({ type, visible, payload, onClose }) => {
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
        clickHandler: async (group: Item) => {
          const linkman = await joinGroup(group._id);
          onClose();
          if (linkman) {
            console.log(linkman);
          }
        }
      }
    }),
    []
  );

  return (
    <Modal onCancel={onClose} closable={false} visible={visible} footer={null}>
      <div className={classNames(CommonClass.FlexVCenter)}>
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
};

export default Info;
