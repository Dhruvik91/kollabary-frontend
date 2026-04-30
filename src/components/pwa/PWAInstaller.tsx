'use client';

import { useEffect, useState } from 'react';
import { registerServiceWorker, listenForSWUpdates } from '@/lib/pwa-register';
import { Button } from '@/components/ui/button';
import { Download, X, Share2, PlusSquare, ArrowUp, Smartphone } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { PWA_STORAGE_KEYS } from '@/constants';

export const PWAInstaller = () => {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [showInstallPrompt, setShowInstallPrompt] = useState(false);
  const [isIOS, setIsIOS] = useState(false);
  const [isStandalone, setIsStandalone] = useState(false);

  const isDismissedRecently = () => {
    const dismissed = localStorage.getItem(PWA_STORAGE_KEYS.INSTALL_DISMISSED);
    if (!dismissed) return false;
    const dismissedTime = parseInt(dismissed);
    const fifteenDays = 15 * 24 * 60 * 60 * 1000;
    return (Date.now() - dismissedTime < fifteenDays);
  };

  useEffect(() => {
    // Check if running in standalone mode
    const checkStandalone = () => {
      const isStandaloneMode = window.matchMedia('(display-mode: standalone)').matches || 
                             (window.navigator as any).standalone === true;
      setIsStandalone(isStandaloneMode);
      return isStandaloneMode;
    };

    // Check for iOS
    const checkIOS = () => {
      const isIOSDevice = /iPad|iPhone|iPod/.test(navigator.userAgent) && !(window as any).MSStream;
      setIsIOS(isIOSDevice);
      return isIOSDevice;
    };

    const standalone = checkStandalone();
    const ios = checkIOS();

    if (standalone || isDismissedRecently()) {
      return;
    }

    // Register service worker
    registerServiceWorker();
    listenForSWUpdates();

    // Show prompt for iOS users after a short delay
    if (ios && !standalone) {
      const timer = setTimeout(() => setShowInstallPrompt(true), 3000);
      return () => clearTimeout(timer);
    }

    // Listen for install prompt (Android/Chrome)
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      // Double check dismissal just in case it was dismissed while the app was open
      if (!isDismissedRecently()) {
        setDeferredPrompt(e);
        setShowInstallPrompt(true);
      }
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;

    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;

    if (outcome === 'accepted') {
      localStorage.setItem(PWA_STORAGE_KEYS.INSTALLED, 'true');
    }

    setDeferredPrompt(null);
    setShowInstallPrompt(false);
  };

  const handleDismiss = () => {
    setShowInstallPrompt(false);
    // Store dismissal in localStorage to not show again for 15 days
    localStorage.setItem(PWA_STORAGE_KEYS.INSTALL_DISMISSED, Date.now().toString());
  };

  if (isStandalone) return null;

  return (
    <AnimatePresence>
      {showInstallPrompt && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="fixed bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 z-[100] w-full px-4 sm:px-0 sm:max-w-sm"
        >
          <div className="bg-background/95 border border-primary/20 rounded-[2rem] sm:rounded-3xl shadow-[0_8px_32px_rgba(255,87,34,0.15)] p-4 sm:p-5 backdrop-blur-2xl">
            <div className="flex flex-col gap-3 sm:gap-4">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-2 sm:gap-3">
                  <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl sm:rounded-2xl bg-primary/10 flex items-center justify-center shrink-0">
                    <Smartphone className="text-primary" size={18} />
                  </div>
                  <div className="min-w-0">
                    <h3 className="font-bold text-sm sm:text-base leading-none mb-1 truncate">Install Kollabary</h3>
                    <p className="text-[10px] sm:text-xs text-muted-foreground truncate">Add to home screen for fast access</p>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  onClick={handleDismiss}
                  className="h-7 w-7 sm:h-8 sm:w-8 rounded-full hover:bg-muted p-0 shrink-0"
                >
                  <X size={14} className="sm:size-4" />
                </Button>
              </div>

              {isIOS ? (
                <div className="bg-muted/50 rounded-xl sm:rounded-2xl p-3 sm:p-4 flex flex-col gap-2 sm:gap-3">
                  <p className="text-[11px] sm:text-xs text-foreground/80 leading-relaxed font-medium">
                    To install on iPhone/iPad:
                  </p>
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-2 sm:gap-3 text-[10px] sm:text-xs">
                      <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-lg bg-background flex items-center justify-center border border-border shrink-0">
                        <Share2 size={12} className="text-primary sm:size-3.5" />
                      </div>
                      <span className="leading-tight">Tap the <span className="font-bold">Share</span> button in Safari</span>
                    </div>
                    <div className="flex items-center gap-2 sm:gap-3 text-[10px] sm:text-xs">
                      <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-lg bg-background flex items-center justify-center border border-border shrink-0">
                        <PlusSquare size={12} className="text-primary sm:size-3.5" />
                      </div>
                      <span className="leading-tight">Select <span className="font-bold">Add to Home Screen</span></span>
                    </div>
                  </div>
                </div>
              ) : (
                <Button
                  onClick={handleInstallClick}
                  className="w-full rounded-xl sm:rounded-2xl font-bold py-4 sm:py-6 bg-primary hover:bg-primary/90 text-white shadow-lg shadow-primary/20 group text-sm sm:text-base"
                >
                  <Download className="mr-2 group-hover:translate-y-0.5 transition-transform" size={16} />
                  Install App
                </Button>
              )}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
