import { combineReducers } from '@reduxjs/toolkit';
import cartReducer from './cartSlice';
import productReducer from './productSlice';
import userReducer from './userSlice';
import countReducer from './countSlice';
import checkoutReducer from './checkoutSlice';
const rootReducer = combineReducers({
    cart: cartReducer,
    products: productReducer,
    user: userReducer,
    count: countReducer,
    checkout: checkoutReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
