"use client";

import { Label } from "@radix-ui/react-label";

import { Input } from "@/components/Input";
import { Button } from "@/components/ui/button";
import { CardContent, CardFooter } from "@/components/ui/card";

import { useLoginFormController } from "./useLoginFormController";

export function LoginForm() {
  const { register, handleSubmit, errors, isSubmitting } =
    useLoginFormController();

  return (
    <form onSubmit={handleSubmit}>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>

          <Input
            id="email"
            placeholder="exemplo@gmail.com"
            autoComplete="off"
            error={errors.email?.message}
            {...register("email")}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="password">Senha</Label>

          <Input
            id="password"
            placeholder="********"
            type="password"
            error={errors.password?.message}
            {...register("password")}
          />
        </div>
      </CardContent>

      <CardFooter className="mt-2">
        <Button type="submit" disabled={isSubmitting} className="w-full">
          Entrar
        </Button>
      </CardFooter>
    </form>
  );
}
