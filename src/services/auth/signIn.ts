import { httpClient } from "@/lib/ky";

interface SignInParams {
  email: string;
  password: string;
}

interface SignInResponse {
  user: {
    id: string;
    name: string;
    email: string;
  };
}

export async function signIn({ email, password }: SignInParams) {
  const { user } = await httpClient
    .post("auth/login", {
      json: {
        email,
        password
      }
    })
    .json<SignInResponse>();

  return {
    user
  };
}
