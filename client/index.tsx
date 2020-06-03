import * as Sentry from '@sentry/browser';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import store from './store';
import Routes from './Routes';
import { getLocalData, setCssVariable } from './utils';
import './index.less';
import './assets/styles/common.less';
import './assets/styles/theme.less';
import 'normalize.css';

!__DEV__ && Sentry.init({ dsn: __DSN__ });

// 设置 CSS 变量
const { primaryColor, primaryTextColor } = getLocalData();
setCssVariable(primaryColor, primaryTextColor);

// 请求 Notification 授权
if (
  window.Notification &&
  (window.Notification.permission === 'default' ||
    window.Notification.permission === 'denied')
) {
  window.Notification.requestPermission();
}

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <Routes />
    </Router>
  </Provider>,
  document.getElementById('app')
);
