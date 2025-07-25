import { configureStore } from "@reduxjs/toolkit";
import { cartSlice } from "../features/cart/cartSlice";
import { catalogSlice } from "../features/catalog/catalogSlice";
export const store = configureStore({
  reducer: {
    cart: cartSlice.reducer,
    catalog: catalogSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
