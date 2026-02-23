'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CollaborationStatusBadge } from '@/components/collaboration/CollaborationStatusBadge';
import { Collaboration } from '@/types/collaboration.types';
import { format } from 'date-fns';
import { Calendar, Clock, FileText, CheckCircle2, Link as LinkIcon, ExternalLink, Upload } from 'lucide-react';

interface CollaborationMainInfoProps {
    collaboration: Collaboration;
    canSubmitProof?: boolean;
    onUpdateProof?: () => void;
}

export const CollaborationMainInfo = ({
    collaboration,
    canSubmitProof = false,
    onUpdateProof
}: CollaborationMainInfoProps) => {
    return (
        <Card className="border border-border/40 shadow-xl bg-card/40 backdrop-blur-xl backdrop-saturate-150 overflow-hidden border-t-4 border-t-primary rounded-3xl">
            <CardHeader className="pb-4">
                <div className="flex justify-between items-start mb-4">
                    <CollaborationStatusBadge status={collaboration.status} className="scale-110" />
                    <span className="text-sm text-muted-foreground flex items-center gap-1.5">
                        <Clock size={14} />
                        Created {format(new Date(collaboration.createdAt), 'MMM d, yyyy')}
                    </span>
                </div>
                <CardTitle className="text-3xl font-extrabold tracking-tight">
                    {collaboration.title}
                </CardTitle>
            </CardHeader>
            <CardContent className="space-y-8">
                <div>
                    <h3 className="text-sm font-bold uppercase tracking-widest text-primary mb-3 flex items-center gap-2">
                        <FileText size={16} />
                        Campaign Description
                    </h3>
                    <p className="text-muted-foreground leading-relaxed text-lg">
                        {collaboration.description || 'No description provided.'}
                    </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
                    <div className="space-y-4 p-5 bg-muted/30 rounded-2xl border border-border/50">
                        <h3 className="text-sm font-bold uppercase tracking-widest text-muted-foreground mb-1">Timeline</h3>
                        <div className="flex items-center gap-3 text-foreground font-medium">
                            <Calendar className="text-primary" size={20} />
                            <span>
                                {collaboration.startDate ? format(new Date(collaboration.startDate), 'MMM d, yyyy') : 'TBD'} -
                                {collaboration.endDate ? format(new Date(collaboration.endDate), 'MMM d, yyyy') : 'TBD'}
                            </span>
                        </div>
                    </div>
                    <div className="space-y-4 p-5 bg-muted/30 rounded-2xl border border-border/50">
                        <h3 className="text-sm font-bold uppercase tracking-widest text-muted-foreground mb-1">Proposed Terms</h3>
                        <div className="text-foreground font-medium text-sm">
                            {collaboration.proposedTerms ?
                                (typeof collaboration.proposedTerms === 'object' ?
                                    (collaboration.proposedTerms as any).details || JSON.stringify(collaboration.proposedTerms) :
                                    collaboration.proposedTerms) :
                                'Standard terms apply'}
                        </div>
                    </div>
                </div>

                {(collaboration.proofUrls && collaboration.proofUrls.length > 0 || canSubmitProof) && (
                    <div className="pt-8 border-t border-border/50 animate-in fade-in slide-in-from-bottom-4 duration-500">
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="text-sm font-bold uppercase tracking-widest text-primary flex items-center gap-2">
                                <CheckCircle2 className="text-emerald-500" size={16} />
                                Proof of Completion
                            </h3>
                            {canSubmitProof && collaboration.proofUrls && collaboration.proofUrls.length > 0 && (
                                <Button
                                    onClick={onUpdateProof}
                                    variant="outline"
                                    size="sm"
                                    className="rounded-xl border-emerald-500/20 text-emerald-600 hover:bg-emerald-50 relative group overflow-hidden"
                                >
                                    <span className="relative z-10 flex items-center gap-2">
                                        <Upload size={14} />
                                        Update Proof
                                    </span>
                                </Button>
                            )}
                        </div>

                        {collaboration.proofUrls && collaboration.proofUrls.length > 0 ? (
                            <div className="grid grid-cols-1 gap-3">
                                {collaboration.proofUrls.map((url, index) => (
                                    <a
                                        key={index}
                                        href={url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center justify-between p-4 bg-emerald-500/5 rounded-2xl border border-emerald-500/10 hover:bg-emerald-500/10 hover:border-emerald-500/20 transition-all group"
                                    >
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-500 group-hover:scale-110 transition-transform">
                                                <LinkIcon size={18} />
                                            </div>
                                            <div className="max-w-[150px] sm:max-w-md lg:max-w-xl overflow-hidden text-ellipsis whitespace-nowrap">
                                                <span className="text-sm font-semibold text-foreground group-hover:text-emerald-600 transition-colors">
                                                    {url}
                                                </span>
                                            </div>
                                        </div>
                                        <ExternalLink size={16} className="text-muted-foreground group-hover:text-emerald-500 transition-colors" />
                                    </a>
                                ))}
                            </div>
                        ) : canSubmitProof ? (
                            <button
                                onClick={onUpdateProof}
                                className="w-full flex flex-col items-center justify-center p-8 bg-emerald-500/5 border-2 border-dashed border-emerald-500/20 rounded-3xl hover:bg-emerald-500/10 hover:border-emerald-500/40 transition-all group"
                            >
                                <div className="w-16 h-16 rounded-2xl bg-emerald-500/10 flex items-center justify-center text-emerald-500 mb-4 group-hover:scale-110 transition-transform">
                                    <Upload size={32} />
                                </div>
                                <h4 className="text-lg font-bold text-foreground mb-1">Upload Proof</h4>
                                <p className="text-muted-foreground text-sm max-w-[250px]">
                                    Share links to the completed work as proof of successful collaboration.
                                </p>
                            </button>
                        ) : null}

                        {collaboration.proofSubmittedAt && (
                            <p className="text-[10px] text-muted-foreground mt-4 flex items-center gap-1 px-1">
                                <Clock size={10} />
                                Last updated on {format(new Date(collaboration.proofSubmittedAt), 'MMMM d, yyyy h:mm a')}
                            </p>
                        )}
                    </div>
                )}
            </CardContent>
        </Card>
    );
};
