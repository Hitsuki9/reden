import { hot } from 'react-hot-loader/root';
import React from 'react';
import classNames from 'classnames';
import styles from './App.less';
import { ShowUserOrGroupInfoContext } from './utils';
import Sidebar from './modules/Sidebar';
import Chat from './modules/Chat';
import Dialog from './modules/Dialog';
import Linkman from './modules/Linkman';

function App() {
  const contextValue = null;
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
    </div>
  );
}

export default hot(App);
