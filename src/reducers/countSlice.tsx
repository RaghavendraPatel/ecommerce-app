import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CountState {
    value: number;
}

const initialState: CountState = {
    value: 0,
};


const countSlice = createSlice({
    name: 'count',
    initialState,
    reducers: {
        increment(state: CountState) {
            state.value++;
        },
        decrement(state: CountState) {
            state.value--;
        },
        incrementByAmount(state: CountState, action: PayloadAction<number>) {
            state.value += action.payload;
        },
    },
});

export const { increment, decrement, incrementByAmount } = countSlice.actions;
export default countSlice.reducer;