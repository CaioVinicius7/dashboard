import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

import { authService } from "@/services/auth";

export const nextAuthOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: {
          label: "email",
          type: "text"
        },
        password: {
          label: "password",
          type: "password"
        }
      },
      authorize: async (credentials, _req) => {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        const { user } = await authService.signIn({
          email: credentials.email,
          password: credentials.password
        });

        if (!!user) {
          return user;
        }

        return null;
      }
    })
  ],
  pages: {
    signIn: "/login"
  },
  callbacks: {
    jwt: async ({ token, user }) => {
      if (user) {
        token.user = user;
      }

      return token;
    },
    session: async ({ session, token }) => {
      session.user = token.user as any;

      return session;
    }
  },
  session: {
    maxAge: 60 * 60 * 12 // 12 Hours
  }
};
