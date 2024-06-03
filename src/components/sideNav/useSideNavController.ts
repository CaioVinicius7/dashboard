import { useRouter } from "next/navigation";
import { signOut } from "next-auth/react";
import { useState } from "react";

export function useSideNavController() {
  const router = useRouter();

  const [isOpen, setIsOpen] = useState(false);

  function handleToggleSideNavVisibility() {
    setIsOpen((state) => !state);
  }

  async function logout() {
    await signOut({
      redirect: false
    });

    router.replace("/login");
  }

  return {
    handleToggleSideNavVisibility,
    logout,
    isOpen
  };
}
