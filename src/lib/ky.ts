import { getCookie } from "cookies-next";
import type { CookiesFn } from "cookies-next/lib/types";
import ky from "ky";

import { env } from "@/env";

const { NEXT_PUBLIC_APP_API_URL } = env;

export const httpClient = ky.create({
  prefixUrl: NEXT_PUBLIC_APP_API_URL,
  hooks: {
    beforeRequest: [
      async (request) => {
        let cookieStore: CookiesFn | undefined;

        if (typeof window === "undefined") {
          const { cookies: serverCookies } = await import("next/headers");

          cookieStore = serverCookies;
        }
        const token = getCookie("next-auth.session-token", {
          cookies: cookieStore
        });

        if (token) {
          request.headers.set("Authorization", `Bearer ${token}`);
        }
      }
    ]
  }
});
