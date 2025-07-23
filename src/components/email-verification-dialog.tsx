"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useSessionStore } from "@/state/session";
import { useServerAction } from "zsa-react";
import { resendVerificationAction } from "@/app/(auth)/resend-verification.action";
import { toast } from "sonner";
import { useState } from "react";
import { EMAIL_VERIFICATION_TOKEN_EXPIRATION_SECONDS } from "@/constants";
import { Alert } from "@heroui/react"
import isProd from "@/utils/is-prod";
import { usePathname } from "next/navigation";
import { Route } from "next";

const pagesToBypass: Route[] = [
  "/verify-email",
  "/sign-in",
  "/sign-up",
  "/",
  "/privacy",
  "/terms",
  "/reset-password",
  "/forgot-password"
];

export function EmailVerificationDialog() {
  const { session } = useSessionStore();
  const [lastResendTime, setLastResendTime] = useState<number | null>(null);
  const pathname = usePathname();

  const { execute: resendVerification, status } = useServerAction(resendVerificationAction, {
    onError: (error) => {
      toast.dismiss();
      toast.error(error.err?.message);
    },
    onStart: () => {
      toast.loading("Megerősítő email küldése...");
    },
    onSuccess: () => {
      toast.dismiss();
      toast.success("Megerősítő email elküldve");
      setLastResendTime(Date.now());
    },
  });

  // Don't show the dialog if the user is not logged in, if their email is already verified,
  // or if we're on the verify-email page
  if (
    !session
    || session.user.emailVerified
    || pagesToBypass.includes(pathname as Route)
  ) {
    return null;
  }

  const canResend = !lastResendTime || Date.now() - lastResendTime > 60000; // 1 minute cooldown
  const isLoading = status === "pending";

  return (
    <Dialog open modal onOpenChange={(newState) => {
      if (newState === false) {
        toast.warning("Kérjük, erősítsd meg az email címed, mielőtt folytatod");
      }
    }}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Email cím megerősítése</DialogTitle>
          <DialogDescription>
            Kérjük, erősítsd meg az email címed, hogy minden funkcióhoz hozzáférhess. A megerősítő linket elküldtük a(z) {session.user.email} címre.
            A link {Math.floor(EMAIL_VERIFICATION_TOKEN_EXPIRATION_SECONDS / 3600)} óra múlva lejár.

            {!isProd && (
              <Alert
                color="warning"
                title="Fejlesztői mód"
                description="A megerősítő linket megtalálod a konzolban."
                className="mt-4 mb-2"
              />
            )}
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-4">
          <Button
            onClick={() => resendVerification()}
            disabled={isLoading || !canResend}
          >
            {isLoading
              ? "Küldés..."
              : !canResend
                ? "Kérjük, várj 1 percet az újraküldés előtt"
                : "Megerősítő email újraküldése"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

