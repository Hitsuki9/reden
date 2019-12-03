import io from 'socket.io-client';
import config from '@/../config/client';
import store from '@/store';
import { ActionTypes } from '@/store/action';

const socket = io(config.server);
const { dispatch } = store;

socket.on('connect', () => {
  console.log('socket connect success!');
  dispatch({
    type: ActionTypes.Connect,
    payload: {}
  });
});

export default socket;
