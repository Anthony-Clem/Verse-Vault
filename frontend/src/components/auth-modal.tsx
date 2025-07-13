"use client";

import { useAuth } from "@/contexts/auth-context";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "./ui/dialog";
import Logo from "./logo";
import { useState } from "react";
import LoginForm from "./login-form";
import RegisterForm from "./register-form";

const AuthModal = () => {
  const { showModal, setShowModal } = useAuth();
  const [authState, setAuthState] = useState<"login" | "register">("login");

  return (
    <Dialog open={showModal} onOpenChange={setShowModal}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="hidden" />
          <Logo className="text-2xl" />
        </DialogHeader>
        {authState === "login" ? <LoginForm /> : <RegisterForm />}
        <DialogFooter>
          <button
            className="mx-auto text-sm text-primary font-semibold cursor-pointer hover:underline"
            onClick={() => setAuthState(authState === "login" ? "register" : "login")}
          >
            {authState === "login" ? "Create account" : "Login"}
          </button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
export default AuthModal;
