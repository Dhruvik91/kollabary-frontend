import { AlertTriangle, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

interface ErrorStateProps {
    title?: string;
    message?: string;
    onRetry?: () => void;
}

export function ErrorState({
    title = "Something went wrong",
    message = "We encountered an error while loading this content.",
    onRetry,
}: ErrorStateProps) {
    return (
        <Alert variant="destructive" className="max-w-xl mx-auto my-8 border-destructive/50 bg-destructive/5 text-destructive font-medium p-6">
            <AlertTriangle className="h-5 w-5" />
            <div className="ml-2">
                <AlertTitle className="text-lg font-bold mb-2">{title}</AlertTitle>
                <AlertDescription className="mb-4 text-destructive/90">{message}</AlertDescription>
                {onRetry && (
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={onRetry}
                        className="border-destructive/30 hover:bg-destructive/10 hover:text-destructive"
                    >
                        <RefreshCw className="w-4 h-4 mr-2" />
                        Try Again
                    </Button>
                )}
            </div>
        </Alert>
    );
}
