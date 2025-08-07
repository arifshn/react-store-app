import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from "@reduxjs/toolkit";
import type { IProduct } from "../../model/IProduct";
import requests from "../../api/requests";
import type { RootState } from "../../store/store";
import type { FieldValues } from "react-hook-form";

export const fetchProducts = createAsyncThunk<IProduct[]>(
  "catalog/fetchProducts",
  async () => {
    return await requests.Catalog.list();
  }
);

export const fetchProductsById = createAsyncThunk<IProduct, number>(
  "catalog/fetchProductsById",
  async (productId) => {
    return await requests.Catalog.details(productId);
  }
);

const productsAdapter = createEntityAdapter<IProduct>();
const initialState = productsAdapter.getInitialState({
  status: "idle",
  isLoaded: false,
  selectedProduct: null as IProduct | null,
});

export const createProduct = createAsyncThunk<IProduct, FieldValues>(
  "catalog/CreateProduct",
  async (data, { rejectWithValue }) => {
    try {
      return await requests.Catalog.CreateProduct(data);
    } catch (error: any) {
      return rejectWithValue({ error: error.data });
    }
  }
);

export const updateProduct = createAsyncThunk<IProduct, FieldValues>(
  "catalog/UpdateProduct",
  async (data, { rejectWithValue }) => {
    try {
      console.log("updateProduct data:", data);
      console.log("updateProduct id:", data.id);
      return await requests.Catalog.UpdateProduct(data);
    } catch (error: any) {
      return rejectWithValue({ error: error.data });
    }
  }
);

export const deleteProduct = createAsyncThunk<number, number>(
  "catalog/DeleteProduct",
  async (id, { rejectWithValue }) => {
    try {
      await requests.Catalog.DeleteProduct(id);
      return id;
    } catch (error: any) {
      return rejectWithValue({ error: error.data });
    }
  }
);

export const catalogSlice = createSlice({
  name: "catalog",
  initialState,
  reducers: {
    clearSelectedProduct: (state) => {
      state.selectedProduct = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchProducts.pending, (state) => {
      state.status = "pendingFetchProducts";
    });
    builder.addCase(fetchProducts.fulfilled, (state, action) => {
      productsAdapter.setAll(state, action.payload);
      state.isLoaded = true;
      state.status = "idle";
    });
    builder.addCase(fetchProducts.rejected, (state) => {
      state.status = "idle";
    });
    builder.addCase(fetchProductsById.pending, (state) => {
      state.status = "pendingFetchProductById";
    });
    builder.addCase(fetchProductsById.fulfilled, (state, action) => {
      productsAdapter.upsertOne(state, action.payload);
      state.status = "idle";
    });
    builder.addCase(fetchProductsById.rejected, (state) => {
      state.status = "idle";
    });
    builder.addCase(createProduct.fulfilled, (state, action) => {
      productsAdapter.addOne(state, action.payload);
    });

    builder.addCase(updateProduct.fulfilled, (state, action) => {
      if (action.payload && action.payload.id !== undefined) {
        productsAdapter.upsertOne(state, action.payload);
      } else {
        console.warn(
          "updateProduct.fulfilled: id yok veya undefined",
          action.payload
        );
      }
    });

    builder.addCase(deleteProduct.fulfilled, (state, action) => {
      productsAdapter.removeOne(state, action.payload);
    });
  },
});

export const {
  selectById: selectProductById,
  selectIds: selectProductIds,
  selectEntities: selectProductEntities,
  selectAll: selectAllProducts,
  selectTotal: selectTotalProducts,
} = productsAdapter.getSelectors((state: RootState) => state.catalog);
