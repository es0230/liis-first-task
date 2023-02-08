import { RootState } from '..';
import { ReducerNames } from '../../constants/reducer-names';

export const selectIsAuth = (state: RootState) => state[ReducerNames.User].isAuth;
