import { UserData } from "../../models/user-data";
import { createSlice } from '@reduxjs/toolkit';
import { ReducerNames } from "../../constants/reducer-names";

const initialState: UserData = {
    isAuth: false,
} 

const userData = createSlice({
    name: ReducerNames.User,
    initialState,
    reducers: {
        logIn: (state) => {
            state.isAuth = true;
        },
        logOut: (state) => {
            state.isAuth = false;
        }
    },
});

export const { logIn, logOut } = userData.actions;
export const userReducer = userData.reducer;
