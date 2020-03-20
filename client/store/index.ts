import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import reducer from './reducer';
import saga from './saga';

const sagaMiddleware = createSagaMiddleware();
const store = createStore(
  reducer,
  // @ts-ignore
  window.__REDUX_DEVTOOLS_EXTENSION__
    ? compose(
        applyMiddleware(sagaMiddleware),
        // @ts-ignore
        window.__REDUX_DEVTOOLS_EXTENSION__()
      )
    : applyMiddleware(sagaMiddleware)
);

store[Symbol.observable]().subscribe({
  next(state) {
    console.log('当前状态：', state);
  }
});

sagaMiddleware.run(saga);

export default store;
