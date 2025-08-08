import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from "@reduxjs/toolkit";
import type { IFavorite } from "../models/IFavorite";
import type { FieldValues } from "react-hook-form";
import type { RootState } from "../../../store/store";
import { favoriteApi } from "../api/favoriteApi";

export const fetchFavorities = createAsyncThunk<IFavorite[]>(
  "favorities/fetchFavorities",
  async () => {
    return await favoriteApi.GetFavorities();
  }
);
const favoritiesAdapter = createEntityAdapter<IFavorite>();
const initialState = favoritiesAdapter.getInitialState({
  status: "idle",
  isLoaded: false,
  selectedFavorities: null as IFavorite | null,
});
export const createFavorities = createAsyncThunk<IFavorite, FieldValues>(
  "favorities/createFavorities",
  async (data, { rejectWithValue }) => {
    try {
      return await favoriteApi.AddFavorite(data);
    } catch (error: any) {
      return rejectWithValue({ error: error.data });
    }
  }
);
export const deleteFavorities = createAsyncThunk<number, number>(
  "favorities/deleteFavorities",
  async (id, { rejectWithValue }) => {
    try {
      await favoriteApi.DeleteFavorite(id);
      return id;
    } catch (error: any) {
      return rejectWithValue({ error: error.data });
    }
  }
);
export const favoritiesSlice = createSlice({
  name: "favorities",
  initialState,
  reducers: {
    clearSelectedFavorities: (state) => {
      state.selectedFavorities = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchFavorities.pending, (state) => {
      state.status = "pendingFetchFavorities";
    });
    builder.addCase(fetchFavorities.fulfilled, (state, action) => {
      favoritiesAdapter.setAll(state, action.payload);
      state.isLoaded = true;
      state.status = "idle";
    });
    builder.addCase(fetchFavorities.rejected, (state) => {
      state.status = "idle";
      state.isLoaded = false;
    });
    builder.addCase(createFavorities.fulfilled, (state, action) => {
      favoritiesAdapter.addOne(state, action.payload);
    });
    builder.addCase(deleteFavorities.fulfilled, (state, action) => {
      favoritiesAdapter.removeOne(state, action.payload);
    });
  },
});
export const {
  selectById: selectFavoritiesById,
  selectAll: selectAllFavorities,
  selectEntities: selectFavoritiesEntities,
  selectIds: selectFavoritiesIds,
  selectTotal: selectTotalFavorities,
} = favoritiesAdapter.getSelectors((state: RootState) => state.favorities);
