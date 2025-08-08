import axiosClient from "../../../shared/api/axiosClient";

export const favoriteApi = {
  GetFavorities: () => axiosClient.get("favorities").then((res) => res.data),
  AddFavorite: (formData: any) =>
    axiosClient.post("favorities", formData).then((res) => res.data),
  DeleteFavorite: (id: number) =>
    axiosClient.delete(`favorities/${id}`).then((res) => res.data),
};
