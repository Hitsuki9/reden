export * from './enhancer';
export * from './guards';

const publicPath = '//fiora.oss-cn-hangzhou.aliyuncs.com/avatars/';

export function getRandomAvatar() {
  return `${publicPath}${Math.floor(Math.random() * 10 + 1)}.jpg`;
}

export function getDefaultAvatar() {
  return `${publicPath}default.png`;
}
