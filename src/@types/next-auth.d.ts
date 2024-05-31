// eslint-disable-next-line no-unused-vars
import NextAuth from "next-auth/next";

declare module "next-auth" {
  export interface Session {
    user: {
      id: string;
      email: string;
      name: string;
    };
  }
}
