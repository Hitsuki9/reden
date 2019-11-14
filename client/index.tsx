import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import './index.less';
import '@/assets/styles/common.less';
import 'normalize.css';

import App from './App';
import store from './store';
import { getLocalData, setCssVariable } from './utils';

const { primaryColor, primaryTextColor } = getLocalData();
setCssVariable(primaryColor, primaryTextColor);

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
  document.getElementById('app')
);
