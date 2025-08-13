import axiosClient from "../../../shared/api/axiosClient";
import type {
  ReviewDetail,
  ReviewCreate,
  ApiMessage,
  ApiError,
  ReviewEdit,
} from "../models/IReview";

export const reviewApi = {
  getReview: (id: number, productId: number) =>
    axiosClient
      .get<ReviewDetail>(`reviews/${id}`, { params: { productId } })
      .then((res) => res.data),
  getReviewsByProductId: (productId: number) =>
    axiosClient
      .get<ReviewDetail[]>(`reviews/product/${productId}`)
      .then((res) => res.data),
  addReview: (formData: ReviewCreate) =>
    axiosClient
      .post<ApiMessage | ApiError>("reviews", formData)
      .then((res) => res.data),

  deleteReview: (id: number) =>
    axiosClient.delete<ApiMessage>(`reviews/${id}`).then((res) => res.data),

  editReview: (id: number, formData: ReviewEdit) =>
    axiosClient
      .put<ApiMessage | ApiError>(`reviews/${id}`, formData)
      .then((res) => res.data),
};
