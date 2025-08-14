import type { FieldValues } from "react-hook-form";
import axiosClient from "../../../shared/api/axiosClient";
import type { ProductFilters } from "../slices/catalogSlice";

export const catalogApi = {
  list: (filters?: ProductFilters) => {
    const params: Record<string, any> = {};

    if (filters?.categoryId) {
      params.categoryId = filters.categoryId;
    }
    if (filters?.search && filters.search.trim()) {
      params.search = filters.search.trim();
    }
    if (filters?.page) {
      params.page = filters.page;
    }
    if (filters?.pageSize) {
      params.pageSize = filters.pageSize;
    }

    return axiosClient.get("products", { params }).then((res) => {
      if (res.data.products) {
        return res.data.products;
      }
      return res.data;
    });
  },
  details: (id: number) =>
    axiosClient.get(`products/${id}`).then((res) => res.data),
  CreateProduct: (data: FieldValues) =>
    axiosClient.post("products", data).then((res) => res.data),
  UpdateProduct: (data: FieldValues) => {
    console.log("UpdateProduct data:", data);
    console.log("UpdateProduct id:", data.id);
    return axiosClient.put(`products/${data.id}`, data).then((res) => res.data);
  },
  DeleteProduct: (id: number) =>
    axiosClient.delete(`products/${id}`).then((res) => res.data),
  getCategories: () => axiosClient.get("categories").then((res) => res.data),
};
