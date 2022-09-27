import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import CartReducer from "../features/Cart/Cart.slice";
import CategoryReducer from "../features/Categorys/Category.slice";
import ProductReducer from "../features/Products/Product.slice";



export const store = configureStore({
    reducer: {
            cart: CartReducer,
            product: ProductReducer,
            category: CategoryReducer,
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