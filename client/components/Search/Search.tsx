import React, { useState, useEffect, ChangeEvent } from 'react';
import { Popover, Tabs } from 'antd';
import classNames from 'classnames';
import { debounce } from '@/utils';
import { search, SearchResult } from '@/services';
import styles from './Search.less';

const { TabPane } = Tabs;

// 防抖的 fetch
// 只能放在函数式组件外部，否则每次更新组件都将生成一个新的函数，起不到防抖作用
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
  // 搜索结果数据
  const [result, setResult] = useState({
    users: [],
    groups: []
  } as SearchResult);
  const [popoverVisible, setPopoverVisible] = useState(false);
  const bodyClickHandler = (event: MouseEvent) => {
    const { target } = event;
    if ((target as HTMLElement).classList.contains(styles.innerInput)) {
      return;
    }
    setPopoverVisible(false);
  };
  useEffect(() => {
    document.body.addEventListener('click', bodyClickHandler);
    return () => {
      document.body.removeEventListener('click', bodyClickHandler);
    };
  });

  const setPopoverContent = (res: SearchResult) => {
    setResult(res);
  };

  const changeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setKeyword(event.target.value);
    debouncedFetch(event.target.value, setPopoverContent);
  };

  const content = (
    <Tabs tabBarStyle={{ textAlign: 'center' }} size="small">
      <TabPane tab="用户" key="users">
        <ul>
          {result.users.map((user) => (
            <li key={user.id}>{user.username}</li>
          ))}
        </ul>
      </TabPane>
      <TabPane tab="群组" key="groups">
        <ul>
          {result.groups.map((group) => (
            <li key={group.id}>
              {group.name}
              {group.members}
            </li>
          ))}
        </ul>
      </TabPane>
    </Tabs>
  );

  return (
    <div className={classNames(styles.search, 'flex-v-center')}>
      <Popover
        visible={popoverVisible}
        overlayStyle={{ width: '220px' }}
        placement="bottomLeft"
        content={content}
      >
        <div className={styles.inputWrap}>
          <input
            placeholder="搜索用户/群组"
            className={classNames(styles.innerInput, 'inner-input')}
            value={keyword}
            onChange={changeHandler}
            onFocus={() => setPopoverVisible(true)}
            type="text"
          />
        </div>
      </Popover>
      <span>+</span>
    </div>
  );
}
