import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { ProductResponse } from "../types";

interface ProductState {
    items: ProductResponse[]
}

const initialState: ProductState = {
    items: []
}

const productSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {
        setProducts(state, action: PayloadAction<ProductResponse[]>) {
            state.items = action.payload
        },
        addProduct(state, action: PayloadAction<ProductResponse>) {
            state.items.push(action.payload)
        },
        updateProduct(state, action: PayloadAction<ProductResponse>) {
            const index = state.items.findIndex((p) => p.id === action.payload.id)
            if (index !== -1) state.items[index] = action.payload
        },
        removeProduct(state, action: PayloadAction<string>) {
            state.items = state.items.filter((p) => p.id !== action.payload)
        },
        clearProducts(state) {
            state.items = []
        }
    }
})

export const { setProducts, addProduct, updateProduct, removeProduct, clearProducts } = productSlice.actions

export default productSlice.reducer