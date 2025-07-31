"use client";

import { useEffect, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useServerAction } from "zsa-react";
import { acceptTeamInviteAction } from "./team-invite.action";
import { teamInviteSchema } from "@/schemas/team-invite.schema";
import { Spinner } from "@/components/ui/spinner";

export default function TeamInviteClientComponent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const hasCalledAcceptInvite = useRef(false);

  const { execute: handleAcceptInvite, isPending, error } = useServerAction(acceptTeamInviteAction, {
    onError: ({ err }) => {
      toast.dismiss();
      toast.error(err.message || "Failed to accept the team invite");
    },
    onStart: () => {
      toast.loading("Processing invite...");
    },
    onSuccess: (data) => {
      toast.dismiss();
      toast.success("Successfully joined the team!");

      router.refresh();

      // Redirect to the team dashboard, with fallback to general dashboard
      setTimeout(() => {
        if (data && typeof data === 'object' && 'teamId' in data) {
          router.push(`/dashboard/teams/${data.teamId}`);
        } else if (data && typeof data === 'object' && data.data && 'teamId' in data.data) {
          router.push(`/dashboard/teams/${data.data.teamId}`);
        } else {
          // Fallback to dashboard if teamId is not found
          router.push('/dashboard');
        }
      }, 500);
    },
  });

  useEffect(() => {
    if (token && !hasCalledAcceptInvite.current) {
      const result = teamInviteSchema.safeParse({ token });
      if (result.success) {
        hasCalledAcceptInvite.current = true;
        handleAcceptInvite(result.data);
      } else {
        toast.error("Invalid invite token");
        router.push("/sign-in");
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  if (isPending) {
    return (
      <div className="container mx-auto px-4 flex items-center justify-center min-h-screen">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <div className="flex flex-col items-center space-y-4">
              <Spinner size="large" />
              <CardTitle>Accepting invite</CardTitle>
              <CardDescription>
                Please wait while we process the team invitation...
              </CardDescription>
            </div>
          </CardHeader>
        </Card>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 flex items-center justify-center min-h-screen">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>Invitation error</CardTitle>
            <CardDescription>
              {error?.message || "Failed to process invitation"}
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <p className="text-sm text-muted-foreground">
              {error?.code === "CONFLICT"
                ? "You are already a member of this team."
                : error?.code === "FORBIDDEN" && error?.message.includes("limit")
                ? "You have reached the maximum number of joinable teams."
                : "The invitation has expired or was revoked."}
            </p>
            <Button
              variant="outline"
              className="w-full"
              onClick={() => router.push("/dashboard")}
            >
              Go to dashboard
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!token) {
    return (
      <div className="container mx-auto px-4 flex items-center justify-center min-h-screen">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>Invalid invite link</CardTitle>
            <CardDescription>
              The invite link is invalid or has expired.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button
              variant="outline"
              className="w-full"
              onClick={() => router.push("/dashboard")}
            >
              Go to dashboard
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return null;
}
