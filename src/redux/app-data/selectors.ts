import dayjs from "dayjs";
import { RootState } from "..";
import { ReducerNames } from "../../constants/reducer-names";

export const selectCity = (state: RootState) => state[ReducerNames.App].city;

export const selectCheckIn = (state: RootState) => state[ReducerNames.App].checkIn;

export const selectDuration = (state: RootState) => state[ReducerNames.App].duration;

export const selectURLRequest = (state: RootState): string => {
	const { city, checkIn, duration } = state[ReducerNames.App];

	const checkOut = dayjs(checkIn).add(duration, 'day').format('YYYY-MM-DD');

	return `cache.json?location=${city}&currency=rub&checkIn=${checkIn}&checkOut=${checkOut}&limit=10`;
};
