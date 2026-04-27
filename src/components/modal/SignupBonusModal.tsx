'use client';

import React, { useEffect, useState } from 'react';
import ReactConfetti from 'react-confetti';
import { motion, AnimatePresence } from 'framer-motion';
import { Coins, X, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useWindowSize } from '@/hooks/use-window-size';

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
          className="relative z-[102] w-full max-w-md overflow-hidden rounded-[2.5rem] border border-white/10 bg-zinc-900/90 p-8 shadow-2xl shadow-indigo-500/20 backdrop-blur-2xl"
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute right-6 top-6 rounded-full bg-white/5 p-2 text-white/40 transition-colors hover:bg-white/10 hover:text-white"
          >
            <X size={20} />
          </button>

          {/* Icon/Visual Header */}
          <div className="relative mb-6 flex justify-center">
            <div className="absolute inset-0 blur-2xl animate-pulse">
                <div className="h-20 w-20 mx-auto rounded-full bg-indigo-500/30" />
            </div>
            <div className="relative flex h-24 w-24 items-center justify-center rounded-3xl bg-gradient-to-br from-indigo-500 to-purple-600 shadow-xl shadow-indigo-500/40 transform rotate-12 group">
              <Coins size={48} className="text-white animate-bounce" />
              <div className="absolute -right-2 -top-2 flex h-8 w-8 items-center justify-center rounded-full bg-emerald-500 border-4 border-zinc-900 text-white">
                <Check size={16} strokeWidth={4} />
              </div>
            </div>
          </div>

          {/* Text Content */}
          <div className="text-center">
            <h2 className="text-3xl font-black tracking-tight text-white sm:text-4xl">
              Welcome Bonus!
            </h2>
            <p className="mt-4 text-lg font-medium text-zinc-400">
              You've just received a special arrival gift to kickstart your journey on Kollabary.
            </p>

            {/* Bonus Amount Card */}
            <div className="mt-8 flex items-center justify-center gap-3 rounded-2xl border border-white/5 bg-white/5 p-6">
              <span className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-yellow-400 to-amber-500">
                {amount}
              </span>
              <div className="flex flex-col items-start leading-tight">
                <span className="text-xl font-bold text-white tracking-widest uppercase">K-Coins</span>
                <span className="text-xs text-zinc-500 font-medium">Added to wallet</span>
              </div>
            </div>

            {/* CTA */}
            <Button
              onClick={onClose}
              size="lg"
              className="mt-8 h-14 w-full rounded-2xl bg-white text-lg font-black text-black hover:bg-white/90 active:scale-95 transition-all shadow-xl shadow-white/10"
            >
              Start Exploring
            </Button>
            
            <p className="mt-4 text-xs font-medium text-zinc-500 uppercase tracking-[0.2em]">
              Kollabary • Financial Ecosystem
            </p>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
