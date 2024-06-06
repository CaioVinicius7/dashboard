import { useRouter } from "next/navigation";
import { useState } from "react";

export function useRemoveEmployeeModalController() {
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  async function handleRemoveEmployee(employeeId: string) {
    setIsLoading(true);

    // call service

    await new Promise((resolve) => setTimeout(resolve, 2000));

    router.refresh();

    setIsLoading(false);
  }

  return { handleRemoveEmployee, isLoading };
}
