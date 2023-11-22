import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {toast} from 'react-toastify';

// Define a type for the slice state
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

//create interface for checkout state
interface CheckoutState {
    items: Item[];
    totalQuantity: number;
    totalPrice: number;
    type: checkoutType;
}

// Define the initial state using the interface
const initialState: CheckoutState = {
    items: [],
    totalQuantity: 0,
    totalPrice: 0,
    type: checkoutType.cart,
};


const checkoutSlice = createSlice({
    name: 'checkout',
    initialState,
    // Define reducers and generate associated actions
    reducers: {
        // initiate checkout for single product
        initiateCheckoutSingleItem(state:CheckoutState, action: PayloadAction<Item>) {
            const { id, name, price, quantity, image} = action.payload;
            state.items = [{ id, name, price, quantity, image}];
            state.totalQuantity = quantity;
            state.totalPrice = price * quantity;
            state.type = checkoutType.product;
        },
        // initiate checkout for cart
        initiateCheckoutMultipleItems(state:CheckoutState, action: PayloadAction<Item[]>) {
            const items = action.payload;
            state.items = items;
            state.totalQuantity = items.reduce((total, item) => total + item.quantity, 0);
            state.totalPrice = items.reduce((total, item) => total + item.price * item.quantity, 0);
            state.type = checkoutType.cart;
        },
        // complete checkout
        completeCheckout(state:CheckoutState) {
            state.items = [];
            state.totalQuantity = 0;
            state.totalPrice = 0;
            toast.success('Product(s) purchased successfully');
        },
        // clear checkout
        clearCheckout(state:CheckoutState) {
            state.items = [];
            state.totalQuantity = 0;
            state.totalPrice = 0;
        },
        
    },
});

// Export actions
export const {initiateCheckoutMultipleItems,initiateCheckoutSingleItem,completeCheckout,clearCheckout} = checkoutSlice.actions;
export default checkoutSlice.reducer;
