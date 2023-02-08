import AsyncStorage from '@react-native-async-storage/async-storage';
import { put } from 'redux-saga/effects';
import { call } from 'typed-redux-saga';

import { logIn } from '../redux/user-data/user-data';

export function* authWorker() {
  const isAuth = yield* call(AsyncStorage.getItem, 'isAuth');

  if (isAuth) {
    yield put(logIn());
  }
}
