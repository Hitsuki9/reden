import React, {
  useState,
  useEffect,
  useContext,
  ChangeEvent,
  KeyboardEvent
} from 'react';
import { Popover, Tabs, Avatar, Spin } from 'antd';
import classNames from 'classnames';
import Loading from '@/components/Icons/Loading';
import { debounce, bubble, noop, ShowUserOrGroupInfoContext } from '@/utils';
import { search, Item, ItemType, SearchResult, User, Group } from '@/services';
import styles from './Search.less';

const { TabPane } = Tabs;
const noDataText = '暂无搜索结果';

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
  const context = useContext(ShowUserOrGroupInfoContext);
  const [state, setState] = useState({
    keyword: '',
    result: { users: [], groups: [] } as SearchResult,
    loading: false
  });
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
    setState((nextState) => ({
      ...nextState,
      loading: false,
      result: res
    }));
  };

  // input change 事件
  const changeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setState({
      ...state,
      loading: true,
      keyword: event.target.value
    });
    debouncedFetch(event.target.value, setPopoverContent);
  };

  // input keyDown 事件
  const keyDownHandler = (event: KeyboardEvent) => {
    if (event.keyCode === 13) {
      // 回车
      setState({
        ...state,
        loading: true
      });
      debouncedFetch(
        (event.target as HTMLInputElement).value,
        setPopoverContent
      );
    } else if (event.keyCode === 9) {
      // Tab
      setPopoverVisible(false);
    }
  };

  // 渲染搜索结果列表项
  const renderItem = (item: Item, type: ItemType, content: JSX.Element) => (
    <li key={item._id}>
      <div
        className={classNames(
          styles.resultItem,
          'flex-v-center',
          'btn-pointer'
        )}
        onKeyUp={noop}
        role="button"
        onClick={() => {
          setPopoverVisible(false);
          context.showInfo(item, type);
        }}
      >
        <Avatar size={40} src={item.avatar} />
        {content}
      </div>
    </li>
  );

  const renderUserItem = (user: User) =>
    renderItem(
      user,
      'user',
      <div>
        <p>{user.username}</p>
      </div>
    );
  const renderGroupItem = (group: Group) =>
    renderItem(
      group,
      'group',
      <div>
        <p>{group.name}</p>
        <p>{`${group.members} 人`}</p>
      </div>
    );

  // 搜索结果 jsx
  const content = (
    <Spin indicator={Loading()} spinning={state.loading}>
      <Tabs tabBarStyle={{ textAlign: 'center' }} size="small">
        <TabPane tab="用户" key="users">
          <ul>
            {state.result.users.length
              ? state.result.users.map((user) => renderUserItem(user))
              : noDataText}
          </ul>
        </TabPane>
        <TabPane tab="群组" key="groups">
          <ul>
            {state.result.groups.length
              ? state.result.groups.map((group) => renderGroupItem(group))
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
            value={state.keyword}
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
