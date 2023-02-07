import { put, takeEvery } from "redux-saga/effects";
import { call } from "typed-redux-saga";

import { createAPI } from "../api";
import { Hotel } from "../models/hotel";
import { store } from "../redux";
import { fetchHotels, setHotels } from "../redux/app-data/app-data";
import { selectURLRequest } from "../redux/app-data/selectors";

const api = createAPI();

const fetchHotelsData = () => api.get<Hotel[]>(selectURLRequest(store.getState()));

function* fetchHotelsWorker() {
    try {
        const result = yield* call(fetchHotelsData);
        console.log(result);
        if (result.status === 200) {
            yield put(setHotels(result.data));
        }
    } catch {
        console.log(selectURLRequest(store.getState()));
    }
}

export function* hotelsWatcher() {
    yield takeEvery(fetchHotels.type, fetchHotelsWorker);
}