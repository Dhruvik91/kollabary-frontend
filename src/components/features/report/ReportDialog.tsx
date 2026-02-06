"use client";

import { useState } from "react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { AlertTriangle, Flag, Shield, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";
import { useCreateReport } from "@/hooks/useReports";
import { ReportReason } from "@/types/report";

interface ReportDialogProps {
    isOpen: boolean;
    onClose: () => void;
    type: "review" | "influencer";
    targetName: string;
    targetId: string;
}

const reviewReasons = [
    { id: ReportReason.SPAM, label: "Spam or misleading", icon: AlertTriangle },
    { id: ReportReason.INAPPROPRIATE_CONTENT, label: "Inappropriate content", icon: Flag },
    { id: ReportReason.FRAUD, label: "Fake or fraudulent review", icon: Shield },
    { id: ReportReason.HARASSMENT, label: "Harassment or bullying", icon: AlertTriangle },
    { id: ReportReason.OTHER, label: "Other", icon: Flag },
];

const influencerReasons = [
    { id: ReportReason.FRAUD, label: "Fraudulent activity", icon: Shield },
    { id: ReportReason.FAKE_ENGAGEMENT, label: "Fake followers or engagement", icon: AlertTriangle },
    { id: ReportReason.SCAM, label: "Scam or deceptive practices", icon: Flag },
    { id: ReportReason.IMPERSONATION, label: "Impersonation", icon: Shield },
    { id: ReportReason.HARASSMENT, label: "Harassment or abuse", icon: AlertTriangle },
    { id: ReportReason.MISLEADING, label: "Misleading content or profile", icon: Flag },
    { id: ReportReason.OTHER, label: "Other concern", icon: Flag },
];

