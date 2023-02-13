import { RootState } from '..';
import { ReducerNames } from '../../constants/reducer-names';
import { FavoriteHotel } from '../../models/hotel';

export const selectCity = (state: RootState) => state[ReducerNames.App].city;

export const selectCheckIn = (state: RootState) => state[ReducerNames.App].checkIn;

export const selectDuration = (state: RootState) => state[ReducerNames.App].duration;

export const selectHotels = (state: RootState) => state[ReducerNames.App].hotels;

export const selectSortType = (state: RootState) => state[ReducerNames.App].sortType;

export const selectSortOrder = (state: RootState) => state[ReducerNames.App].sortOrder;

export const selectFavoriteHotels = (state: RootState) => state[ReducerNames.App].favoriteHotels;

export const selectIsFavoriteHotel = (hotel: FavoriteHotel) => (state: RootState) => state[ReducerNames.App]
  .favoriteHotels.some((el) => el.checkIn === hotel.checkIn
  && el.duration === hotel.duration
      && el.hotelId === hotel.hotelId);

export const selectIsLoading = (state: RootState) => state[ReducerNames.App].isLoading;

export const selectHotelsFetchFailed = (state: RootState) => state[ReducerNames.App].hotelsFetchFailed;
