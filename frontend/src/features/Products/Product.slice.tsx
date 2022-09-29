import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { createProduct, ListProduct, ListProducts, removeProduct, UpdateProduct } from "../../api/product";
import { ProductType } from "../../types/ProductType";


interface IProductState {
        product: {},
        products: []
}

const initialState: IProductState = {
        product: {},
        products: []
}


export const addProduct  = createAsyncThunk("product/create", async (product: ProductType) => {
            const newProduct = await createProduct(product);
            return newProduct.data; 
})
export const listProduct  = createAsyncThunk("product/list", async () => {
    const newProduct = await ListProducts();
    return newProduct.data; 
})
export const deleteProduct = createAsyncThunk("product/remove", async (id: string) => {
    const res = await removeProduct(id);
    return res.data
})
export const updateProduct = createAsyncThunk("product/update", async (product:ProductType) => {
    const newProduct = await UpdateProduct(product)
    return newProduct.data
    
})
export const readProduct = createAsyncThunk("product/read", async (id:string) => {
    const newProduct = await ListProduct(id)
    return newProduct.data
})

const productSlice = createSlice({
    name: "product",
    initialState,
    reducers: {},
    extraReducers: (build) => {
        build.addCase(addProduct.fulfilled, (state,{payload}) => {
            state.products.push(payload as never)
        }),
        build.addCase(listProduct.fulfilled, (state,{payload}) => {
            state.products = payload as any
        }),
        build.addCase(deleteProduct.fulfilled,(state:any,{payload}) => {
               state.products = state.products.filter((item: ProductType) => item._id !== payload._id)
        }),
        build.addCase(updateProduct.fulfilled, (state:any, {payload}) => {
            state.products = state.products.map((item:ProductType) => item._id === payload.id)
        }),
        build.addCase(readProduct.fulfilled, (state, {payload}) => {
            state.product = payload
        })
    }
})
export default productSlice.reducer