import { hot } from 'react-hot-loader/root';
import React from 'react';
import Style from './App.less';
import { ShowUserOrGroupInfoContext } from './context';
import Sidebar from './modules/Sidebar';
import Chat from './modules/Chat';

function App () {
  const contextValue = null;
  return (
    <div className={Style.app}>
      <div className={Style.container}>
        <ShowUserOrGroupInfoContext.Provider value={contextValue}>
          <Sidebar />
          <Chat />
        </ShowUserOrGroupInfoContext.Provider>
      </div>
    </div>
  );
}

export default hot(App);
