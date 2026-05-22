'use client';

import { useEffect, useRef, useState } from 'react';
import { useDebounce } from './use-debounce';

export type DraftSaveStatus = 'idle' | 'saving' | 'saved' | 'error';

const DRAFT_EXPIRY_MS = 7 * 24 * 60 * 60 * 1000; // 7 days

interface DraftPayload<T> {
    data: T;
    savedAt: number;
}

interface UseAutoSaveDraftOptions<T> {
    /** localStorage key to persist the draft under */
    key: string;
    /** Current form data to watch */
    data: T;
    /** Debounce delay in ms (default: 800) */
    delay?: number;
    /** Whether the hook is active. Useful to disable during edit mode where data is pre-loaded from the server. */
    enabled?: boolean;
}

interface UseAutoSaveDraftReturn<T> {
    /** Retrieve the persisted draft, or null if absent / expired */
    getDraft: () => T | null;
    /** Manually clear the draft (e.g. after a successful submit) */
    clearDraft: () => void;
    /** Current save status for UI feedback */
    saveStatus: DraftSaveStatus;
}

/**
 * Auto-saves form data to localStorage using a debounced write.
 * - Uses the project's existing `useDebounce` hook — no external lodash required.
 * - Skips writes when the serialized value hasn't changed.
 * - Attaches an expiry timestamp and discards drafts older than 7 days.
 * - Only runs in the browser (safe for Next.js App Router SSR).
 */
export function useAutoSaveDraft<T>({
    key,
    data,
    delay = 800,
    enabled = true,
}: UseAutoSaveDraftOptions<T>): UseAutoSaveDraftReturn<T> {
    const [saveStatus, setSaveStatus] = useState<DraftSaveStatus>('idle');
    const previousSerializedRef = useRef<string>('');
    const saveStatusTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    // Prevents overwriting an existing draft with the form's empty defaultValues
    // on the very first render, before the restore effect has had a chance to run.
    const isFirstRunRef = useRef(true);

    // Debounce the incoming data so we don't write on every keystroke
    const debouncedData = useDebounce(data, delay);

    useEffect(() => {
        if (!enabled) return;

        // Always skip the very first execution.
        // React runs effects in declaration order within a component.
        // useAutoSaveDraft's effect fires BEFORE the restore useEffect in the
        // consuming component, so without this guard we would overwrite the
        // real localStorage draft with the form's empty defaultValues on mount.
        //
        // CRITICAL: also seed previousSerializedRef here so that when
        // useDebounce's timer fires ~800ms later with the same empty values
        // (a new object reference but identical content), the JSON comparison
        // below returns equal and we skip the write instead of saving empty values.
        if (isFirstRunRef.current) {
            isFirstRunRef.current = false;
            previousSerializedRef.current = JSON.stringify(debouncedData);
            return;
        }

        const serialized = JSON.stringify(debouncedData);

        // Skip if nothing changed
        if (serialized === previousSerializedRef.current) return;

        setSaveStatus('saving');

        try {
            const payload: DraftPayload<T> = {
                data: debouncedData,
                savedAt: Date.now(),
            };
            localStorage.setItem(key, JSON.stringify(payload));
            previousSerializedRef.current = serialized;
            setSaveStatus('saved');
        } catch (err) {
            console.error('[useAutoSaveDraft] Failed to save draft:', err);
            setSaveStatus('error');
        }

        // Reset back to idle after 2.5 s so the indicator fades away
        if (saveStatusTimerRef.current) clearTimeout(saveStatusTimerRef.current);
        saveStatusTimerRef.current = setTimeout(() => setSaveStatus('idle'), 2500);
    }, [debouncedData, key, enabled]);

    // Cleanup timer on unmount
    useEffect(() => {
        return () => {
            if (saveStatusTimerRef.current) clearTimeout(saveStatusTimerRef.current);
        };
    }, []);

    const getDraft = (): T | null => {
        if (typeof window === 'undefined') return null;

        try {
            const raw = localStorage.getItem(key);
            if (!raw) return null;

            const payload: DraftPayload<T> = JSON.parse(raw);

            // Discard stale drafts
            if (Date.now() - payload.savedAt > DRAFT_EXPIRY_MS) {
                localStorage.removeItem(key);
                return null;
            }

            return payload.data;
        } catch {
            return null;
        }
    };

    const clearDraft = () => {
        if (typeof window === 'undefined') return;
        try {
            localStorage.removeItem(key);
            previousSerializedRef.current = '';
            setSaveStatus('idle');
        } catch (err) {
            console.error('[useAutoSaveDraft] Failed to clear draft:', err);
        }
    };

    return { getDraft, clearDraft, saveStatus };
}
