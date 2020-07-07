import React, {
  useState,
  useEffect,
  useContext,
  ChangeEvent,
  KeyboardEvent
} from 'react';
import { Popover, Tabs, Avatar, Spin } from 'antd';
import classNames from 'classnames';
import useDebounce from '@/hooks/useDebounce';
import useCache from '@/hooks/useCache';
import Input from '@/components/Input';
import Loading from '@/components/Icons/Loading';
import { bubble, noop, UserOrGroupInfoContext } from '@/utils';
import { search, Item, ItemType, SearchResult, User, Group } from '@/services';
import CommonClass from '@style/constant';
import style from './Search.less';

const { TabPane } = Tabs;
const noDataText = '暂无搜索结果';

/**
 * 搜索
 */
export default function Search() {
  const dispatch = useContext(UserOrGroupInfoContext);
  const [state, setState] = useState({
    keyword: '',
    result: { users: [], groups: [] } as SearchResult,
    loading: false
  });
  const [popoverVisible, setPopoverVisible] = useState(false);
  const debouncedFetch = useDebounce(async (value: string) => {
    const res = await search(value.trim());
    if (res) {
      setState((prevState) => ({
        ...prevState,
        loading: false,
        result: res
      }));
    }
  }, 300);
  // input change 事件
  const [changeHandler] = useCache((event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setState((prevState) => ({
      ...prevState,
      loading: true,
      keyword: value
    }));
    debouncedFetch(value);
  });
  // input keyDown 事件
  const [keyDownHandler] = useCache((event: KeyboardEvent) => {
    const { keyCode, target } = event;
    if (keyCode === 13) {
      // 回车
      setState((prevState) => ({
        ...prevState,
        loading: true
      }));
      debouncedFetch((target as HTMLInputElement).value);
    } else if (keyCode === 9) {
      // Tab
      setPopoverVisible(false);
    }
  });
  useEffect(() => {
    const bodyClickHandler = (event: MouseEvent) => {
      const { target, currentTarget } = event;
      if ((target as HTMLElement).classList.contains(style.innerInput)) {
        return;
      }
      if (
        !bubble(currentTarget as HTMLElement, target as HTMLElement, (inner) =>
          inner.classList.contains(style.resultWrap)
        )
      ) {
        return;
      }
      setPopoverVisible(false);
    };
    document.body.addEventListener('click', bodyClickHandler);
    return () => {
      document.body.removeEventListener('click', bodyClickHandler);
    };
  }, []);

  // 渲染搜索结果列表项
  const renderItem = (item: Item, type: ItemType, content: JSX.Element) => (
    <li key={item._id}>
      <div
        className={classNames(
          style.resultItem,
          CommonClass.FlexVCenter,
          CommonClass.Pointer
        )}
        onKeyUp={noop}
        role="button"
        onClick={() => {
          setPopoverVisible(false);
          dispatch({
            type: 'SetItem',
            payload: {
              type,
              item
            }
          });
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
    <div className={classNames(style.search, CommonClass.FlexVCenter)}>
      <Popover
        overlayClassName={style.resultWrap}
        visible={popoverVisible}
        overlayStyle={{ width: '220px' }}
        placement="bottomLeft"
        content={content}
      >
        <Input
          placeholder="搜索用户/群组"
          content={state.keyword}
          onChange={changeHandler}
          onKeyDown={keyDownHandler}
          onFocus={() => setPopoverVisible(true)}
        />
      </Popover>
      {/* <div className={style.inputWrap}>
          <input
            placeholder="搜索用户/群组"
            className={classNames(style.innerInput, CommonClass.InnerInput)}
            value={state.keyword}
            onChange={changeHandler}
            onKeyDown={keyDownHandler}
            onFocus={() => setPopoverVisible(true)}
            type="text"
          />
        </div> */}
      <span>＋</span>
    </div>
  );
}
