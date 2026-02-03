"use client";

import { useState } from "react";
import { Flag, ShieldAlert } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import { ReportDialog } from "@/components/features/report/ReportDialog";

interface ReportInfluencerButtonProps {
    influencerId: string;
    influencerName: string;
    variant?: "icon" | "full";
}

export function ReportInfluencerButton({
    influencerId,
    influencerName,
    variant = "icon",
}: ReportInfluencerButtonProps) {
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    if (variant === "icon") {
        return (
            <TooltipProvider>
                <Tooltip>
                    <TooltipTrigger asChild>
                        <Button
                            variant="outline"
                            size="icon"
                            className="border-glass-border hover:bg-destructive/10 hover:text-destructive hover:border-destructive/50 transition-colors"
                            onClick={() => setIsDialogOpen(true)}
                            aria-label={`Report ${influencerName}`}
                        >
                            <Flag className="w-4 h-4" />
                        </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                        <p>Report this influencer</p>
                    </TooltipContent>
                </Tooltip>

                <ReportDialog
                    isOpen={isDialogOpen}
                    onClose={() => setIsDialogOpen(false)}
                    type="influencer"
                    targetName={influencerName}
                    targetId={influencerId}
                />
            </TooltipProvider>
        );
    }

    return (
        <>
            <Button
                variant="outline"
                className="border-glass-border hover:bg-destructive/10 hover:text-destructive hover:border-destructive/50 transition-colors gap-2"
                onClick={() => setIsDialogOpen(true)}
            >
                <ShieldAlert className="w-4 h-4" />
                Report Fraud
            </Button>

            <ReportDialog
                isOpen={isDialogOpen}
                onClose={() => setIsDialogOpen(false)}
                type="influencer"
                targetName={influencerName}
                targetId={influencerId}
            />
        </>
    );
}
