"use client";

import { useAuth } from "@/contexts/auth-context";
import { Loader2 } from "lucide-react";
import Logo from "./logo";
import { Button } from "./ui/button";
import UserAvatar from "./user-avatar";

const Header = () => {
  const { setShowModal, user, isLoading } = useAuth();

  return (
    <header className="border-b p-6 flex items-center justify-between">
      <Logo />

      {isLoading ? (
        <Loader2 className="size-9 animate-spin" />
      ) : user ? (
        <UserAvatar />
      ) : (
        <Button onClick={() => setShowModal(true)}>Login</Button>
      )}
    </header>
  );
};
export default Header;
