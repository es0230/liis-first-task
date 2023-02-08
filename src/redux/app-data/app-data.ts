import { createSlice } from '@reduxjs/toolkit';
import dayjs from 'dayjs';

import { ReducerNames } from '../../constants/reducer-names';
import { AppData } from '../../models/app-data';

const initialState: AppData = {
  city: 'Москва',
  checkIn: dayjs().format('YYYY-MM-DD'),
  duration: 1,
  hotels: []
};

const appData = createSlice({
  name: ReducerNames.App,
  initialState,
  reducers: {
    setCity: (state, action) => {
      state.city = action.payload;
    },
    setCheckIn: (state, action) => {
      state.checkIn = action.payload;
    },
    setDuration: (state, action) => {
      state.duration = action.payload;
    },
    setHotels: (state, action) => {
      state.hotels = action.payload;
    }
  }
});

export const {
  setHotels, setCity, setCheckIn, setDuration
} = appData.actions;

export const appReducer = appData.reducer;
