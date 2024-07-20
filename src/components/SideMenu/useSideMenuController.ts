import { useRouter } from "next/navigation";
import { signOut } from "next-auth/react";
import { useState } from "react";

export function useSideMenuController() {
  const router = useRouter();

  const [isOpen, setIsOpen] = useState(false);

  function handleToggleSideMenuVisibility() {
    setIsOpen((state) => !state);
  }

  async function logout() {
    await signOut({
      redirect: false
    });

    router.replace("/login");
  }

  return {
    handleToggleSideMenuVisibility,
    logout,
    isOpen
  };
}
