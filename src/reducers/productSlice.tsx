import { createSlice,PayloadAction } from '@reduxjs/toolkit';

export type Product = {
    id: number;
    name: string;
    description: string;
    price: number;
    images: string[];
}

interface ProductState {
    products: Product[];
    loading: boolean;
    error: string | null;
}

const initialState: ProductState = {
    products: [],
    loading: false,
    error: null,
};

const productSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {
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
        addProduct(state, action:PayloadAction<Product>) {
            state.products.push(action.payload);
        },
        removeProduct(state, action:PayloadAction<number>) {
            const id = action.payload;
            state.products = state.products.filter((product) => product.id !== id);
        },
        updateProduct(state, action:PayloadAction<Product>) {
            const newProduct = action.payload;
            const existingProduct = state.products.find((product) => product.id === newProduct.id);
            if (existingProduct) {
                existingProduct.name = newProduct.name;
                existingProduct.price = newProduct.price;
                existingProduct.description = newProduct.description;
                existingProduct.images = newProduct.images;
            }
        },
    },
});

export const { addProduct, removeProduct, updateProduct, fetchStart,fetchFail,fetchSuccess} = productSlice.actions;
const productReducer = productSlice.reducer;
export default productReducer;
