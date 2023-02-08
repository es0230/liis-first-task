import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from '@redux-saga/core';
import logger from 'redux-logger';

import { rootReducer } from './root-reducer';
import { rootWatcher } from '../sagas';

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    thunk: false,
    serializableCheck: false,
  }).concat(...[logger, sagaMiddleware]),
});

sagaMiddleware.run(rootWatcher);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
