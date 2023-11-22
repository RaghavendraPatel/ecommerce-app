import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {toast} from 'react-toastify';

type Item = {
    id: number;
    name: string;
    price: number;
    image: string;
    quantity: number;
};
enum checkoutType {
    'cart',
    'product',
}
interface CheckoutState {
    items: Item[];
    totalQuantity: number;
    totalPrice: number;
    type: checkoutType;
}

const initialState: CheckoutState = {
    items: [],
    totalQuantity: 0,
    totalPrice: 0,
    type: checkoutType.cart,
};


const checkoutSlice = createSlice({
    name: 'checkout',
    initialState,
    reducers: {
        initiateCheckoutSingleItem(state:CheckoutState, action: PayloadAction<Item>) {
            const { id, name, price, quantity, image} = action.payload;
            state.items = [{ id, name, price, quantity, image}];
            state.totalQuantity = quantity;
            state.totalPrice = price * quantity;
            state.type = checkoutType.product;
        },
        initiateCheckoutMultipleItems(state:CheckoutState, action: PayloadAction<Item[]>) {
            const items = action.payload;
            state.items = items;
            state.totalQuantity = items.reduce((total, item) => total + item.quantity, 0);
            state.totalPrice = items.reduce((total, item) => total + item.price * item.quantity, 0);
            state.type = checkoutType.cart;
        },
        completeCheckout(state:CheckoutState) {
            state.items = [];
            state.totalQuantity = 0;
            state.totalPrice = 0;
            toast.success('Checkout completed');
        },
        clearCheckout(state:CheckoutState) {
            state.items = [];
            state.totalQuantity = 0;
            state.totalPrice = 0;
        },
        
    },
});

export const {initiateCheckoutMultipleItems,initiateCheckoutSingleItem,completeCheckout,clearCheckout} = checkoutSlice.actions;
export default checkoutSlice.reducer;
