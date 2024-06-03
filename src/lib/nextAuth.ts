import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

import { env } from "@/env";

const { NEXTAUTH_URL } = env;

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
        const response = await fetch(`${NEXTAUTH_URL}/api/auth/login`, {
          method: "POST",
          headers: {
            "Content-type": "application/json"
          },
          body: JSON.stringify({
            email: credentials?.email,
            password: credentials?.password
          })
        });

        const { user } = await response.json();

        if (user && response.ok) {
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
    maxAge: 60 * 60 * 12
  }
};
