import { ReducerNames } from '../constants/reducer-names';
import { appReducer } from './app-data/app-data';
import { userReducer } from './user-data/user-data';

export const rootReducer = {
    [ReducerNames.User]: userReducer,
    [ReducerNames.App]: appReducer,
};
