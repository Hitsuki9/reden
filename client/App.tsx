import { hot } from 'react-hot-loader/root';
import React, { useState, useMemo } from 'react';
import classNames from 'classnames';
import { ShowUserOrGroupInfoContext } from './utils';
import Sidebar from './modules/Sidebar';
import Chat from './modules/Chat';
import Dialog from './modules/Dialog';
import Linkman from './modules/Linkman';
import Info from './modules/Info';
import { Item, ItemType } from './services';
import styles from './App.less';

function App() {
  const [info, setInfo] = useState({
    item: {} as Item,
    visible: false,
    type: 'user' as ItemType
  });
  const contextValue = useMemo(
    () => ({
      showInfo(item: Item, type: ItemType) {
        setInfo({ item, type, visible: true });
      }
    }),
    []
  );

  return (
    <div className={classNames(styles.app, 'flex-center')}>
      <div className={styles.blur} />
      <div className={styles.container}>
        <ShowUserOrGroupInfoContext.Provider value={contextValue}>
          <Sidebar />
          <Linkman />
          <Chat />
        </ShowUserOrGroupInfoContext.Provider>
      </div>
      <Dialog />
      <Info
        type={info.type}
        visible={info.visible}
        payload={info.item}
        onClose={() => setInfo({ ...info, visible: false })}
      />
    </div>
  );
}

export default hot(App);
