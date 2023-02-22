import axios, { AxiosRequestConfig, AxiosResponse, AxiosError } from "axios";
import { useProfileStore } from "@/store";
const profile = useProfileStore();
const service = axios.create({
  baseURL:
    import.meta.env.MODE === "development"
      ? "http://localhost:3000"
      : "https://service-3yjiiw6j-1316753323.bj.apigw.tencentcs.com/release/",
  timeout: 8000,
  withCredentials: true,
});
// 请求拦截器
service.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    const cookie = profile.profile.cookie;
    if (import.meta.env.MODE === "development") return config;
    config.params = { cookie, ...config.params };
    return config;
  },
  (err: AxiosError) => {
    return Promise.reject(err); //返回错误
  }
);

// 响应拦截器
service.interceptors.response.use(
  (res: AxiosResponse) => {
    return res;
  },
  (err: AxiosResponse) => {
    return Promise.reject(err); //返回错误
  }
);

export function post<T>(url: string, data?: any): Promise<T> {
  return new Promise((resolve, reject) => {
    service({
      method: "post",
      url,
      data,
    })
      .then((res: any) => {
        resolve(res.data);
      })
      .catch((err: any) => {
        reject(err);
      });
  });
}

export function get<T>(url: string, data?: any): Promise<T> {
  return new Promise((resolve, reject) => {
    service({
      method: "get",
      url,
      params: data,
    })
      .then((res: any) => {
        resolve(res.data);
      })
      .catch((err: any) => {
        reject(err);
      });
  });
}
