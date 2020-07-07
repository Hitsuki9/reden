import { hot } from 'react-hot-loader/root';
import React, { useReducer } from 'react';
import classNames from 'classnames';
import CommonClass from '@style/constant';
import { UserOrGroupInfoContext } from './utils';
import { Action } from './store/action';
import Sidebar from './modules/Sidebar';
import Chat from './modules/Chat';
import Dialog from './modules/Dialog';
import Linkman from './modules/Linkman';
import Info from './modules/Info';
import { Item, ItemType } from './services';
import style from './App.less';

interface State {
  item: Item;
  visible: boolean;
  type: ItemType;
}

enum ActionTypes {
  SetVisible = 'SetVisible',
  SetItem = 'SetItem'
}

function reducer(
  state: State,
  action: Action<Record<string, any>, ActionTypes>
) {
  switch (action.type) {
    case ActionTypes.SetVisible:
      const { visible } = action.payload;
      return {
        ...state,
        visible
      };

    case ActionTypes.SetItem:
      const { item, type } = action.payload;
      return {
        item,
        type,
        visible: true
      };

    default:
      return state;
  }
}

function App() {
  const [info, dispatch] = useReducer(reducer, {
    item: {} as Item,
    visible: false,
    type: 'user'
  });

  return (
    <div className={classNames(style.app, CommonClass.FlexCenter)}>
      <div className={style.blur} />
      <div className={style.container}>
        <UserOrGroupInfoContext.Provider value={dispatch}>
          <Sidebar />
          <Linkman />
          <Chat />
        </UserOrGroupInfoContext.Provider>
      </div>
      <Dialog />
      <Info
        type={info.type}
        visible={info.visible}
        payload={info.item}
        onClose={() =>
          dispatch({
            type: ActionTypes.SetVisible,
            payload: { visible: false }
          })
        }
      />
    </div>
  );
}

export default hot(App);
