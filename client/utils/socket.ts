import io from 'socket.io-client';
import platform from 'platform';
import config from '@/../config/client';
import store from '@/store';
import { ActionTypes } from '@/store/action';
import { Message, Notice } from '@/store/reducer';
import { guest, loginByToken, getHistoryMessages } from '@/services';
import { getValue } from './storage';

const socket = io(config.server);
const { dispatch } = store;

async function loginFailback() {
  const defaultGroup = await guest(
    platform.os ? platform.os.family : undefined,
    platform.name,
    platform.description
  );
  if (defaultGroup) {
    dispatch({
      type: ActionTypes.SetGuest,
      payload: defaultGroup
    });
    const messages = await getHistoryMessages(defaultGroup.id, 0);
    dispatch({
      type: ActionTypes.UpdateHistoryMessages,
      payload: {
        linkmanId: defaultGroup.id,
        messages
      }
    });
  } else {
    dispatch({
      type: ActionTypes.SetGuest,
      payload: {}
    });
  }
}

socket.on('connect', async () => {
  dispatch({
    type: ActionTypes.Connect,
    payload: {}
  });
  const token = getValue('token', '');
  if (token) {
    const user = await loginByToken(
      token,
      platform.os ? platform.os.family : undefined,
      platform.name,
      platform.description
    );
    if (user) {
      dispatch({
        type: ActionTypes.SetUser,
        payload: user
      });
      const linkmanIds = user.linkmans.map((linkman) => ({
        type: linkman.type,
        id: linkman.id
      }));
      console.log(linkmanIds);
      return null;
    }
  }
  loginFailback();
  return null;
});

socket.on('disconnect', () => {
  dispatch({
    type: ActionTypes.Disconnect,
    payload: {}
  });
});

socket.on('message', (message: Message) => {
  console.log(message);
});

socket.on('notice', (notice: Notice) => {
  console.log(notice);
  // TODO
});

export default socket;
