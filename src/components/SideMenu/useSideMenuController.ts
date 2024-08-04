import { signOut } from "next-auth/react";
import { useState } from "react";

export function useSideMenuController() {
  const [isOpen, setIsOpen] = useState(false);

  function handleToggleSideMenuVisibility() {
    setIsOpen((state) => !state);
  }

  async function logout() {
    await signOut();
  }

  return {
    handleToggleSideMenuVisibility,
    logout,
    isOpen
  };
}
