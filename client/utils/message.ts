import { message as _message } from 'antd';

_message.config({
  duration: 2,
  maxCount: 1
});

const message: typeof _message = _message;

export default message;
