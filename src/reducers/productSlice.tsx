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
    sortedProducts: Product[];
    loading: boolean;
    error: string | null;
}
// Define the initial state using the interface
const initialState: ProductState = {
    products: [],
    sortedProducts: [],
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
            state.sortedProducts = action.payload;
        },
        fetchFail(state, action:PayloadAction<string>) {
            state.loading = false;
            state.error = action.payload;
        },
        //add product
        addProduct(state, action:PayloadAction<Product>) {
            state.products.push(action.payload);
            localStorage.setItem('products', JSON.stringify(state.products));
            toast.success('Product added successfully');
        },
        //remove product
        removeProduct(state, action:PayloadAction<number>) {
            const id = action.payload;
            state.products = state.products.filter((product) => product.id !== id);
            localStorage.setItem('products', JSON.stringify(state.products));
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
            localStorage.setItem('products', JSON.stringify(state.products));
            toast.success('Product updated successfully');
        },
        clearSort(state) {
            state.sortedProducts = state.products;
        },
        sortProducts(state, action:PayloadAction<string>) {
            state.sortedProducts = state.sortedProducts.sort((a, b) => {
                if (action.payload === 'high') {
                    return b.price - a.price;
                } else if (action.payload === 'low') {
                    return a.price - b.price;
                } else {
                    return a.id - b.id;
                }
            });
            toast.info('Products sorted');
        }
    },
});

// export actions
export const { addProduct, removeProduct, updateProduct, fetchStart,fetchFail,fetchSuccess,clearSort,sortProducts} = productSlice.actions;
const productReducer = productSlice.reducer;
export default productReducer;
