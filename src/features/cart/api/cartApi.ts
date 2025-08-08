import axiosClient from "../../../shared/api/axiosClient";

export const cartApi = {
  get: () => axiosClient.get("cart").then((res) => res.data),
  addItem: (productID: number, quantity = 1) =>
    axiosClient
      .post(`cart?productId=${productID}&quantity=${quantity}`, {})
      .then((res) => res.data),
  deleteItem: (productID: number, quantity = 1) =>
    axiosClient
      .delete(`cart?productId=${productID}&quantity=${quantity}`, {})
      .then((res) => res.data),
};
