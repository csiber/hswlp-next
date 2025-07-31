import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="container mx-auto px-4 flex items-center justify-center min-h-screen">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Invitation not found</CardTitle>
          <CardDescription>
            The invitation you&apos;re looking for doesn&apos;t exist or has expired.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col space-y-4">
            <p className="text-sm text-muted-foreground">
              Possible reasons:
            </p>
            <ul className="text-sm text-muted-foreground list-disc list-inside space-y-1">
              <li>The invite URL is incorrect</li>
              <li>The team admin revoked the invite</li>
              <li>The invite has expired</li>
            </ul>
            <div className="pt-4">
              <Button asChild className="w-full">
                <Link href="/dashboard">
                  Go to dashboard
                </Link>
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
