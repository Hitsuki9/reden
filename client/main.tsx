import React, { StrictMode } from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import 'virtual:windi.css';

ReactDOM.render(
  <StrictMode>
    <App />
  </StrictMode>,
  document.querySelector('#root')
);
