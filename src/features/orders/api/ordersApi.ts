import axiosClient from "../../../shared/api/axiosClient";

export const ordersApi = {
  getOrders: () => axiosClient.get("orders").then((res) => res.data),
  getOrder: (id: number) =>
    axiosClient.get(`orders/${id}`).then((res) => res.data),
  createOrder: (formData: any) =>
    axiosClient.post("orders", formData).then((res) => res.data),
};
