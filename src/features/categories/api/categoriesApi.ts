import type { FieldValues } from "react-hook-form";
import axiosClient from "../../../shared/api/axiosClient";

export const categoriesApi = {
  getCategorys: () => axiosClient.get("category").then((res) => res.data),
  getCategory: (id: number) =>
    axiosClient.get(`category/${id}`).then((res) => res.data),
  CreateCategory: (data: FieldValues) =>
    axiosClient.post("category", data).then((res) => res.data),
  UpdateCategory: (data: FieldValues) =>
    axiosClient.put(`category/${data.id}`, data).then((res) => res.data),
  DeleteCategory: (id: number) =>
    axiosClient.delete(`category/${id}`).then((res) => res.data),
};
