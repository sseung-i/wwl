import {
  checkUserExists,
  SignInBody,
  SignupBody,
  userSignIn,
  userSignUp,
} from "@/service/user";
import NextAuth, { DefaultSession } from "next-auth";
import Kakao from "next-auth/providers/kakao";
import { cookies } from "next/headers";

declare module "next-auth" {
  /**
   * Returned by `auth`, `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: {
      /** The user's postal address. */
      address: string;
      /**
       * By default, TypeScript merges new interface properties and overwrites existing ones.
       * In this case, the default session user properties will be overwritten,
       * with the new ones defined above. To keep the default session user properties,
       * you need to add them back into the newly declared interface.
       */
    } & DefaultSession["user"];
  }
}

export const { handlers, signIn, signOut, auth } = NextAuth({
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
      console.log("--userInfo", userInfo);

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
});
