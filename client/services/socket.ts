import io from 'socket.io-client';
import config from '@/../config/client';

const socket = io(config.server);

socket.on('connect', () => {
  console.log('socket connect success!');
});

export default socket;
