import React, {
  useState,
  useEffect,
  useReducer,
  ChangeEvent,
  KeyboardEvent
} from 'react';
import { Popover, Tabs, Avatar, Spin } from 'antd';
import classNames from 'classnames';
import { debounce, bubble, noop } from '@/utils';
import { search, SearchResult, User, Group } from '@/services';
import styles from './Search.less';

const { TabPane } = Tabs;
const noDataText = '暂无搜索结果';
let loading = false;

// 防抖的 fetch
// 只能放在函数式组件外部，否则每次更新组件都将生成一个新的函数，起不到防抖作用
const debouncedFetch = debounce(
  async (value: string, cb: (res: SearchResult) => void) => {
    const res = await search(value.trim());
    if (res) cb(res);
  },
  500
);

/**
 * 搜索
 */
export default function Search() {
  const [, forceUpdate] = useReducer((x) => x + 1, 0); // 代替 forceUpdate
  const [keyword, setKeyword] = useState('');
  // 搜索结果数据
  const [result, setResult] = useState({
    users: [],
    groups: []
  } as SearchResult);
  const [popoverVisible, setPopoverVisible] = useState(false);
  // body 点击事件
  const bodyClickHandler = (event: MouseEvent) => {
    const { target, currentTarget } = event;
    if ((target as HTMLElement).classList.contains(styles.innerInput)) {
      return;
    }
    if (
      !bubble(currentTarget as HTMLElement, target as HTMLElement, (inner) =>
        inner.classList.contains(styles.resultWrap)
      )
    ) {
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
    loading = false;
    setResult(res);
  };

  const changeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    loading = true;
    setKeyword(event.target.value);
    debouncedFetch(event.target.value, setPopoverContent);
  };

  const keyDownHandler = async (event: KeyboardEvent) => {
    if (event.keyCode === 13) {
      // 回车
      loading = true;
      forceUpdate();
      debouncedFetch(keyword, setPopoverContent);
    } else if (event.keyCode === 9) {
      // Tab
      setPopoverVisible(false);
    }
  };

  const renderItem = (item: User | Group, content: JSX.Element) => (
    <li key={item.id}>
      <div
        className={classNames(
          styles.resultItem,
          'flex-v-center',
          'btn-pointer'
        )}
        onKeyUp={noop}
        role="button"
        onClick={() => console.log(item)}
      >
        <Avatar size={40} src={item.avatar} />
        {content}
      </div>
    </li>
  );

  const renderUserItem = (user: User) =>
    renderItem(
      user,
      <div>
        <p>{user.username}</p>
      </div>
    );
  const renderGroupItem = (group: Group) =>
    renderItem(
      group,
      <div>
        <p>{group.name}</p>
        <p>{`${group.members} 人`}</p>
      </div>
    );

  const content = (
    <Spin spinning={loading}>
      <Tabs tabBarStyle={{ textAlign: 'center' }} size="small">
        <TabPane tab="用户" key="users">
          <ul>
            {result.users.length
              ? result.users.map((user) => renderUserItem(user))
              : noDataText}
          </ul>
        </TabPane>
        <TabPane tab="群组" key="groups">
          <ul>
            {result.groups.length
              ? result.groups.map((group) => renderGroupItem(group))
              : noDataText}
          </ul>
        </TabPane>
      </Tabs>
    </Spin>
  );

  return (
    <div className={classNames(styles.search, 'flex-v-center')}>
      <Popover
        overlayClassName={styles.resultWrap}
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
            onKeyDown={keyDownHandler}
            onFocus={() => setPopoverVisible(true)}
            type="text"
          />
        </div>
      </Popover>
      <span>＋</span>
    </div>
  );
}
