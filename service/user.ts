import { axiosGet, axiosPost } from "@/utils/axios";

export const getUserInfo = async () => {
  const res = await axiosGet(`/v1/api/user`);

  return res.data;
};
