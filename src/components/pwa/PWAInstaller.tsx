'use client';

import { useEffect, useState } from 'react';
import { registerServiceWorker, listenForSWUpdates } from '@/lib/pwa-register';
import { Button } from '@/components/ui/button';
import { Download, X, Share2, PlusSquare, ArrowUp, Smartphone } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const PWAInstaller = () => {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [showInstallPrompt, setShowInstallPrompt] = useState(false);
  const [isIOS, setIsIOS] = useState(false);
  const [isStandalone, setIsStandalone] = useState(false);

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

    const isLocalhost = Boolean(process.env.NEXT_PUBLIC_MODE === "dev");
    const standalone = checkStandalone();
    const ios = checkIOS();

    if (isLocalhost || standalone) {
      return;
    }

    // Register service worker
    registerServiceWorker();
    listenForSWUpdates();

    // Show prompt for iOS users after a short delay
    if (ios && !standalone) {
      const dismissed = localStorage.getItem('pwa-install-dismissed');
      if (!dismissed) {
        const timer = setTimeout(() => setShowInstallPrompt(true), 3000);
        return () => clearTimeout(timer);
      }
    }

    // Listen for install prompt (Android/Chrome)
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setShowInstallPrompt(true);
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
      console.log('User accepted the install prompt');
    }

    setDeferredPrompt(null);
    setShowInstallPrompt(false);
  };

  const handleDismiss = () => {
    setShowInstallPrompt(false);
    // Store dismissal in localStorage to not show again for 7 days
    localStorage.setItem('pwa-install-dismissed', Date.now().toString());
  };

  // Check if user dismissed recently
  useEffect(() => {
    const dismissed = localStorage.getItem('pwa-install-dismissed');
    if (dismissed) {
      const dismissedTime = parseInt(dismissed);
      const sevenDays = 7 * 24 * 60 * 60 * 1000;
      if (Date.now() - dismissedTime < sevenDays) {
        setShowInstallPrompt(false);
      }
    }
  }, []);

  if (isStandalone) return null;

  return (
    <AnimatePresence>
      {showInstallPrompt && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 max-w-sm w-full mx-4"
        >
          <div className="bg-background/80 border border-primary/20 rounded-3xl shadow-[0_8px_32px_rgba(255,87,34,0.15)] p-5 backdrop-blur-2xl">
            <div className="flex flex-col gap-4">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-primary/10 flex items-center justify-center shrink-0">
                    <Smartphone className="text-primary" size={20} />
                  </div>
                  <div>
                    <h3 className="font-bold text-base leading-none mb-1">Install Kollabary</h3>
                    <p className="text-xs text-muted-foreground">Add to home screen for fast access</p>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  onClick={handleDismiss}
                  className="h-8 w-8 rounded-full hover:bg-muted p-0"
                >
                  <X size={16} />
                </Button>
              </div>

              {isIOS ? (
                <div className="bg-muted/50 rounded-2xl p-4 flex flex-col gap-3">
                  <p className="text-xs text-foreground/80 leading-relaxed font-medium">
                    To install on iPhone/iPad:
                  </p>
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-3 text-xs">
                      <div className="w-7 h-7 rounded-lg bg-background flex items-center justify-center border border-border">
                        <Share2 size={14} className="text-primary" />
                      </div>
                      <span>Tap the <span className="font-bold">Share</span> button in Safari</span>
                    </div>
                    <div className="flex items-center gap-3 text-xs">
                      <div className="w-7 h-7 rounded-lg bg-background flex items-center justify-center border border-border">
                        <PlusSquare size={14} className="text-primary" />
                      </div>
                      <span>Select <span className="font-bold">Add to Home Screen</span></span>
                    </div>
                  </div>
                </div>
              ) : (
                <Button
                  onClick={handleInstallClick}
                  className="w-full rounded-2xl font-bold py-6 bg-primary hover:bg-primary/90 text-white shadow-lg shadow-primary/20 group"
                >
                  <Download className="mr-2 group-hover:translate-y-0.5 transition-transform" size={18} />
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
