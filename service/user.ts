import { axiosGet, axiosPatch, axiosPost } from "@/utils/axios";

export const getUserInfo = async () => {
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
