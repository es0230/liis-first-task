import { RootState } from "..";
import { ReducerNames } from "../../constants/reducer-names";

export const selectCity = (state: RootState) => state[ReducerNames.App].city;
export const selectCheckIn = (state: RootState) => state[ReducerNames.App].checkIn;
export const selectDuration = (state: RootState) => state[ReducerNames.App].duration;
