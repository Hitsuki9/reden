import React from 'react';

interface AvatarProps {
  src: string, // 头像链接
  size: number, // 头像大小
  className: string, // 额外类名
}

export default function Avatar (props: AvatarProps) {
  const {
    src,
    size = 60,
    className = ''
  } = props

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
