"use client";

import { Label } from "@radix-ui/react-label";

import { Button } from "@/components/ui/button";
import { CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

export function LoginForm() {
  return (
    <form>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            placeholder="exemplo@gmail.com"
            autoComplete="off"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="password">Senha</Label>
          <Input id="password" placeholder="********" type="password" />
        </div>
      </CardContent>

      <CardFooter className="mt-2">
        <Button className="w-full">Entrar</Button>
      </CardFooter>
    </form>
  );
}
