import { createSlice,PayloadAction } from '@reduxjs/toolkit';
import {toast} from 'react-toastify';
// Define a type for the slice state
export type Product = {
    id: number;
    name: string;
    description: string;
    price: number;
    images: string[];
}
// Create interface for the product state
interface ProductState {
    products: Product[];
    loading: boolean;
    error: string | null;
}
// Define the initial state using the interface
const initialState: ProductState = {
    products: [],
    loading: false,
    error: null,
};

const productSlice = createSlice({
    name: 'product',
    initialState,
    // Define reducers and generate associated actions
    reducers: {
        //fetch products
        fetchStart(state) {
            state.loading = true;
            state.error = null;
        },
        fetchSuccess(state, action:PayloadAction<Product[]>) {
            state.loading = false;
            state.products = action.payload;
        },
        fetchFail(state, action:PayloadAction<string>) {
            state.loading = false;
            state.error = action.payload;
        },
        //add product
        addProduct(state, action:PayloadAction<Product>) {
            state.products.push(action.payload);
            toast.success('Product added successfully');
        },
        //remove product
        removeProduct(state, action:PayloadAction<number>) {
            const id = action.payload;
            state.products = state.products.filter((product) => product.id !== id);
            toast.info('Product removed successfully');
        },
        //update product
        updateProduct(state, action:PayloadAction<Product>) {
            const newProduct = action.payload;
            const existingProduct = state.products.find((product) => product.id === newProduct.id);
            if (existingProduct) {
                existingProduct.name = newProduct.name;
                existingProduct.price = newProduct.price;
                existingProduct.description = newProduct.description;
                existingProduct.images = newProduct.images;
            }
            toast.success('Product updated successfully');
        },
    },
});

// export actions
export const { addProduct, removeProduct, updateProduct, fetchStart,fetchFail,fetchSuccess} = productSlice.actions;
const productReducer = productSlice.reducer;
export default productReducer;
