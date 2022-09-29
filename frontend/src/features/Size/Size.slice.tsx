import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { listSize } from "../../api/size";
import { SizeType } from "../../types/SizeType";



interface ISizeState {
        size: {},
        sizes: []
}

const initialState: ISizeState = {
        size: {},
        sizes: []
}



export const ListSize  = createAsyncThunk("size/list", async () => {
    const newSize = await listSize();
    console.log("sizes", newSize.data);
    return newSize.data; 
})


const sizeSlice = createSlice({
    name: "size",
    initialState,
    reducers: {},
    extraReducers: (build) => {
        build.addCase(ListSize.fulfilled, (state,{payload}) => {
            state.sizes = payload
        })
    }
})
export default sizeSlice.reducer