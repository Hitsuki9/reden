import React, { useState } from 'react';
import { Popover } from 'antd';
import classNames from 'classnames';
import styles from './Search.less';

export default function Search() {
  const [keyword, setKeyword] = useState('');

  return (
    <div className={classNames(styles.search, 'flex-v-center')}>
      <div className={styles.inputWrap}>
        <Popover placement="bottomLeft" content="content" trigger="focus">
          <input
            placeholder="搜索用户/群组"
            className={classNames(styles.innerInput, 'inner-input')}
            value={keyword}
            onChange={(event) => setKeyword(event.target.value)}
            type="text"
          />
        </Popover>
      </div>
      <span>+</span>
    </div>
  );
}
