import {
  checkUserExists,
  SignInBody,
  SignupBody,
  userSignIn,
  userSignUp,
} from "@/service/user";
import { NextAuthConfig } from "next-auth";
import Kakao from "next-auth/providers/kakao";
import { cookies } from "next/headers";

export const authOptions: NextAuthConfig = {
  // debug: true,
  providers: [
    Kakao({
      clientId: process.env.AUTH_KAKAO_ID,
      clientSecret: process.env.AUTH_KAKAO_SECRET,
    }),
  ],
  callbacks: {
    async signIn({ account, user }) {
      if (!user.email) return false;
      if (!account) return false;

      const userInfo = await checkUserExists({ email: user?.email || "" });

      if (!userInfo) {
        const signUpBody: SignupBody = {
          email: user.email || "",
          nickname: user.name || "",
          accessToken: account?.access_token || "",
          refreshToken: account?.refresh_token || "",
          scope: account?.scope || "",
        };

        const res = await userSignUp(signUpBody);
      } else {
        const signInBody: SignInBody = {
          email: user.email || "",
          accessToken: account?.access_token || "",
          refreshToken: account?.refresh_token || "",
        };

        const res = await userSignIn(signInBody);
        cookies().set("accessToken", res.accessToken, {
          httpOnly: true,
        });
        cookies().set("refreshToken", res.refreshToken, {
          httpOnly: true,
        });
      }

      return true;
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }

      return token;
    },
    async session({ token, session }) {
      session.user.id = token.id as string;

      return session;
    },
    async redirect({ url }) {
      return url;
    },
  },
};
