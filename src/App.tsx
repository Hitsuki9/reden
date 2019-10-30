import React from 'react';
import Style from './App.less';
import { ShowUserOrGroupInfoContext } from './context';
import Sidebar from './pages/Sidebar';
import Chat from './pages/Chat';

function App() {
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

export default App;
