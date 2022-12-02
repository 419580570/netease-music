import axios, { AxiosRequestConfig, AxiosResponse, AxiosError } from "axios";
const service = axios.create({
  baseURL: "http://localhost:3000",
  timeout: 5000,
  withCredentials: true,
});
// 请求拦截器
service.interceptors.request.use(
  (config: AxiosRequestConfig) => {
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
