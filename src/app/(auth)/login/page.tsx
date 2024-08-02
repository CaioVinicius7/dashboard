import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card";

import { LoginForm } from "./components/LoginForm";

export default function Login() {
  return (
    <div className="flex min-h-screen">
      <Card className="absolute left-1/2 top-1/2 w-4/5 -translate-x-1/2 -translate-y-1/2 sm:w-auto">
        <CardHeader>
          <CardTitle>Login</CardTitle>
          <CardDescription>
            Preencha o formulário abaixo com seus dados.
          </CardDescription>
        </CardHeader>

        <LoginForm />
      </Card>
    </div>
  );
}
