import { hot } from 'react-hot-loader/root';
import React, { useReducer } from 'react';
import classNames from 'classnames';
import { UserOrGroupInfoContext } from './utils';
import Sidebar from './modules/Sidebar';
import Chat from './modules/Chat';
import Dialog from './modules/Dialog';
import Linkman from './modules/Linkman';
import Info from './modules/Info';
import { Item, ItemType } from './services';
import styles from './App.less';

type State = {
  item: Item;
  visible: boolean;
  type: ItemType;
};

enum ActionTypes {
  SetVisible = 'SetVisible',
  SetItem = 'SetItem'
}

type Action<T = { [key: string]: any }> = {
  type: ActionTypes;
  payload: T;
};

function reducer(state: State, action: Action) {
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
    <div className={classNames(styles.app, 'flex-center')}>
      <div className={styles.blur} />
      <div className={styles.container}>
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
