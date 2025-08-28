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

export const createOrder = createAsyncThunk<Order, FieldValues>(
  "order/createOrder",
  async (data, { rejectWithValue }) => {
    try {
      return await ordersApi.createOrder(data);
    } catch (error: any) {
      return rejectWithValue({ error: error.data });
    }
  }
);

export const updateOrderStatus = createAsyncThunk<
  { id: number; status: number },
  { orderId: number; status: number }
>(
  "order/updateOrderStatus",
  async ({ orderId, status }, { rejectWithValue }) => {
    try {
      await ordersApi.updateOrderStatus(orderId, status);
      return { id: orderId, status };
    } catch (error: any) {
      return rejectWithValue({ error: error.data });
    }
  }
);

const orderAdapter = createEntityAdapter<Order>();

const initialState = orderAdapter.getInitialState({
  status: "idle",
  isLoaded: false,
  selectedOrder: null as Order | null,
});

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

    builder.addCase(updateOrderStatus.fulfilled, (state, action) => {
      const { id, status } = action.payload;
      const existingOrder = state.entities[id];
      if (existingOrder) {
        existingOrder.orderStatus = status;
      }
    });
  },
});

export const {
  selectById: selectOrderById,
  selectIds: selectOrderIds,
  selectAll: selectAllOrder,
  selectTotal: selectTotalOrder,
} = orderAdapter.getSelectors((state: RootState) => state.order);

export const { clearSelectedOrder } = orderSlice.actions;

export default orderSlice;
