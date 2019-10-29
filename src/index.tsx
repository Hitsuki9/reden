import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import './index.less';
import 'normalize.css';

import App from './App';
import store from './store';

// 请求 Notification 授权
if (
  window.Notification
  && (window.Notification.permission === 'default' || window.Notification.permission === 'denied')
) {
  window.Notification.requestPermission();
}

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
