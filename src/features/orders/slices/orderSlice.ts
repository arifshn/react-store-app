import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from "@reduxjs/toolkit";
import type { Order } from "../models/IOrder";
import type { FieldValues } from "react-hook-form";
import type { RootState } from "../../../store/store";
import { ordersApi } from "../api/ordersApi";

export const fetchOrders = createAsyncThunk<Order[]>(
  "order/fetchOrders",
  async () => {
    return await ordersApi.getOrders();
  }
);

export const fetchOrderById = createAsyncThunk<Order, number>(
  "order/fetchOrderById",
  async (orderId) => {
    return await ordersApi.getOrder(orderId);
  }
);

const orderAdapter = createEntityAdapter<Order>();
const initialState = orderAdapter.getInitialState({
  status: "idle",
  isLoaded: false,
  selectedOrder: null as Order | null,
});

export const createOrder = createAsyncThunk<Order, FieldValues>(
  "order/CreateOrder",
  async (data, { rejectWithValue }) => {
    try {
      return await ordersApi.createOrder(data);
    } catch (error: any) {
      return rejectWithValue({ error: error.data });
    }
  }
);

export const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    clearSelectedOrder: (state) => {
      state.selectedOrder = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchOrders.pending, (state) => {
      state.status = "pendingFetchOrders";
    });
    builder.addCase(fetchOrders.fulfilled, (state, action) => {
      orderAdapter.setAll(state, action.payload);
      state.isLoaded = true;
      state.status = "idle";
    });
    builder.addCase(fetchOrders.rejected, (state) => {
      state.status = "idle";
    });
    builder.addCase(fetchOrderById.pending, (state) => {
      state.status = "pendingFetchOrderById";
    });
    builder.addCase(fetchOrderById.fulfilled, (state, action) => {
      orderAdapter.upsertOne(state, action.payload);
      state.status = "idle";
    });
    builder.addCase(fetchOrderById.rejected, (state) => {
      state.status = "idle";
    });
    builder.addCase(createOrder.fulfilled, (state, action) => {
      orderAdapter.addOne(state, action.payload);
    });
  },
});

export const {
  selectById: selectOrderById,
  selectIds: selectOrderIds,
  selectAll: selectAllOrder,
  selectTotal: selecetTotalOrder,
} = orderAdapter.getSelectors((state: RootState) => state.order);
