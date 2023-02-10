import { PayloadAction } from '@reduxjs/toolkit';
import dayjs from 'dayjs';
import { all, put } from 'redux-saga/effects';
import { call, takeLatest } from 'typed-redux-saga';

import { createAPI } from '../api';
import { Hotel } from '../models/hotel';
import { SearchParameters } from '../models/search-parameters';
import { fetchHotels } from '../redux/actions';
import { setHotels, setHotelsFetchFailed, setIsLoading } from '../redux/app-data/app-data';
import { authWorker } from './auth-saga';

const api = createAPI();

function* fetchHotelsWorker({ payload }: PayloadAction<SearchParameters>) {
  const { checkIn, duration, city } = payload;

  const checkOut = dayjs(checkIn).add(duration, 'day').format('YYYY-MM-DD');
  const requestURL = `/cache.json?location=${city}&currency=rub&checkIn=${checkIn}&checkOut=${checkOut}&limit=10`;

  yield put(setIsLoading(true));
  yield put(setHotelsFetchFailed(false));

  try {
    const result = yield* call(() => api.get<Hotel[]>(requestURL));
    yield put(setHotels(result.data));
    yield put(setIsLoading(false));
  } catch (err) {
    yield put(setIsLoading(false));
    yield put(setHotelsFetchFailed(true));
    console.log(err);
  }
}

export function* hotelsWatcher() {
  yield all([
    takeLatest(fetchHotels, fetchHotelsWorker),
    authWorker()
  ]);
}
