import {
  checkUserExists,
  SignInBody,
  SignupBody,
  userSignIn,
  userSignUp,
} from "@/service/user";
import { authOptions } from "@/utils/authOptions";
import NextAuth, { DefaultSession } from "next-auth";
import Kakao from "next-auth/providers/kakao";
import { cookies } from "next/headers";

export const { handlers, signIn, signOut, auth } = NextAuth(authOptions);
