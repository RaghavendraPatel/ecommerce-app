import { combineReducers } from '@reduxjs/toolkit';
import cartReducer from './cartSlice';
import productReducer from './productSlice';
import checkoutReducer from './checkoutSlice';

// Combine all reducers into a single reducer function
const rootReducer = combineReducers({
    cart: cartReducer,
    products: productReducer,
    checkout: checkoutReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
