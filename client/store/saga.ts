import { take } from 'redux-saga/effects';

// const effectGenerator = <T> (
//   fetch: (...args: any []) => any,
//   type: ActionTypes
// ) => function* (action: Action<T>) {
//     const res = yield call(fetch, action.payload);
//     console.log(res);
//     yield put({ type, payload: res });
//   };

export default function* saga() {
  while (true) {
    const action = yield take('*');
    console.log(action);
  }
}
