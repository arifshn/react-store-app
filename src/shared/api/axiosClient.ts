import axios, { AxiosError, type AxiosResponse } from "axios";
import { toast } from "react-toastify";
import { router } from "../../router/Routes";
import { store } from "../../store/store";

const axiosClient = axios.create({
  baseURL: "http://localhost:5163/api/",
  withCredentials: true,
});

axiosClient.interceptors.request.use((config) => {
  const token = store.getState().account.user?.token;
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

axiosClient.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    const { data, status } = error.response as AxiosResponse;

    switch (status) {
      case 400:
        if (data.errors) {
          throw Object.values(data.errors).flat();
        }
        toast.error(data.title);
        break;
      case 401:
        toast.error(data.title);
        break;
      case 404:
        router.navigate("/not-found");
        break;
      case 500:
        router.navigate("/server-error", { state: { error: data, status } });
        break;
    }

    return Promise.reject(error.response);
  }
);

export const api = {
  get: <T>(url: string) => axiosClient.get<T>(url).then((res) => res.data),
  post: <T>(url: string, body?: {}) =>
    axiosClient.post<T>(url, body).then((res) => res.data),
  put: <T>(url: string, body: {}) =>
    axiosClient.put<T>(url, body).then((res) => res.data),
  delete: <T>(url: string, body?: {}) =>
    axiosClient.delete<T>(url, { data: body }).then((res) => res.data),
};

export default axiosClient;
