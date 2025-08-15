import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
  type PayloadAction,
} from "@reduxjs/toolkit";

import type { RootState } from "../../../store/store";
import type { FieldValues } from "react-hook-form";
import { catalogApi } from "../api/catalogApi";
import type { IProduct } from "../models/IProduct";

export interface ProductFilters {
  categoryId?: number;
  search?: string;
  page?: number;
  pageSize?: number;
  showInactive?: boolean;
}

export const fetchProducts = createAsyncThunk<
  IProduct[],
  ProductFilters | undefined
>("catalog/fetchProducts", async (filters) => {
  return await catalogApi.list(filters);
});

export const fetchProductsById = createAsyncThunk<IProduct, number>(
  "catalog/fetchProductsById",
  async (productId) => {
    return await catalogApi.details(productId);
  }
);

const productsAdapter = createEntityAdapter<IProduct>();
const initialState = productsAdapter.getInitialState({
  status: "idle",
  isLoaded: false,
  selectedProduct: null as IProduct | null,
  filters: {
    categoryId: undefined,
    search: "",
    page: 1,
    pageSize: 12,
  } as ProductFilters,
});

export const createProduct = createAsyncThunk<IProduct, FieldValues>(
  "catalog/CreateProduct",
  async (data, { rejectWithValue }) => {
    try {
      return await catalogApi.CreateProduct(data);
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
      return await catalogApi.UpdateProduct(data);
    } catch (error: any) {
      return rejectWithValue({ error: error.data });
    }
  }
);

export const deleteProduct = createAsyncThunk<number, number>(
  "catalog/DeleteProduct",
  async (id, { rejectWithValue }) => {
    try {
      await catalogApi.DeleteProduct(id);
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
    setFilters: (state, action: PayloadAction<Partial<ProductFilters>>) => {
      state.filters = { ...state.filters, ...action.payload };
      state.isLoaded = false;
    },
    clearFilters: (state) => {
      state.filters = {
        categoryId: undefined,
        search: "",
        page: 1,
        pageSize: 12,
      };
      state.isLoaded = false;
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

export const { clearSelectedProduct, setFilters, clearFilters } =
  catalogSlice.actions;

export const {
  selectById: selectProductById,
  selectIds: selectProductIds,
  selectEntities: selectProductEntities,
  selectAll: selectAllProducts,
  selectTotal: selectTotalProducts,
} = productsAdapter.getSelectors((state: RootState) => state.catalog);

export const selectFilters = (state: RootState) => state.catalog.filters;
