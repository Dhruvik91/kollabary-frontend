'use client';

import React, { useState, useCallback } from 'react';
import { PopupModal } from 'react-calendly';

const CALENDLY_URL = process.env.NEXT_PUBLIC_CALENDLY_URL
    || 'https://calendly.com/dhruvikgondaliya91/30min?primary_color=ff0074';

interface CalendlyModalProps {
    /** Render prop — receives an `open` callback to trigger the modal */
    children: (open: () => void) => React.ReactNode;
}

/**
 * CalendlyModal
 * A lightweight, modular wrapper around `react-calendly`'s PopupModal.
 * Usage:
 *   <CalendlyModal>
 *     {(open) => <button onClick={open}>Book a Demo</button>}
 *   </CalendlyModal>
 */
export const CalendlyModal: React.FC<CalendlyModalProps> = ({ children }) => {
    const [isOpen, setIsOpen] = useState(false);

    const handleOpen = useCallback(() => setIsOpen(true), []);
    const handleClose = useCallback(() => setIsOpen(false), []);

    return (
        <>
            {children(handleOpen)}

            {/* PopupModal requires document.body as the root element */}
            {typeof window !== 'undefined' && (
                <PopupModal
                    url={CALENDLY_URL}
                    onModalClose={handleClose}
                    open={isOpen}
                    rootElement={document.body}
                />
            )}
        </>
    );
};
