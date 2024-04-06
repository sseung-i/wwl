import axios, { AxiosRequestConfig } from "axios";

const instance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_SERVER_URL,
    // timeout: 5000
})

export const axiosGet = (url:string) => instance.get(url);
export const axiosPost = (url:string,data:any,config:AxiosRequestConfig) => instance.post(url,data,config)

instance.interceptors.request.use(
    (config) => {return config},
    (error) => { return Promise.reject(error)}
);

instance.interceptors.response.use(
    (config) => {return config},
    (error) => { return Promise.reject(error)}
);