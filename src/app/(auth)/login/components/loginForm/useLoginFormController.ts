import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

const schema = z.object({
  email: z.string().email("O campo deve conter um e-mail válido."),
  password: z.string().min(8, "A senha deve conter no mínimo 8 caracteres.")
});

type FormData = z.infer<typeof schema>;

export function useLoginFormController() {
  const {
    register,
    handleSubmit: hookFormHandleSubmit,
    formState: { errors }
  } = useForm<FormData>({
    resolver: zodResolver(schema)
  });

  const handleSubmit = hookFormHandleSubmit((data) => {
    console.log(JSON.stringify(data, null, 2));
  });

  return {
    register,
    handleSubmit,
    errors
  };
}