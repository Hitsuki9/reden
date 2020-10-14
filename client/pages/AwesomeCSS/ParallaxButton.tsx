import React, { useRef, useLayoutEffect, MouseEvent } from 'react';
import style from './ParallaxButton.less';

export default function ParallaxButton() {
  const pb = useRef<HTMLDivElement>(null);
  let width: number;
  let height: number;
  useLayoutEffect(() => {
    ({
      width,
      height
    } = (pb.current as HTMLDivElement).getBoundingClientRect());
  });

  const moveHandler = (event: MouseEvent) => {
    const dx = event.nativeEvent.offsetX - width / 2;
    const dy = event.nativeEvent.offsetY - height / 2;
    if (pb.current instanceof HTMLDivElement) {
      pb.current.style.setProperty('--rx', `${dy / -1}deg`);
      pb.current.style.setProperty('--ry', `${dx / 4}deg`);
    }
  };
  const leaveHandler = () => {
    if (pb.current instanceof HTMLDivElement) {
      pb.current.style.setProperty('--rx', '0');
      pb.current.style.setProperty('--ry', '0');
    }
  };
  // const upHandler = () => {};
  // const downHandler = () => {};

  return (
    <div
      ref={pb}
      className={style.parallaxButton}
      onMouseMove={moveHandler}
      onMouseLeave={leaveHandler}
      // onMouseUp={upHandler}
      // onMouseDown={downHandler}
    >
      <span>Parallax Button</span>
    </div>
  );
}
