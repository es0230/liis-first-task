import { createSlice } from "@reduxjs/toolkit";
import dayjs from "dayjs";
import { ReducerNames } from "../../constants/reducer-names";
import { AppData } from "../../models/app-data";

const initialState: AppData = {
    city: 'Москва',
    checkIn: dayjs().format('DD.MM.YYYY'),
    duration: 1,
};

const appData = createSlice({
    name: ReducerNames.App,
    initialState,
    reducers: {
        setCity: (state, action) => {
            state.city = action.payload;
        },
        setCheckIn: (state, action) => {
            state.checkIn = action.payload;
        },
        setDuration: (state, action) => {
            state.duration = action.payload;
        }
    }
});

export const {setCity, setCheckIn, setDuration} = appData.actions;

export const appReducer = appData.reducer;