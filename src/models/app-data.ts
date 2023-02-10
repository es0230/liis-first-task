import { SortOrders, SortTypes } from '../constants/sort';
import { Hotel } from './hotel';
import { SearchParameters } from './search-parameters';

export type AppData = SearchParameters & {
  hotels: Hotel[],
  sortType: SortTypes,
  sortOrder: SortOrders,
  favoriteHotels: Hotel[]
};
