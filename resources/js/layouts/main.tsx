import Footer from '@/components/footer';
import Header from '@/components/header';
import { router } from '@inertiajs/react';
import React, { useEffect, useState } from 'react';

const Main: React.FC<React.PropsWithChildren> = ({ children }) => {
    const [isNavigating, setIsNavigating] = useState(false);
    const [navigationError, setNavigationError] = useState<string | null>(null);

    useEffect(() => {
        const removeStart = router.on('start', () => {
            setIsNavigating(true);
            setNavigationError(null);
        });

        const removeFinish = router.on('finish', () => {
            setIsNavigating(false);
        });

        const removeInvalid = router.on('invalid', () => {
            setIsNavigating(false);
            setNavigationError('The page could not be loaded. Please try again.');
        });

        const removeException = router.on('exception', () => {
            setIsNavigating(false);
            setNavigationError('An unexpected error occurred while loading the page.');
        });

        return () => {
            removeStart();
            removeFinish();
            removeInvalid();
            removeException();
        };
    }, []);

    return (
        <div className="flex min-h-screen flex-col bg-[var(--background)] text-[var(--foreground)]">
            <a
                href="#main"
                className="sr-only rounded px-3 py-2 focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:bg-white/90 focus:text-black"
            >
                Skip to content
            </a>
            <Header />

            {isNavigating && (
                <div className="border-b border-indigo-200 bg-indigo-50 px-6 py-2 text-sm text-indigo-700 dark:border-indigo-900 dark:bg-indigo-950/30 dark:text-indigo-300">
                    Loading page...
                </div>
            )}

            {navigationError && (
                <div className="border-b border-red-200 bg-red-50 px-6 py-2 text-sm text-red-700 dark:border-red-900 dark:bg-red-950/30 dark:text-red-300">
                    {navigationError}
                </div>
            )}

            <main id="main" className="flex-1">
                {children}
            </main>

            <Footer />
        </div>
    );
};

export default Main;
