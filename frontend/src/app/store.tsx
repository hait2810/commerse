import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import CartReducer from "../features/Cart/Cart.slice";
import CategoryReducer from "../features/Categorys/Category.slice";
import ProductReducer from "../features/Products/Product.slice";
import SizeReducer from "../features/Size/Size.slice";
import UserReducer from "../features/User/User.slice";



export const store = configureStore({
    reducer: {
            cart: CartReducer,
            product: ProductReducer,
            category: CategoryReducer,
            user: UserReducer,
            size: SizeReducer,
    },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    RootState,
    unknown,
    Action<string>
>;