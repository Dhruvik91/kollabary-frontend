import { FileQuestion } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { FRONTEND_ROUTES } from "@/constants/constants";

export function NotFoundState() {
    return (
        <div className="flex flex-col items-center justify-center min-h-[50vh] p-8 text-center">
            <div className="w-16 h-16 rounded-full bg-secondary flex items-center justify-center mb-6">
                <FileQuestion className="w-8 h-8 text-muted-foreground" />
            </div>
            <h1 className="text-3xl font-display font-bold mb-4">Page Not Found</h1>
            <p className="text-muted-foreground max-w-md mb-8">
                The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
            </p>
            <Button asChild variant="default" className="gradient-bg">
                <Link href={FRONTEND_ROUTES.HOME}>Go to Homepage</Link>
            </Button>
        </div>
    );
}
