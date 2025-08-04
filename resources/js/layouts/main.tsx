import Footer from '@/components/footer';
import Header from '@/components/header';
import React from 'react';

const Main: React.FC<React.PropsWithChildren> = ({ children }) => (
    <div className="flex min-h-screen flex-col bg-[var(--background)] text-[var(--foreground)]">
        <a
            href="#main"
            className="sr-only rounded px-3 py-2 focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:bg-white/90 focus:text-black"
        >
            Skip to content
        </a>
        <Header />

        <main id="main" className="flex-1">
            {children}
        </main>

        <Footer />
    </div>
);

export default Main;
