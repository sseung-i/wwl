import { axiosDelete, axiosGet, axiosPatch, axiosPost } from "@/utils/axios";

interface UserInfoResponseType {
  id: number;
  authType: string;
  nickname: string;
  email: string;
  profileImageUrl: string;
}
export const getUserInfo = async (): Promise<UserInfoResponseType> => {
  const res = await axiosGet(`/v1/api/user`);

  return res.data;
};

export interface SignInBody {
  email: string;
  accessToken: string;
  refreshToken: string;
}

export interface SignupBody extends SignInBody {
  nickname: string;
  scope: string;
}

// 회원가입
export const userSignUp = async (body: SignupBody) => {
  try {
    const res = await axiosPost(`/v1/api/auth/token/kakao`, body);

    return res.data;
  } catch (err) {
    console.log("[ERROR] 회원가입 에러 ::", err);
  }
};

// 로그인
export const userSignIn = async (body: SignInBody) => {
  try {
    const res = await axiosPatch(`/v1/api/auth/token/kakao`, body);

    return res.data;
  } catch (err) {
    console.log("[ERROR] 로그인 에러 ::", err);
  }
};

// 유저 유무 확인
export const checkUserExists = async ({ email }: { email: string }) => {
  const res = await axiosPost(`/v1/api/auth/kakao/user-exists`, {
    email,
  });

  return res.data;
};

export const deleteUser = async () => {
  const res = await axiosDelete(`/v1/api/user`);

  return res.data;
};
