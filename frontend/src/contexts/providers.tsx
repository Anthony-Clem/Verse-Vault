"use client";

import { AuthProvider } from "@/contexts/auth-context";
import { VerseProvider } from "@/contexts/verse-context";
import AuthModal from "@/components/auth-modal";
import { Toaster } from "@/components/ui/sonner";

export const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <AuthProvider>
      <VerseProvider>
        {children}
        <AuthModal />
        <Toaster />
      </VerseProvider>
    </AuthProvider>
  );
};
