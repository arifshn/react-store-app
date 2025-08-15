import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { Cart } from "../models/ICart";
import { cartApi } from "../api/cartApi";
import { toast } from "react-toastify";

interface CartState {
  cart: Cart | null;
  status: string;
}

const initialState: CartState = {
  cart: null,
  status: "idle",
};

export const addItemToCart = createAsyncThunk<
  Cart,
  { productId: number; quantity?: number; stock: number }
>(
  "cart/addItemToCart",
  async ({ productId, quantity = 1, stock }, { getState, rejectWithValue }) => {
    try {
      const state: any = getState();
      const cart = state.cart.cart;

      const existingItem = cart?.cartItems.find(
        (item: any) => item.productId === productId
      );
      const existingQuantity = existingItem ? existingItem.quantity : 0;

      if (existingQuantity + quantity > stock) {
        toast.error("Stok miktarına ulaştınız!");
        return rejectWithValue("Stok yetersiz");
      }

      const response = await cartApi.addItem(productId, quantity);
      return response;
    } catch (error: any) {
      toast.error("Sepete eklenemedi!");
      return rejectWithValue(error);
    }
  }
);

export const deleteItemFromCart = createAsyncThunk<
  Cart,
  { productId: number; quantity?: number; key?: string }
>("cart/deleteItemFromCart", async ({ productId, quantity = 1 }) => {
  try {
    return await cartApi.deleteItem(productId, quantity);
  } catch (error) {
    console.log(error);
  }
});

export const getCart = createAsyncThunk<Cart>(
  "cart/getcart",
  async (_, thunkAPI) => {
    try {
      return await cartApi.get();
    } catch (error: any) {
      return thunkAPI.rejectWithValue({ error: error.data });
    }
  }
);

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setCart: (state, action) => {
      state.cart = action.payload;
    },
    clearCart: (state) => {
      state.cart = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addItemToCart.pending, (state, action) => {
        state.status = "pendingAddItem" + action.meta.arg.productId;
      })
      .addCase(addItemToCart.fulfilled, (state, action) => {
        state.cart = action.payload;
        state.status = "idle";
      })
      .addCase(addItemToCart.rejected, (state) => {
        state.status = "idle"; // loading kapanıyor
      })
      .addCase(deleteItemFromCart.pending, (state, action) => {
        state.status =
          "pendingDeleteItem" + action.meta.arg.productId + action.meta.arg.key;
      })
      .addCase(deleteItemFromCart.fulfilled, (state, action) => {
        state.cart = action.payload;
        state.status = "idle";
      })
      .addCase(deleteItemFromCart.rejected, (state) => {
        state.status = "idle";
      })
      .addCase(getCart.fulfilled, (state, action) => {
        state.cart = action.payload;
        state.status = "idle";
      })
      .addCase(getCart.rejected, (state) => {
        state.status = "idle";
      });
  },
});

export const { setCart, clearCart } = cartSlice.actions;
