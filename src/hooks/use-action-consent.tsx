'use client';

import React, { useState, useCallback, useMemo } from 'react';
import { CONSENT_STORAGE_KEYS } from '@/constants';
import { ActionConsentModal } from '@/components/modal/ActionConsentModal';
import { useKCSettings } from '@/hooks/use-kc-settings.hooks';
import { KCSettingKey } from '@/services/kc-setting.service';

export type ConsentActionType = 'AUCTION_CREATE' | 'BID_PLACE' | 'COLLAB_REQUEST';

interface UseActionConsentProps {
    actionType: ConsentActionType;
    title?: string;
    actionName?: string;
}

export function useActionConsent({
    actionType,
    title = 'Coin Usage Confirmation',
    actionName,
}: UseActionConsentProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [pendingAction, setPendingAction] = useState<{ fn: () => void } | null>(null);
    const { data: settings } = useKCSettings();

    // Map ActionType to KCSettingKey
    const settingKey = useMemo(() => {
        switch (actionType) {
            case 'AUCTION_CREATE': return KCSettingKey.AUCTION_CREATION_PRICE;
            case 'BID_PLACE': return KCSettingKey.BID_PLACEMENT_PRICE;
            case 'COLLAB_REQUEST': return KCSettingKey.COLLABORATION_CREATION_PRICE;
            default: return null;
        }
    }, [actionType]);

    // Get the actual price from settings
    const coinCost = useMemo(() => {
        if (!settings || !settingKey) return undefined;
        const setting = settings.find(s => s.key === settingKey);
        return setting ? setting.value : undefined;
    }, [settings, settingKey]);

    const defaultActionName = useMemo(() => {
        switch (actionType) {
            case 'AUCTION_CREATE': return 'Create Auction';
            case 'BID_PLACE': return 'Place Bid';
            case 'COLLAB_REQUEST': return 'Send Request';
            default: return 'Action';
        }
    }, [actionType]);

    const storageKey = CONSENT_STORAGE_KEYS[actionType];

    const checkConsent = useCallback(() => {
        if (typeof window === 'undefined') return true;
        const consent = localStorage.getItem(storageKey);
        return consent === 'true';
    }, [storageKey]);

    const executeWithConsent = useCallback((actionFn: () => void) => {
        if (checkConsent()) {
            actionFn();
        } else {
            setPendingAction({ fn: actionFn });
            setIsOpen(true);
        }
    }, [checkConsent]);

    const handleConfirm = useCallback((dontAskAgain: boolean) => {
        if (dontAskAgain && typeof window !== 'undefined') {
            localStorage.setItem(storageKey, 'true');
        }
        
        if (pendingAction) {
            pendingAction.fn();
            setPendingAction(null);
        }
        setIsOpen(false);
    }, [pendingAction, storageKey]);

    const handleClose = useCallback(() => {
        setIsOpen(false);
        setPendingAction(null);
    }, []);

    const ConsentModalElement = (
        <ActionConsentModal
            isOpen={isOpen}
            onClose={handleClose}
            onConfirm={handleConfirm}
            title={title}
            actionName={actionName || defaultActionName}
            coinCost={coinCost}
        />
    );

    return {
        executeWithConsent,
        ConsentModalElement,
        isOpen
    };
}
