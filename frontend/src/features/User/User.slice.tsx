import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ListUser, readUser, signin, signup, updateUser } from "../../api/user";
import { UserType } from "../../types/UserType";



interface IUserState {
        user: {},
        users: []
}

const initialState: IUserState = {
        user: {},
        users: []
}


export const Signup  = createAsyncThunk("user/signup", async (user: UserType) => {
            const newUser = await signup(user);
            return newUser.data; 
})
export const Login = createAsyncThunk("user/signin", async (user:UserType) => {
            const newUser = await signin(user)
            return newUser.data
            
})
export const listUser = createAsyncThunk("user/list", async () => {
        const response = await ListUser()
        return response.data
})
export const ReadUser = createAsyncThunk("user/read", async (id: string) => {
    const response = await readUser(id)
    return response.data
})
export const UpdateUser = createAsyncThunk("user/update", async (user:UserType) => {
    const res = await updateUser(user);
    return res.data
})


const productSlice = createSlice({
    name: "user",
    initialState,
    reducers: {},
    extraReducers: (build) => {
        build.addCase(Signup.fulfilled, (state,{payload}) => {
            state.users.push(payload as never)
        }),
        build.addCase(Login.fulfilled, (state,{payload}) => {
            if(!payload.message) {
             localStorage.setItem("user", JSON.stringify(payload))
            }     
        }),
        build.addCase(listUser.fulfilled, (state,{payload}) => {
            state.users = payload
        }),
        build.addCase(ReadUser.fulfilled, (state,{payload}) => {
            state.user = payload
        }),
        build.addCase(UpdateUser.fulfilled, (state:any ,{payload}) => {
            state.users = state.users.map((item:UserType) => item._id === payload._id)
        })
    }
})
export default productSlice.reducer