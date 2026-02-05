import { ShieldAlert } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { FRONTEND_ROUTES } from "@/constants/constants";

export function UnauthorizedState() {
    return (
        <div className="flex flex-col items-center justify-center min-h-[50vh] p-8 text-center">
            <div className="w-16 h-16 rounded-full bg-destructive/10 flex items-center justify-center mb-6">
                <ShieldAlert className="w-8 h-8 text-destructive" />
            </div>
            <h1 className="text-3xl font-display font-bold mb-4">Access Denied</h1>
            <p className="text-muted-foreground max-w-md mb-8">
                You don't have permission to view this page. Please log in with an account that has the required access rights.
            </p>
            <div className="flex gap-4">
                <Button asChild variant="default">
                    <Link href={FRONTEND_ROUTES.AUTH.LOGIN}>Log In</Link>
                </Button>
                <Button asChild variant="outline">
                    <Link href={FRONTEND_ROUTES.HOME}>Return Home</Link>
                </Button>
            </div>
        </div>
    );
}
