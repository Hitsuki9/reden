import { take } from 'redux-saga/effects';

export default function* saga () {
  while (true) {
    const action = yield take('*');
    console.log(action);
  }
}
