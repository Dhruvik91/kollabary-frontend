"use client";

export function Footer() {
    return (
        <footer className="py-8 px-6 border-t border-border mt-auto">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                <p className="text-xs text-muted-foreground italic">
                    Elevating the influencer marketplace experience.
                </p>
                <p className="text-xs text-muted-foreground">
                    © {new Date().getFullYear()} Kollabary. All rights reserved.
                </p>
            </div>
        </footer>
    );
}
