import { createSlice } from "@reduxjs/toolkit";

const ReduxLoginSlice = createSlice({
    name: 'login',
    initialState: {
        email: '',
        password: ''
    },
    reducers: {
        EmailSetup(state, actions) {
            state.email = actions.payload.email;
            state.password = actions.payload.password;
        },

        Logout(state) {
            state.email = "";
            state.password = "";
        }
    }
});

export const {EmailSetup, Logout} = ReduxLoginSlice.actions;
export default ReduxLoginSlice;