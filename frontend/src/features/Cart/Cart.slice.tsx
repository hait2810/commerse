import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { listCart, readcart, removeCarta, sendorder, updateCart } from "../../api/cart";
import toastr from "toastr";
import "toastr/build/toastr.min.css";
import { CartType } from "../../types/CartType";

interface IProductState {
  cart: {},
  carts: any[],
  orderdetail: any[]
}

const initialState: IProductState = {
  cart: {},
  carts: [],
  orderdetail: []
};
if (localStorage.getItem("cart")) {
  initialState.carts = JSON.parse(localStorage.getItem("cart") as any);
} else {
  initialState.carts = [];
}

export const readCarts = createAsyncThunk("cart/readcarts", async () => {
  const newCart = await JSON.parse(localStorage.getItem("cart") as any);
  return newCart;
});
export const ListCarts = createAsyncThunk("cart/listcart", async () => {
  const newCart = await listCart()
  return newCart.data;
});
export const readCart = createAsyncThunk("cart/readcart", async (id:string) => {
  const newCart = await readcart(id)  
  return newCart.data
})
export const UpdateCart = createAsyncThunk("cart/updatecart", async (cart: CartType) => {
  const newCart = await updateCart(cart)
  return newCart.data
})
export const RemoveCart = createAsyncThunk("cart/removecartv", async (id:string) => {
  await removeCarta(id)
  return id
})
export const addCart = createAsyncThunk(
  "cart/addcart",
  async (product: any) => {
    let carts = [];
    if (localStorage.getItem("cart")) {
      carts = JSON.parse(localStorage.getItem("cart") as any);
    } else {
      carts = [];
    }
    const existProduct = carts.find(
      (item: { _id: string | undefined }) => item._id === product._id
    );
    const existColor = carts.find(
      (item: { color: string }) => item.color === product.color
    );
    const existSize = carts.find(
      (item: { size: string }) => item.size === product.size
    );

    if (!existProduct) {
      carts.push(product);
    } else {
      if (!existColor || !existSize) {
        carts.push(product);
      } else {
        existProduct.quantity += product.quantity;
      }
    }
    return carts;
  }
);

export const SendOrder = createAsyncThunk("cart/sendorder", async (order: any) => {
    const res = await sendorder(order)
    return res
})

export const removeCart = createAsyncThunk("cart/removecart",  (info: any) => {     
            const cartsa = initialState.carts.find(item => item._id == info._id && item.color == info.color && item.size == info.size)      
            const cartsb = initialState.carts.filter(item => item !== cartsa)   
            return cartsb
})


export const DecrementRe = createAsyncThunk("cart/decrement", (info: any) => {      
        return info
})

export const IncrementRe = createAsyncThunk("cart/increment", (info:any) => {
    return info
})

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {},
  extraReducers: (build) => {
    build.addCase(readCarts.fulfilled, (state, { payload }) => {
      state.carts = payload;
    }),
      build.addCase(addCart.fulfilled, (state: any, { payload }) => {
        localStorage.setItem("cart", JSON.stringify(payload));
        state.carts = payload;
      }),
      build.addCase(SendOrder.fulfilled, (state, {payload}) => {
            state.orderdetail.push(payload)
            localStorage.removeItem("cart");
            state.carts = []
      }),
      build.addCase(removeCart.fulfilled, (state, {payload}) => {
        localStorage.setItem("cart", JSON.stringify(payload))
        state.carts = payload
        
  }),
  build.addCase(DecrementRe.fulfilled, (state, {payload}) => {
    const cart = JSON.parse(localStorage.getItem("cart") as any)
    const cartsa = cart.find((item: any) => item._id == payload._id && item.color == payload.color && item.size == payload.size)
    cartsa.quantity--
    if(cartsa.quantity <= 0) {
        const confirm = window.confirm("Bạn có chắc chắn muốn xoá không")
        if(confirm) {
        const cartsb = cart.filter((item:any) => item !== cartsa) 
                    localStorage.setItem("cart", JSON.stringify(cartsb))
                    toastr.success("Xoá thành công")
                    state.carts = cartsb
                    return   
        }
        else {
            return
        }
    }
    localStorage.setItem("cart", JSON.stringify(cart))
    state.carts = cart
}),
build.addCase(IncrementRe.fulfilled, (state, {payload}) => {
    const cart = JSON.parse(localStorage.getItem("cart") as any)
    const cartsa = cart.find((item: any) => item._id == payload._id && item.color == payload.color && item.size == payload.size)
    cartsa.quantity++
    
    localStorage.setItem("cart", JSON.stringify(cart))
    state.carts = cart
}),
build.addCase(readCart.fulfilled, (state, {payload}) => {
    state.cart = payload
}),
build.addCase(ListCarts.fulfilled, (state, {payload}) => {
  state.carts = payload
}),
build.addCase(UpdateCart.fulfilled, (state, {payload}) => {
  console.log("payload",payload);
  
 state.carts = state.carts.map((item: CartType) => item._id === payload._id ? item:payload)  
}),
build.addCase(RemoveCart.fulfilled, (state, {payload}) => {
  state.carts = state.carts.filter((item:CartType) => item._id !== payload)
  
})
  },
});
export default cartSlice.reducer;
