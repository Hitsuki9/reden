import React, { useState, ChangeEvent } from 'react';
import { Popover } from 'antd';
import classNames from 'classnames';
import { debounce } from '@/utils';
import styles from './Search.less';

const debouncedChange = debounce((value) => {
  console.log(value);
}, 500);

export default function Search() {
  const [keyword, setKeyword] = useState('');

  const changeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setKeyword(event.target.value);
    debouncedChange(event.target.value);
  };

  return (
    <div className={classNames(styles.search, 'flex-v-center')}>
      <div className={styles.inputWrap}>
        <Popover placement="bottomLeft" content="content" trigger="focus">
          <input
            placeholder="搜索用户/群组"
            className={classNames(styles.innerInput, 'inner-input')}
            value={keyword}
            onChange={changeHandler}
            type="text"
          />
        </Popover>
      </div>
      <span>+</span>
    </div>
  );
}
