import React, { useState, ChangeEvent } from 'react';
import { Popover, Empty } from 'antd';
import classNames from 'classnames';
import { debounce } from '@/utils';
import { search, SearchResult } from '@/services';
import styles from './Search.less';

/**
 * 防抖的 fetch
 */
const debouncedFetch = debounce(
  async (value: string, cb: (res: SearchResult) => void) => {
    if (value.trim().length) {
      const res = await search(value);
      if (res) cb(res);
    }
  },
  800
);

/**
 * 搜索
 */
export default function Search() {
  const [keyword, setKeyword] = useState('');
  const [content, setContent] = useState(<Empty />);

  const setPopoverContent = (res: SearchResult) => {
    setContent(
      <ul className={styles.resultWrap}>
        {res.users.length ? (
          <li>
            <p>用户</p>
            <ul>
              {res.users.map((user) => (
                <li className="btn-pointer" key={user.id}>
                  {user.username}
                </li>
              ))}
            </ul>
          </li>
        ) : null}
        {res.groups.length ? (
          <li>
            <p>群组</p>
            <ul>
              {res.groups.map((group) => (
                <li className="btn-pointer" key={group.id}>
                  {group.name}
                  {group.members}
                </li>
              ))}
            </ul>
          </li>
        ) : null}
      </ul>
    );
  };

  const changeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setKeyword(event.target.value);
    debouncedFetch(event.target.value, setPopoverContent);
  };

  return (
    <div className={classNames(styles.search, 'flex-v-center')}>
      <div className={styles.inputWrap}>
        <Popover placement="bottomLeft" content={content} trigger="focus">
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
