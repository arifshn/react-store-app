import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { reviewApi } from "../api/reviewApi";
import type {
  ReviewDetail,
  ApiMessage,
  ReviewCreate,
  ReviewEdit,
} from "../models/IReview";

interface ReviewState {
  review: ReviewDetail | null;
  allReviews: ReviewDetail[];
  loading: boolean;
  error: string | null;
  successMessage: string | null;
}

const initialState: ReviewState = {
  review: null,
  allReviews: [],
  loading: false,
  error: null,
  successMessage: null,
};
export const fetchAllReviewsForProduct = createAsyncThunk<
  ReviewDetail[],
  number,
  { rejectValue: string }
>(
  "reviews/fetchAllReviewsForProduct",
  async (productId, { rejectWithValue }) => {
    try {
      return await reviewApi.getReviewsByProductId(productId);
    } catch (err: any) {
      return rejectWithValue(
        err.response?.data?.error || "Ürün yorumları yüklenemedi."
      );
    }
  }
);

export const fetchReview = createAsyncThunk<
  ReviewDetail,
  { id: number; productId: number },
  { rejectValue: string }
>("reviews/fetchReview", async ({ id, productId }, { rejectWithValue }) => {
  try {
    return await reviewApi.getReview(id, productId);
  } catch (err: any) {
    return rejectWithValue(err.response?.data?.error || "Yorum yüklenemedi.");
  }
});

export const addReview = createAsyncThunk<
  ApiMessage,
  ReviewCreate,
  { rejectValue: string }
>("reviews/addReview", async (data, { rejectWithValue }) => {
  try {
    const res = await reviewApi.addReview(data);
    return res as ApiMessage;
  } catch (err: any) {
    const errorMsg: string = err.response?.data?.error || "Yorum eklenemedi.";
    return rejectWithValue(errorMsg);
  }
});

export const editReview = createAsyncThunk<
  ApiMessage,
  { id: number; data: ReviewEdit },
  { rejectValue: string }
>("reviews/editReview", async ({ id, data }, { rejectWithValue }) => {
  try {
    const res = await reviewApi.editReview(id, data);
    return res as ApiMessage;
  } catch (err: any) {
    return rejectWithValue(
      err.response?.data?.error || "Yorum güncellenemedi."
    );
  }
});

export const deleteReview = createAsyncThunk<
  ApiMessage,
  { id: number; productId: number },
  { rejectValue: string }
>("reviews/deleteReview", async ({ id }, { rejectWithValue }) => {
  try {
    const res = await reviewApi.deleteReview(id);
    return res;
  } catch (err: any) {
    return rejectWithValue(err.response?.data?.error || "Yorum silinemedi.");
  }
});

const reviewSlice = createSlice({
  name: "reviews",
  initialState,
  reducers: {
    clearMessages(state) {
      state.successMessage = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchReview.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchReview.fulfilled, (state, action) => {
        state.loading = false;
        state.review = action.payload;
      })
      .addCase(fetchReview.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Bir hata oluştu.";
      });

    builder
      .addCase(addReview.pending, (state) => {
        state.loading = true;
      })
      .addCase(addReview.fulfilled, (state, action) => {
        state.loading = false;
        state.successMessage = action.payload.message;
      })
      .addCase(addReview.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Bir hata oluştu.";
      });

    builder
      .addCase(editReview.pending, (state) => {
        state.loading = true;
      })
      .addCase(editReview.fulfilled, (state, action) => {
        state.loading = false;
        state.successMessage = action.payload.message;
      })
      .addCase(editReview.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Bir hata oluştu.";
      });

    builder
      .addCase(deleteReview.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteReview.fulfilled, (state, action) => {
        state.loading = false;
        state.successMessage = action.payload.message;
        state.review = null;
      })
      .addCase(deleteReview.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Bir hata oluştu.";
      });
    builder
      .addCase(fetchAllReviewsForProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllReviewsForProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.allReviews = action.payload;
      })
      .addCase(fetchAllReviewsForProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Tüm yorumlar yüklenemedi.";
      });
  },
});

export const { clearMessages } = reviewSlice.actions;
export default reviewSlice;
