import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";


interface IProductState {
        cart: {},
        carts: []
}

const initialState: IProductState = {
        cart: {},
        carts: []
}


export const readCart  = createAsyncThunk("cart/read", async () => {
            const newCart = await JSON.parse(localStorage.getItem("cart") as any);
            return newCart
})


const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {},
    extraReducers: (build) => {
        build.addCase(readCart.fulfilled, (state,{payload}) => {
            state.carts.push(payload as never)      
        })
    }
})
export default cartSlice.reducer