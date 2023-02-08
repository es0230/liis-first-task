import { createAction } from '@reduxjs/toolkit';

import { ReducerNames } from '../constants/reducer-names';
import { SearchParameters } from '../models/search-parameters';

export const fetchHotels = createAction<SearchParameters>(`${ReducerNames.App}/fetchHotels`);
