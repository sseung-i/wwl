import axios, { AxiosRequestConfig } from "axios";

const instance = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_SERVER_URL}`,
  // timeout: 5000
});

export const axiosGet = (url: string) => {
  const response = instance.get(url);
  return response;
};
export const axiosPost = (
  url: string,
  body?: any,
  config?: AxiosRequestConfig
) => {
  const response = instance.post(url, body, config);
  return response;
};

instance.interceptors.request.use(
  async (config) => {
    return config;
  },
  async (error) => {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  async (res) => {
    return res;
  },
  async (error) => {
    return Promise.reject(error);
  }
);
