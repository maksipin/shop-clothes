import axios from "axios";
import configFile from "../config.json";
import localStorageService from "./localStorage.service";
import { toast } from "react-toastify";
import authService from "./auth.service";

const http = axios.create({
  baseURL: configFile.apiEndpoint,
});

http.interceptors.request.use(
  async function (config) {
    const expiresDate = localStorageService.getTokenExpiresDate();
    const refreshToken = localStorageService.getRefreshToken();
    const isExpired = refreshToken && expiresDate < Date.now();

    // Добавляем в header токен пользователя
    // Обновляем токен если вышло время
    if (isExpired) {
      const data = await authService.refresh();
      localStorageService.setTokens(data);
    }
    // Добаляем в header
    const accessToken = localStorageService.getAccessToken();
    if (accessToken) {
      config.headers = {
        ...config.headers,
        Authorization: `Bearer ${accessToken}`,
      };
    }

    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

function transormData(data) {
  return data && !data._id
    ? Object.keys(data).map((key) => ({
        ...data[key],
      }))
    : data;
}

http.interceptors.response.use(
  (res) => {
    if (configFile.isFireBase) {
      res.data = { content: transormData(res.data) };
    }
    res.data = { content: res.data };
    return res;
  },
  function (error) {
    const expectedErrors =
      error.response &&
      error.response.status >= 400 &&
      error.response.status < 500;

    if (!expectedErrors) {
      console.log(error);
      toast.error("Somthing was wrong. Try it later");
    }
    return Promise.reject(error);
  }
);
const httpService = {
  get: http.get,
  post: http.post,
  put: http.put,
  delete: http.delete,
  patch: http.patch,
};
export default httpService;
