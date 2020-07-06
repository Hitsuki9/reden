import React, { ChangeEvent, useRef } from 'react';
import classNames from 'classnames';
import CommonClass from '@style/constant';
import styles from './Cropper.less';

const canvasDefaultSize = 300;

const getFilesInfo = (files: File[]): Promise<HTMLImageElement>[] =>
  files.map(
    (file: File) =>
      new Promise((resolve) => {
        const reader = new FileReader();
        reader.onload = (event) => {
          const image = new Image();
          image.onload = () => {
            resolve(image);
          };
          image.src = (event.target as FileReader).result as string;
        };
        reader.readAsDataURL(file);
      })
  );

// 图片裁剪
export default function Cropper() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const drawImage = (image: CanvasImageSource) => {
    let { width, height } = image as { width: number; height: number };
    const canvas = canvasRef.current as HTMLCanvasElement;
    const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
    // 清空画布
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    if (canvasDefaultSize < height || canvasDefaultSize < width) {
      const proportion = width / height; // 原图宽高比
      const scale = canvasDefaultSize / (proportion > 1 ? width : height); // 缩放比
      width *= scale;
      height *= scale;
    }
    canvas.width = width;
    canvas.height = height;
    ctx.drawImage(image, 0, 0, width, height);
  };

  const changeHandler = async (event: ChangeEvent) => {
    const target = event.target as HTMLInputElement;
    const files = Array.from(target.files as FileList);
    target.value = '';
    const res = await Promise.all(getFilesInfo(files));
    drawImage(res[res.length - 1]);
  };

  return (
    <div>
      <input multiple onChange={changeHandler} type="file" accept="image/*" />
      <div
        className={classNames(styles.container, CommonClass.FlexCenter)}
        style={{
          width: `${canvasDefaultSize}px`,
          height: `${canvasDefaultSize}px`
        }}
      >
        <canvas
          className={CommonClass.Pointer}
          ref={canvasRef}
          width={0}
          height={0}
        />
      </div>
    </div>
  );
}
