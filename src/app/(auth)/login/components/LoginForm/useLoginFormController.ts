import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { useToast } from "@/components/ui/use-toast";

const schema = z.object({
  email: z
    .string()
    .email("O campo deve conter um e-mail válido")
    .transform((value) => value.toLowerCase()),
  password: z.string().min(8, "A senha deve conter no mínimo 8 caracteres")
});

type FormData = z.infer<typeof schema>;

export function useLoginFormController() {
  const router = useRouter();
  const { toast } = useToast();

  const {
    register,
    handleSubmit: hookFormHandleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<FormData>({
    resolver: zodResolver(schema)
  });

  const handleSubmit = hookFormHandleSubmit(async ({ email, password }) => {
    const result = await signIn("credentials", {
      email,
      password,
      redirect: false
    });

    if (!!result?.error) {
      toast({
        description: "Dados de acesso incorretos.",
        variant: "destructive"
      });

      return;
    }

    router.replace("/");
  });

  return {
    register,
    handleSubmit,
    errors,
    isSubmitting
  };
}
