'use client';

import React, { useState } from 'react';
import { AnimatedModal } from './AnimatedModal';
import { Button } from '@/components/ui/button';
import { Info, Loader2 } from 'lucide-react';
import { COIN_URL } from '@/constants';
import { motion } from 'framer-motion';
import Image from 'next/image';

interface ActionConsentModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: (dontAskAgain: boolean) => void;
    title: string;
    actionName: string;
    coinCost?: number;
    isLoading?: boolean;
}

export const ActionConsentModal = ({
    isOpen,
    onClose,
    onConfirm,
    title,
    actionName,
    coinCost,
    isLoading = false,
}: ActionConsentModalProps) => {
    const [dontAskAgain, setDontAskAgain] = useState(false);

    return (
        <AnimatedModal
            isOpen={isOpen}
            onClose={onClose}
            title={title}
            size="sm"
        >
            <div className="space-y-8 py-2">
                <div className="flex flex-col items-center text-center gap-6">
                    <div className="relative">
                        <div className="h-24 w-24 rounded-[2.5rem] bg-primary/10 flex items-center justify-center text-primary group overflow-hidden border-2 border-primary/20">
                            <Image 
                                src={COIN_URL} 
                                alt="KC Coin" 
                                width={64}
                                height={64}
                                className="w-16 h-16 object-contain group-hover:scale-110 transition-transform duration-500 drop-shadow-xl" 
                            />
                        </div>
                    </div>

                    <div className="space-y-3">
                        <h3 className="text-xl font-black uppercase tracking-tight text-foreground">
                            Confirm {actionName}
                        </h3>
                        <p className="text-muted-foreground font-medium italic text-balance leading-relaxed">
                            Proceeding with this action will consume{' '}
                            <span className="text-primary font-black not-italic inline-flex items-center gap-1 translate-y-[3px]">
                                {coinCost ?? '...'}
                                <Image 
                                    src={COIN_URL} 
                                    alt="KC Coin" 
                                    width={20}
                                    height={20}
                                    className="w-5 h-5 object-contain" 
                                />
                            </span>{' '}
                            from your wallet.
                        </p>
                    </div>
                </div>

                <div 
                    className="flex items-center gap-3 p-4 bg-muted/30 rounded-2xl border border-border/50 cursor-pointer hover:bg-muted/50 transition-colors group"
                    onClick={() => setDontAskAgain(!dontAskAgain)}
                >
                    <div className={`
                        w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-all duration-300
                        ${dontAskAgain 
                            ? 'bg-primary border-primary shadow-lg shadow-primary/20' 
                            : 'bg-background border-border/50 group-hover:border-primary/50'}
                    `}>
                        {dontAskAgain && (
                            <motion.div
                                initial={{ scale: 0, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                            >
                                <svg 
                                    viewBox="0 0 24 24" 
                                    className="w-4 h-4 fill-none stroke-white stroke-[4] stroke-[round]"
                                >
                                    <polyline points="20 6 9 17 4 12" />
                                </svg>
                            </motion.div>
                        )}
                    </div>
                    <span className="text-sm font-bold text-foreground/80">Don&apos;t ask me again for this action</span>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 pt-2">
                    <Button
                        variant="outline"
                        onClick={onClose}
                        className="flex-1 h-14 rounded-2xl font-black uppercase tracking-widest border-border/50 hover:bg-muted transition-all"
                        disabled={isLoading}
                    >
                        Cancel
                    </Button>
                    <Button
                        onClick={() => onConfirm(dontAskAgain)}
                        className="flex-1 h-14 rounded-2xl font-black uppercase tracking-widest bg-primary text-primary-foreground shadow-xl shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all"
                        disabled={isLoading}
                    >
                        {isLoading ? (
                            <Loader2 className="h-5 w-5 animate-spin" />
                        ) : (
                            'Confirm & Proceed'
                        )}
                    </Button>
                </div>
            </div>
        </AnimatedModal>
    );
};
