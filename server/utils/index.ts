export * from './enhancer';
export * from './guards';

const publicPath = process.env.NODE_ENV !== 'production' ? '@/assets/images/Hitsuki9.jpg' : '';

export function getRandomAvatar () {
  return publicPath;
}
