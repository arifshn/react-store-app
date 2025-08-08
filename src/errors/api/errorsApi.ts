import axiosClient from "../../shared/api/axiosClient";

export const errorsApi = {
  get400Error: () =>
    axiosClient.get("/error/bad-request").then((res) => res.data),
  get401Error: () =>
    axiosClient.get("/error/unauthorized").then((res) => res.data),
  get404Error: () =>
    axiosClient.get("/error/not-found").then((res) => res.data),
  get500Error: () =>
    axiosClient.get("/error/server-error").then((res) => res.data),
  getValidationError: () =>
    axiosClient.get("/error/validation-error").then((res) => res.data),
};
