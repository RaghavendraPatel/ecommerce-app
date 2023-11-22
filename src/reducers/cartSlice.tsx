import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {toast} from 'react-toastify';

// Define a type for the slice state
type Item = {
    id: number;
    name: string;
    price: number;
    image: string;
    quantity: number;
};

// Create interface for the cart state
interface CartState {
    items: Item[];
    totalQuantity: number;
    totalPrice: number;
}

// Define the initial state using the interface 
const initialState: CartState = {
    items: [],
    totalQuantity: 0,
    totalPrice: 0,
};

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    // Define reducers and generate associated actions
    reducers: {
        //fetch cart
        fetchCart(state:CartState, action: PayloadAction<Item[]>) {
            const items = action.payload;
            state.items = items;
            state.totalQuantity = items.reduce((total, item) => total + item.quantity, 0);
            state.totalPrice = items.reduce((total, item) => total + item.price * item.quantity, 0);
        },
        //add item to cart
        addItem(state:CartState, action: PayloadAction<Item>) {
            const { id, name, price, quantity, image} = action.payload;
            const existingItem = state.items.find((item) => item.id === id);
            if (!existingItem) {
                state.items.push({
                    id,
                    name,
                    price,
                    quantity,
                    image,
                });
            } else {
                // if item already exists in cart, increase quantity
                existingItem.quantity += quantity;
            }
            state.totalQuantity += quantity;
            state.totalPrice += price * quantity;
            toast.success('Item added to cart');
        },
        //remove one item from cart
        removeOneItem(state:CartState, action: PayloadAction<number>) {
            const id = action.payload;
            const existingItem = state.items.find((item) => item.id === id);
            if (existingItem) {
                //if item quantity is 1, remove item from cart
                if (existingItem.quantity === 1) {
                    state.items = state.items.filter((item) => item.id !== id);
                    toast.info('Item removed from cart');
                } else {
                    existingItem.quantity--;
                }
            }
            state.totalQuantity--;
            state.totalPrice -= existingItem!.price;
        },
        //remove item from cart
        removeItem(state:CartState, action: PayloadAction<number>) {
            const id = action.payload;
            const existingItem = state.items.find((item) => item.id === id);
            if (existingItem) {
                state.items = state.items.filter((item) => item.id !== id);
                state.totalQuantity -= existingItem.quantity;
                state.totalPrice -= existingItem.price * existingItem.quantity;
                toast.info('Item removed from cart');
            }
        },
        //clear cart
        clearCart(state:CartState) {
            state.items = [];
            state.totalQuantity = 0;
            state.totalPrice = 0;
        },
    },
});

// Export actions and reducer 
export const { addItem, removeItem, removeOneItem, clearCart } = cartSlice.actions;
const cartReducer = cartSlice.reducer;
export default cartReducer;
