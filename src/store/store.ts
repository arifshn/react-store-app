import { configureStore } from "@reduxjs/toolkit";
import { cartSlice } from "../features/cart/cartSlice";
import { catalogSlice } from "../features/catalog/catalogSlice";
import { accountSlice } from "../features/account/accountSlice";
import { useDispatch, useSelector } from "react-redux";
import { categoriesSlice } from "../features/categories/categoriesSlice";
import { orderSlice } from "../features/orders/orderSlice";
import { favoritiesSlice } from "../features/favorite/favoriteSlice";

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
