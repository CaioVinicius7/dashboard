"use client";

import { Label } from "@radix-ui/react-label";

import { Button } from "@/components/ui/button";
import { CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

import { useLoginFormController } from "./useLoginFormController";

export function LoginForm() {
  const { register, handleSubmit, errors } = useLoginFormController();

  return (
    <form onSubmit={handleSubmit}>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>

          <Input
            id="email"
            placeholder="exemplo@gmail.com"
            autoComplete="off"
            data-error={!!errors.email}
            className="data-[error=true]:border-red-400"
            {...register("email")}
          />

          {errors.email && (
            <span className="block text-sm text-red-400">
              {errors.email.message}
            </span>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="password">Senha</Label>

          <Input
            id="password"
            placeholder="********"
            type="password"
            data-error={!!errors.password}
            className="data-[error=true]:border-red-400"
            {...register("password")}
          />

          {errors.password && (
            <span className="block text-sm text-red-400">
              {errors.password.message}
            </span>
          )}
        </div>
      </CardContent>

      <CardFooter className="mt-2">
        <Button type="submit" className="w-full">
          Entrar
        </Button>
      </CardFooter>
    </form>
  );
}
