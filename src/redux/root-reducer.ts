import { ReducerNames } from '../constants/reducer-names';
import { userReducer } from './user-data/user-data';

export const rootReducer = {
    [ReducerNames.User]: userReducer
};
