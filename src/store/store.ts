import { configureStore } from "@reduxjs/toolkit";
import { cartSlice } from "../features/cart/slices/cartSlice";
import { catalogSlice } from "../features/catalog/slices/catalogSlice";
import { accountSlice } from "../features/account/slices/accountSlice";
import { useDispatch, useSelector } from "react-redux";
import { categoriesSlice } from "../features/categories/slices/categoriesSlice";
import { orderSlice } from "../features/orders/slices/orderSlice";
import { favoritiesSlice } from "../features/favorite/slices/favoriteSlice";

export const store = configureStore({
  reducer: {
    cart: cartSlice.reducer,
    catalog: catalogSlice.reducer,
    account: accountSlice.reducer,
    categories: categoriesSlice.reducer,
    order: orderSlice.reducer,
    favorities: favoritiesSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
