export * from './enhancer';
export * from './guards';

const publicPath = 'https://fiora.oss-cn-hangzhou.aliyuncs.com/avatars/';

export function getRandomAvatar () {
  return `${publicPath}1.jpg`;
}
