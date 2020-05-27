import React, { ChangeEvent } from 'react';
import useCache from '@/hooks/useCache';
// import { Progress } from 'antd';
// import SparkMD5 from 'spark-md5';

const SIZE = 10 * 1024 * 1024;
const URL = 'http://localhost:9000';

interface FetchParams {
  url: string;
  method: string;
  headers?: Record<string, string>;
  data?: any;
}

function fetch({ url, method, headers = {}, data = null }: FetchParams) {
  return new Promise((resolve) => {
    const xhr = new XMLHttpRequest();
    xhr.open(method, url);
    Object.keys(headers).forEach((name) =>
      xhr.setRequestHeader(name, headers[name])
    );
    xhr.send(data);
    xhr.addEventListener('loaded', (e) => resolve(e));
  });
}

/**
 * 文件分片
 * @param file 文件
 * @param size 单片大小
 */
function createFileChunks(file: File, size = SIZE) {
  const fileChunks: Blob[] = [];
  let cur = 0;
  while (cur < file.size) {
    fileChunks.push(file.slice(cur, cur + size));
    cur += size;
  }
  return fileChunks;
}

/**
 * 文件上传
 */
export default function Uploader() {
  const [changeHandler] = useCache((event: ChangeEvent<HTMLInputElement>) => {
    const { target } = event;
    const [file] = Array.from(target.files as FileList);
    target.value = '';
    const chunks = createFileChunks(file);
    chunks
      .map((chunk, idx) => ({ chunk, hash: `${file.name}-${idx}` }))
      .forEach(async (item) => {
        const res = await fetch({
          url: `${URL}?chunk=${item.hash}`,
          method: 'get'
        });
        console.log(res);
      });
  });

  return (
    <div>
      <input onChange={changeHandler} type="file" />
    </div>
  );
}
