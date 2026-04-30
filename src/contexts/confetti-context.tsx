'use client';

import React, { createContext, useContext, useState, useCallback } from 'react';
import ConfettiEffect from '@/components/shared/ConfettiEffect';

interface ConfettiOptions {
    numberOfPieces?: number;
    duration?: number;
    colors?: string[];
}

interface ConfettiContextType {
    triggerConfetti: (options?: ConfettiOptions) => void;
}

const ConfettiContext = createContext<ConfettiContextType | undefined>(undefined);

export const ConfettiProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [isActive, setIsActive] = useState(false);
    const [options, setOptions] = useState<ConfettiOptions>({});

    const triggerConfetti = useCallback((newOptions: ConfettiOptions = {}) => {
        setOptions(newOptions);
        setIsActive(true);
        
        // Auto-disable after a certain duration
        const duration = newOptions.duration || 5000;
        setTimeout(() => {
            setIsActive(false);
        }, duration);
    }, []);

    return (
        <ConfettiContext.Provider value={{ triggerConfetti }}>
            {children}
            {isActive && (
                <ConfettiEffect
                    recycle={false}
                    numberOfPieces={options.numberOfPieces || 200}
                    colors={options.colors}
                    onConfettiComplete={() => setIsActive(false)}
                />
            )}
        </ConfettiContext.Provider>
    );
};

export const useConfetti = () => {
    const context = useContext(ConfettiContext);
    if (context === undefined) {
        throw new Error('useConfetti must be used within a ConfettiProvider');
    }
    return context;
};
