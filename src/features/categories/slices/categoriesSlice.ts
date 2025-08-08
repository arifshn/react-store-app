import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from "@reduxjs/toolkit";
import type { ICategory } from "../models/ICategory";
import type { FieldValues } from "react-hook-form";
import type { RootState } from "../../../store/store";
import { categoriesApi } from "../api/categoriesApi";

export const fetchCategories = createAsyncThunk<ICategory[]>(
  "category/fetchCategories",
  async () => {
    return await categoriesApi.getCategorys();
  }
);

export const fetchCategoriesById = createAsyncThunk<ICategory, number>(
  "category/fetchCategoriesById",
  async (id) => {
    return await categoriesApi.getCategory(id);
  }
);

const categoriesAdapter = createEntityAdapter<ICategory>();
const initialState = categoriesAdapter.getInitialState({
  status: "idle",
  isLoaded: false,
  selectedCategories: null as ICategory | null,
});

export const createCategories = createAsyncThunk<ICategory, FieldValues>(
  "categories/createCategories",
  async (data, { rejectWithValue }) => {
    try {
      return await categoriesApi.CreateCategory(data);
    } catch (error: any) {
      return rejectWithValue({ error: error.data });
    }
  }
);

export const updateCategories = createAsyncThunk<ICategory, FieldValues>(
  "categories/updateCategories",
  async (data, { rejectWithValue }) => {
    try {
      return await categoriesApi.UpdateCategory(data);
    } catch (error: any) {
      return rejectWithValue({ error: error.data });
    }
  }
);

export const deleteCategories = createAsyncThunk<number, number>(
  "categories/deleteCategories",
  async (id, { rejectWithValue }) => {
    try {
      await categoriesApi.DeleteCategory(id);
      return id;
    } catch (error: any) {
      return rejectWithValue({ error: error.data });
    }
  }
);

export const categoriesSlice = createSlice({
  name: "categories",
  initialState,
  reducers: {
    clearSelectedCategories: (state) => {
      state.selectedCategories = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCategories.pending, (state) => {
      state.status = "pendingFetchCategories";
    });
    builder.addCase(fetchCategories.fulfilled, (state, action) => {
      categoriesAdapter.setAll(state, action.payload);
      state.isLoaded = true;
      state.status = "idle";
    });
    builder.addCase(fetchCategories.rejected, (state) => {
      state.status = "idle";
    });
    builder.addCase(fetchCategoriesById.pending, (state) => {
      state.status = "pendingFetchCategoriesById";
    });
    builder.addCase(fetchCategoriesById.fulfilled, (state, action) => {
      categoriesAdapter.upsertOne(state, action.payload);
      state.status = "idle";
    });
    builder.addCase(fetchCategoriesById.rejected, (state) => {
      state.status = "idle";
    });
    builder.addCase(createCategories.fulfilled, (state, action) => {
      categoriesAdapter.addOne(state, action.payload);
    });
    builder.addCase(updateCategories.fulfilled, (state, action) => {
      categoriesAdapter.upsertOne(state, action.payload);
    });
    builder.addCase(deleteCategories.fulfilled, (state, action) => {
      categoriesAdapter.removeOne(state, action.payload);
    });
  },
});

export const {
  selectById: selectCategoryById,
  selectAll: selectAllCategories,
  selectEntities: selectCategoryEntities,
  selectIds: selectCategoryIds,
  selectTotal: selectTotalCategories,
} = categoriesAdapter.getSelectors((state: RootState) => state.categories);
