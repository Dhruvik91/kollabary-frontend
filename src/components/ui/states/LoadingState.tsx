import { Sparkles } from "lucide-react";

interface LoadingStateProps {
    message?: string;
    fullPage?: boolean;
}

export function LoadingState({ message = "Loading...", fullPage = false }: LoadingStateProps) {
    return (
        <div className={`flex flex-col items-center justify-center p-8 space-y-6 ${fullPage ? 'fixed inset-0 z-[100] bg-background' : ''}`}>
            <div className="relative">
                <div className="w-16 h-16 rounded-2xl gradient-bg flex items-center justify-center shadow-lg shadow-primary/20 animate-pulse-glow">
                    <Sparkles className="w-8 h-8 text-primary-foreground" />
                </div>
                <div className="absolute inset-0 rounded-2xl bg-primary/20 animate-ping -z-10" />
            </div>
            <p className="text-sm font-semibold tracking-widest text-primary uppercase animate-pulse">
                {message}
            </p>
        </div>
    );
}
