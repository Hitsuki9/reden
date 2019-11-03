import React from 'react';

interface AvatarProps {
  /** 头像链接 */
  src: string;
  /** 头像大小 */
  size?: number;
  /** 额外类名 */
  className?: string;
}

export default function Avatar (props: AvatarProps) {
  const {
    src,
    size = 60,
    className = ''
  } = props;

  return (
    <img
      className={className}
      style={{
        width: size,
        height: size,
        borderRadius: size / 2,
        cursor: 'pointer'
      }}
      src={src}
      alt="头像"
    />
  );
}
