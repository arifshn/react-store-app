import axiosClient from "../../../shared/api/axiosClient";

export const accountApi = {
  login: (formData: any) =>
    axiosClient.post("account/login", formData).then((res) => res.data),
  register: (formData: any) =>
    axiosClient.post("account/register", formData).then((res) => res.data),
  getUser: () => axiosClient.get("account/getUser").then((res) => res.data),
};
