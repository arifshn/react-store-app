import type { FieldValues } from "react-hook-form";
import axiosClient from "../../../shared/api/axiosClient";

export const catalogApi = {
  list: () => axiosClient.get("products").then((res) => res.data),
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
};
