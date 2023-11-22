import { createSlice,PayloadAction } from "@reduxjs/toolkit";

type User = {
    id: number;
    name: string;
    email: string;
};

interface UserState {
    user: User | null;
    loading: boolean;
    error: string | null;
}

const initialState: UserState = {
    user: null,
    loading: false,
    error: null,
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        loginStart(state:UserState) {
            state.loading = true;
            state.error = null;
        },
        loginSuccess(state:UserState,action:PayloadAction<User>) {
            state.loading = false;
            state.user = action.payload;
        },
        loginFail(state:UserState,action:PayloadAction<string>) {
            state.loading = false;
            state.error = action.payload;
        },
        logout(state:UserState) {
            state.user = null;
        },
    }
});

export const { loginStart, loginSuccess, loginFail, logout } = userSlice.actions;
const userReducer = userSlice.reducer;
export default userReducer;