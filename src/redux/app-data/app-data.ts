import { createSlice } from '@reduxjs/toolkit';
import dayjs from 'dayjs';

import { ReducerNames } from '../../constants/reducer-names';
import { SortOrders, SortTypes } from '../../constants/sort';
import { AppData } from '../../models/app-data';

const initialState: AppData = {
  city: 'Москва',
  checkIn: dayjs().format('YYYY-MM-DD'),
  duration: 1,
  hotels: [],
  sortType: SortTypes.Rating,
  sortOrder: SortOrders.Asc,
  favoriteHotels: [],
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
    },
    setSortType: (state, action) => {
      state.sortType = action.payload;
    },
    setSortOrder: (state, action) => {
      state.sortOrder = action.payload;
    },
    setFavoriteHotels: (state, action) => {
      state.favoriteHotels = action.payload;
    }
  }
});

export const {
  setHotels, setCity, setCheckIn, setDuration, setSortOrder, setSortType, setFavoriteHotels
} = appData.actions;

export const appReducer = appData.reducer;