export function ReportDialog({
    isOpen,
    onClose,
    type,
    targetName,
    targetId,
}: ReportDialogProps) {
    const [selectedReason, setSelectedReason] = useState<ReportReason | "">("");
    const [details, setDetails] = useState("");
    const [step, setStep] = useState<"form" | "success">("form");
    const createReport = useCreateReport();

    const reasons = type === "review" ? reviewReasons : influencerReasons;
    const title = type === "review" ? "Report Review" : "Report Influencer";
    const description =
        type === "review"
            ? `Report this review for violating our community guidelines`
            : `Report ${targetName} for suspicious or fraudulent activity`;

    const handleSubmit = async () => {
        if (!selectedReason) {
            toast.error("Please select a reason for your report");
            return;
        }

        try {
            await createReport.mutateAsync({
                targetId,
                targetType: type,
                reason: selectedReason as ReportReason,
                details,
            });
            setStep("success");
        } catch (error) {
            toast.error("Failed to submit report. Please try again.");
            console.error(error);
        }
    };

    const handleClose = () => {
        setStep("form");
        setSelectedReason("");
        setDetails("");
        onClose();
    };

    return (
        <Dialog open={isOpen} onOpenChange={handleClose}>
            <DialogContent className="max-w-[calc(100%-2rem)] sm:max-w-lg bg-background/95 backdrop-blur-xl border-glass-border p-4 sm:p-6 overflow-hidden max-h-[90vh] flex flex-col">
                <AnimatePresence mode="wait">
                    {step === "form" ? (
                        <motion.div
                            key="form"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                        >
                            <DialogHeader className="shrink-0">
                                <DialogTitle className="flex items-center gap-2 font-display text-lg sm:text-xl">
                                    <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-destructive/10 flex items-center justify-center">
                                        <Flag className="w-4 h-4 sm:w-5 h-5 text-destructive" aria-hidden="true" />
                                    </div>
                                    {title}
                                </DialogTitle>
                                <DialogDescription className="text-muted-foreground text-xs sm:text-sm">
                                    {description}
                                </DialogDescription>
                            </DialogHeader>

                            <div className="mt-4 sm:mt-6 space-y-4 sm:space-y-6 overflow-y-auto pr-1 flex-1 custom-scrollbar">
                                <div className="space-y-2 sm:space-y-3">
                                    <Label className="text-xs sm:text-sm font-medium">
                                        Why are you reporting this {type}?
                                    </Label>
                                    <RadioGroup
                                        value={selectedReason}
                                        onValueChange={(val) => setSelectedReason(val as ReportReason)}
                                        className="space-y-1.5 sm:space-y-2"
                                    >
                                        {reasons.map((reason) => {
                                            const Icon = reason.icon;
                                            return (
                                                <label
                                                    key={reason.id}
                                                    className={`flex items-center gap-2 sm:gap-3 p-2 sm:p-3 rounded-xl border cursor-pointer transition-all ${selectedReason === reason.id
                                                        ? "border-primary bg-primary/5"
                                                        : "border-glass-border hover:border-primary/50 hover:bg-secondary/30"
                                                        }`}
                                                >
                                                    <RadioGroupItem
                                                        value={reason.id}
                                                        id={reason.id}
                                                        className="sr-only"
                                                    />
                                                    <div
                                                        className={`w-7 h-7 sm:w-8 sm:h-8 rounded-lg flex items-center justify-center transition-colors ${selectedReason === reason.id
                                                            ? "bg-primary/20 text-primary"
                                                            : "bg-secondary text-muted-foreground"
                                                            }`}
                                                    >
                                                        <Icon className="w-3.5 h-3.5 sm:w-4 h-4" aria-hidden="true" />
                                                    </div>
                                                    <span
                                                        className={`text-sm sm:font-medium transition-colors ${selectedReason === reason.id
                                                            ? "text-foreground"
                                                            : "text-muted-foreground"
                                                            }`}
                                                    >
                                                        {reason.label}
                                                    </span>
                                                </label>
                                            );
                                        })}
                                    </RadioGroup>
                                </div>

                                <div className="space-y-1.5 sm:space-y-2">
                                    <Label htmlFor="report-details" className="text-xs sm:text-sm font-medium">
                                        Additional details (optional)
                                    </Label>
                                    <Textarea
                                        id="report-details"
                                        placeholder="Provide any additional information that may help us investigate..."
                                        value={details}
                                        onChange={(e) => setDetails(e.target.value)}
                                        className="min-h-[80px] sm:min-h-[100px] text-sm resize-none bg-secondary/30 border-glass-border focus:border-primary"
                                        maxLength={500}
                                    />
                                    <p className="text-[10px] sm:text-xs text-muted-foreground text-right">
                                        {details.length}/500 characters
                                    </p>
                                </div>

                                <div className="p-3 sm:p-4 rounded-xl bg-secondary/30 border border-glass-border">
                                    <div className="flex gap-2 sm:gap-3">
                                        <Shield className="w-4 h-4 sm:w-5 h-5 text-primary shrink-0 mt-0.5" aria-hidden="true" />
                                        <div className="text-[11px] sm:text-sm">
                                            <p className="font-medium text-foreground mb-0.5 sm:mb-1">
                                                Your report is confidential
                                            </p>
                                            <p className="text-muted-foreground leading-tight sm:leading-normal">
                                                We take all reports seriously and will investigate thoroughly. The {type === "influencer" ? "influencer" : "reviewer"} will not know who reported them.
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex gap-2 sm:gap-3 pt-2 shrink-0">
                                    <Button
                                        variant="outline"
                                        onClick={handleClose}
                                        className="flex-1 border-glass-border h-9 sm:h-10 text-sm"
                                        disabled={createReport.isPending}
                                    >
                                        Cancel
                                    </Button>
                                    <Button
                                        onClick={handleSubmit}
                                        className="flex-1 bg-destructive hover:bg-destructive/90 text-destructive-foreground h-9 sm:h-10 text-sm"
                                        disabled={!selectedReason || createReport.isPending}
                                    >
                                        {createReport.isPending ? (
                                            <span className="flex items-center gap-2">
                                                <svg
                                                    className="animate-spin h-3.5 w-3.5"
                                                    viewBox="0 0 24 24"
                                                    aria-hidden="true"
                                                >
                                                    <circle
                                                        className="opacity-25"
                                                        cx="12"
                                                        cy="12"
                                                        r="10"
                                                        stroke="currentColor"
                                                        strokeWidth="4"
                                                        fill="none"
                                                    />
                                                    <path
                                                        className="opacity-75"
                                                        fill="currentColor"
                                                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                                    />
                                                </svg>
                                                Submitting...
                                            </span>
                                        ) : (
                                            "Submit Report"
                                        )}
                                    </Button>
                                </div>
                            </div>
                        </motion.div>
                    ) : (
                        <motion.div
                            key="success"
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="py-6 text-center"
                        >
                            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                                <CheckCircle2 className="w-8 h-8 text-primary" aria-hidden="true" />
                            </div>
                            <h3 className="font-display text-xl font-semibold mb-2">
                                Report Submitted
                            </h3>
                            <p className="text-muted-foreground mb-6 max-w-sm mx-auto">
                                Thank you for helping keep our community safe. We'll review your report and take appropriate action.
                            </p>
                            <Button onClick={handleClose} className="gradient-bg border-0" aria-label="Close success dialog">
                                Done
                            </Button>
                        </motion.div>
                    )}
                </AnimatePresence>
            </DialogContent>
        </Dialog>
    );
}
