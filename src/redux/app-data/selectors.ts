import { RootState } from '..';
import { ReducerNames } from '../../constants/reducer-names';

export const selectCity = (state: RootState) => state[ReducerNames.App].city;

export const selectCheckIn = (state: RootState) => state[ReducerNames.App].checkIn;

export const selectDuration = (state: RootState) => state[ReducerNames.App].duration;

export const selectHotels = (state: RootState) => state[ReducerNames.App].hotels;

export const selectSortType = (state: RootState) => state[ReducerNames.App].sortType;

export const selectSortOrder = (state: RootState) => state[ReducerNames.App].sortOrder;

export const selectFavoriteHotels = (state: RootState) => state[ReducerNames.App].favoriteHotels;
