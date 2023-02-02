import { UserData } from "../../models/user-data";
import { createSlice } from '@reduxjs/toolkit';

const initialState: UserData = {
    auth: false,
} 

 const userData = createSlice({
    name: 'USERDATA',
    initialState,
    reducers: {
        logIn: (state, action) => {
            state.auth = true;
        },
        logOut: (state, action) => {
            state.auth = false;
        }
    },
});

export const { logIn, logOut } = userData.actions;
export const userReducer = userData.reducer;
