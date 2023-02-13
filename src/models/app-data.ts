import { SortOrders, SortTypes } from '../constants/sort';
import { FavoriteHotel, Hotel } from './hotel';
import { SearchParameters } from './search-parameters';

export type AppData = SearchParameters & {
  hotels: Hotel[],
  sortType: SortTypes,
  sortOrder: SortOrders,
  favoriteHotels: FavoriteHotel[],
  isLoading: boolean,
  hotelsFetchFailed: boolean
};
