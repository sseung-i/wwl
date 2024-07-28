"use server";
import axios, {
  AxiosError,
  AxiosRequestConfig,
  AxiosResponse,
  isAxiosError,
} from "axios";
import { cookies } from "next/headers";

const instance = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_SERVER_URL}`,
  withCredentials: true,
  // timeout: 5000
});

export const axiosGet = (url: string, config?: AxiosRequestConfig) => {
  const response = instance.get(url, config);
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
export const axiosPatch = (
  url: string,
  body?: any,
  config?: AxiosRequestConfig
) => {
  const response = instance.patch(url, body, config);

  return response;
};

instance.interceptors.request.use(
  async (config) => {
    const accessToken = cookies().get("accessToken")?.value;
    config.headers.Authorization = `Bearer ${accessToken}`;
    return config;
  },
  async (error) => {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  async (res: AxiosResponse) => {
    return res.data;
  },
  async (error: AxiosError) => {
    const originalRequest = error.config;

    switch (error.response?.status) {
      case 401:
        if (originalRequest) {
          try {
            const refreshToken = cookies().get("refreshToken")?.value;
            const response = await axios.post(
              `${process.env.NEXT_PUBLIC_SERVER_URL}/v1/api/auth/refresh`,
              {
                maxRedirects: 2,
                data: {
                  refreshToken,
                },
              }
            );

            const newToken = response.data.data;
            cookies().set("accessToken", newToken.accessToken);
            cookies().set("refreshToken", newToken.refreshToken);
            originalRequest.headers[
              "Authorization"
            ] = `Bearer ${newToken.accessToken}`;

            return await axios.request(originalRequest);
          } catch (error) {
            if (
              isAxiosError(error) &&
              (error.response?.status === 401 || error.response?.status === 404)
            ) {
              // 토큰 만료 : 재로그인 필요
              console.error("[ERROR] 토큰 만료");
            }
          }
        }
    }
    return Promise.reject(error);
  }
);
