import { Hotel } from './hotel';
import { SearchParameters } from './search-parameters';

export type AppData = SearchParameters & {
  hotels: Hotel[],
};
