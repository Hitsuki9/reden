import React from 'react';
import classNames from 'classnames';
import styles from './Search.less';

export default function Search() {
  return (
    <div className={classNames(styles.search, 'flex-v-center')}>
      <div className={styles.inputWrap}>
        <input
          placeholder="搜索用户/群组"
          className={classNames(styles.innerInput, 'inner-input')}
          type="text"
        />
      </div>
      <span>+</span>
    </div>
  );
}
