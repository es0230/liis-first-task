import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import dayjs from 'dayjs';

import { ReducerNames } from '../../constants/reducer-names';
import { SortOrders, SortTypes } from '../../constants/sort';
import { SortTypesToHotelKeys } from '../../constants/sort-types-to-hotel-keys';
import { AppData } from '../../models/app-data';
import { FavoriteHotel } from '../../models/hotel';

const initialState: AppData = {
  city: 'Москва',
  checkIn: dayjs().format('YYYY-MM-DD'),
  duration: 1,
  hotels: [],
  sortType: SortTypes.Rating,
  sortOrder: SortOrders.Asc,
  favoriteHotels: [],
  isLoading: false,
  hotelsFetchFailed: false,
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
    },
    addToFavoriteHotels: (state, action) => {
      state.favoriteHotels.push(action.payload);
    },
    deleteFromFavorites: (state, action: PayloadAction<FavoriteHotel>) => {
      const hotelId = state.favoriteHotels.findIndex(
        (el) => el.checkIn === action.payload.checkIn
          && el.hotelId === action.payload.hotelId
          && el.duration === action.payload.duration
      );

      state.favoriteHotels = [...state.favoriteHotels.slice(0, hotelId), ...state.favoriteHotels.slice(hotelId + 1)];
    },
    sortHotels: (state) => {
      if (state.sortOrder === SortOrders.Asc) {
        state.favoriteHotels = [...state.favoriteHotels].sort(
          (a, b) => a[SortTypesToHotelKeys[state.sortType]] - b[SortTypesToHotelKeys[state.sortType]]
        );
      } else {
        state.favoriteHotels = [...state.favoriteHotels].sort(
          (a, b) => b[SortTypesToHotelKeys[state.sortType]] - a[SortTypesToHotelKeys[state.sortType]]
        );
      }
    },
    setIsLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setHotelsFetchFailed: (state, action) => {
      state.hotelsFetchFailed = action.payload;
    },
  }
});

export const {
  setHotels,
  setCity,
  setCheckIn,
  setDuration,
  setSortOrder,
  setSortType,
  setFavoriteHotels,
  addToFavoriteHotels,
  deleteFromFavorites,
  sortHotels,
  setIsLoading,
  setHotelsFetchFailed
} = appData.actions;

export const appReducer = appData.reducer;
