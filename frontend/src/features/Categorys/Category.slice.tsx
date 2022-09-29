import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AddCategory, ListCategorys, readCategory, RemoveCategory, UpdateCategory } from "../../api/category";
import { CategoryType } from "../../types/CategoryType";
import { ProductType } from "../../types/ProductType";


interface ICategoryState {
        category: {},
        categorys: []
}

const initialState: ICategoryState = {
        category: {},
        categorys: []
}


export const addCategory = createAsyncThunk("category/create", async (category: CategoryType) => {
            const newCategory = await AddCategory(category);
            console.log("res", newCategory);
            
            return newCategory.data; 
})
export const listCategory  = createAsyncThunk("category/list", async () => {
    const newCategory = await ListCategorys();
    return newCategory.data; 
})
export const deleteCategory = createAsyncThunk("category/remove", async (id: string) => {
    const res = await RemoveCategory(id);
    return res.data
})
export const updateCategory = createAsyncThunk("category/update", async (category:CategoryType) => {
    const newCategory = await UpdateCategory(category)
    return newCategory.data
    
})
export const ReadCategory = createAsyncThunk("category/read", async (id:string) => {
    const newCategory = await readCategory(id)
    return newCategory.data
})

const categorySlice = createSlice({
    name: "category",
    initialState,
    reducers: {},
    extraReducers: (build) => {
        build.addCase(addCategory.fulfilled, (state,{payload}) => {
            state.categorys.push(payload as never)
        }),
        build.addCase(listCategory.fulfilled, (state,{payload}) => {
            state.categorys = payload as any
        }),
        build.addCase(deleteCategory.fulfilled,(state:any,{payload}) => {
               state.categorys = state.categorys.filter((item: CategoryType) => item._id !== payload._id)
        }),
        build.addCase(updateCategory.fulfilled, (state:any, {payload}) => {
            state.categorys = state.categorys.map((item:CategoryType) => item._id === payload.id)
        }),
        build.addCase(ReadCategory.fulfilled, (state, {payload}) => {
            state.category = payload
        })
    }
})
export default categorySlice.reducer