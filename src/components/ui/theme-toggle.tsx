'use client';

import * as React from 'react';
import { Moon, Sun, Monitor } from 'lucide-react';
import { useTheme } from 'next-themes';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';

export function ThemeToggle() {
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = React.useState(false);

    // Avoid hydration mismatch
    React.useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return (
            <Button variant="ghost" size="icon" className="w-9 h-9 rounded-xl opacity-0">
                <div className="w-5 h-5" />
            </Button>
        );
    }

    const toggleTheme = () => {
        if (theme === 'light') setTheme('dark');
        else if (theme === 'dark') setTheme('system');
        else setTheme('light');
    };

    return (
        <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            className="w-9 h-9 rounded-xl hover:bg-accent/50 transition-colors relative overflow-hidden"
            title={`Current theme: ${theme}. Click to cycle.`}
        >
            <AnimatePresence mode="wait" initial={false}>
                {theme === 'light' && (
                    <motion.div
                        key="sun"
                        initial={{ y: 20, opacity: 0, rotate: -45 }}
                        animate={{ y: 0, opacity: 1, rotate: 0 }}
                        exit={{ y: -20, opacity: 0, rotate: 45 }}
                        transition={{ duration: 0.2, ease: 'easeInOut' }}
                    >
                        <Sun className="h-5 w-5 text-amber-500" />
                    </motion.div>
                )}
                {theme === 'dark' && (
                    <motion.div
                        key="moon"
                        initial={{ y: 20, opacity: 0, rotate: -45 }}
                        animate={{ y: 0, opacity: 1, rotate: 0 }}
                        exit={{ y: -20, opacity: 0, rotate: 45 }}
                        transition={{ duration: 0.2, ease: 'easeInOut' }}
                    >
                        <Moon className="h-5 w-5 text-blue-400" />
                    </motion.div>
                )}
                {theme === 'system' && (
                    <motion.div
                        key="monitor"
                        initial={{ y: 20, opacity: 0, rotate: -45 }}
                        animate={{ y: 0, opacity: 1, rotate: 0 }}
                        exit={{ y: -20, opacity: 0, rotate: 45 }}
                        transition={{ duration: 0.2, ease: 'easeInOut' }}
                    >
                        <Monitor className="h-5 w-5 text-muted-foreground" />
                    </motion.div>
                )}
            </AnimatePresence>
        </Button>
    );
}
