import { useAnimationControls } from "framer-motion";
import { useRouter } from "next/navigation";
import { signOut } from "next-auth/react";
import { useEffect, useState } from "react";

export function useSideNavController() {
  const router = useRouter();

  const [isOpen, setIsOpen] = useState(false);

  const containerControls = useAnimationControls();
  const arrowControls = useAnimationControls();

  function handleToggleSideNavVisibility() {
    setIsOpen((state) => !state);
  }

  async function logout() {
    await signOut({
      redirect: false
    });

    router.replace("/login");
  }

  useEffect(() => {
    if (isOpen) {
      containerControls.start("open");
      arrowControls.start("open");
    } else {
      containerControls.start("close");
      arrowControls.start("close");
    }
  }, [isOpen, containerControls, arrowControls]);

  return {
    handleToggleSideNavVisibility,
    logout,
    isOpen,
    containerControls,
    arrowControls
  };
}
