import { UserData } from "../../models/user-data";
import { createSlice } from '@reduxjs/toolkit';
import { ReducerNames } from "../../constants/reducer-names";

const initialState: UserData = {
    auth: false,
} 

 const userData = createSlice({
    name: ReducerNames.User,
    initialState,
    reducers: {
        logIn: (state) => {
            state.auth = true;
        },
        logOut: (state) => {
            state.auth = false;
        }
    },
});

export const { logIn, logOut } = userData.actions;
export const userReducer = userData.reducer;
