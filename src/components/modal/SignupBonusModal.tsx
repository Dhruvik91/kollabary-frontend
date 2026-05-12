'use client';

import React, { useEffect, useState } from 'react';
import ReactConfetti from 'react-confetti';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Check } from 'lucide-react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { useWindowSize } from '@/hooks/use-window-size';
import { COIN_URL } from '@/constants';

export function SignupBonusModal({
  isOpen,
  onClose,
  amount = 500
}: {
  isOpen: boolean;
  onClose: () => void;
  amount?: number;
}) {
  const [showConfetti, setShowConfetti] = useState(false);
  const { width, height } = useWindowSize();

  useEffect(() => {
    if (isOpen) {
      setShowConfetti(true);
      const timer = setTimeout(() => setShowConfetti(false), 8000); // Stop after 8s
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/60 backdrop-blur-md"
        />

        {/* Confetti Canvas */}
        {showConfetti && (
          <ReactConfetti
            width={width}
            height={height}
            numberOfPieces={200}
            recycle={false}
            colors={['#f59e0b', '#fbbf24', '#ffffff', '#6366f1']}
            style={{ zIndex: 101 }}
          />
        )}

        {/* Modal Content */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className="relative z-[102] w-full max-w-md overflow-hidden rounded-[2.5rem] border border-border/50 bg-background/95 p-6 sm:p-8 shadow-2xl shadow-primary/10 backdrop-blur-2xl"
        >
          {/* Subtle Background Coin Visuals */}
          <div className="absolute -left-16 -bottom-16 z-0 opacity-20 pointer-events-none select-none transform -rotate-12 scale-125 sm:scale-150">
            <Image
              src={COIN_URL}
              alt=""
              width={280}
              height={280}
              className="object-contain"
            />
          </div>
          <div className="absolute -right-12 top-4 z-0 opacity-20 pointer-events-none select-none transform rotate-45 scale-50">
            <Image
              src={COIN_URL}
              alt=""
              width={220}
              height={220}
              className="object-contain"
            />
          </div>

          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute right-6 top-6 z-50 rounded-full bg-muted/50 p-2 text-muted-foreground transition-all hover:bg-muted hover:text-foreground active:scale-95 cursor-pointer"
          >
            <X size={20} />
          </button>

          {/* Text Content */}
          <div className="relative z-10 text-center">
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-foreground">
              Welcome Bonus!
            </h2>
            <p className="mt-3 text-sm sm:text-base font-medium text-muted-foreground leading-relaxed max-w-sm mx-auto">
              You've just received a special arrival gift to kickstart your journey on Kollabary.
            </p>

            {/* Bonus Amount Card */}
            <div className="mt-6 flex items-center justify-center gap-3 rounded-2xl border border-border/50 bg-muted/40 p-5">
              <span className="text-4xl sm:text-5xl font-black text-primary">
                {amount}
              </span>
              <div className="flex flex-col items-start leading-tight">
                <span className="text-base sm:text-lg font-bold text-foreground tracking-widest uppercase">K-Coins</span>
                <span className="text-[10px] sm:text-xs text-muted-foreground font-medium">Added to wallet</span>
              </div>
            </div>

            {/* CTA */}
            <Button
              onClick={onClose}
              size="lg"
              className="mt-6 h-12 sm:h-14 w-full rounded-2xl text-base sm:text-lg font-black shadow-xl shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all"
            >
              Start Exploring
            </Button>

            <p className="mt-4 text-[10px] font-bold text-muted-foreground/60 uppercase tracking-[0.25em]">
              Kollabary • Financial Ecosystem
            </p>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
