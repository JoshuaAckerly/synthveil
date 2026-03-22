import navigation, { adminNavigation, NavigationItem } from '@/data/navigation';
import NotificationBell from '@/components/NotificationBell';
import { Link } from '@inertiajs/react';
import { Dialog, DialogPanel } from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import React, { useState } from 'react';

const Logo: React.FC<{ className?: string }> = ({ className }) => (
    <img alt="Synth Veil" src="/images/Firefly_bc9b3488-523c-48e2-8e16-906e0d9467f0.svg" className={`h-10 w-auto ${className || ''}`} />
);

const Header: React.FC = () => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    return (
        <header className="sticky top-0 z-50 border-b border-gray-200 bg-white/60 backdrop-blur-sm dark:border-white/5 dark:bg-[var(--foreground)]/60">
            <div className="mx-auto max-w-7xl px-6">
                <nav className="flex h-16 items-center justify-between" aria-label="Global">
                    <Link href="/" className="flex items-center gap-3">
                        <Logo />
                        <span className="text-lg font-semibold dark:text-white">Synth Veil</span>
                    </Link>

                    <div className="hidden lg:flex lg:items-center lg:gap-8">
                        {navigation.map((item: NavigationItem) => (
                            <Link key={item.name} href={item.href} className="text-sm font-medium text-gray-700 hover:text-gray-900 dark:text-white">
                                {item.name}
                            </Link>
                        ))}
                        <span className="text-gray-300 dark:text-gray-600">|</span>
                        {adminNavigation.map((item: NavigationItem) => (
                            <Link
                                key={item.name}
                                href={item.href}
                                className="text-sm font-medium text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                            >
                                {item.name}
                            </Link>
                        ))}
                    </div>

                    <div className="flex items-center gap-4">
                        <NotificationBell />
                        <a
                            href="#"
                            className="hidden items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white hover:bg-indigo-700 sm:inline-flex"
                        >
                            Get tickets
                        </a>
                        <button
                            type="button"
                            onClick={() => setMobileMenuOpen(true)}
                            className="-mr-2 inline-flex items-center rounded-md p-2 text-gray-700 lg:hidden dark:text-gray-200"
                            aria-label="Open menu"
                        >
                            <Bars3Icon aria-hidden="true" className="h-6 w-6" />
                        </button>
                    </div>
                </nav>
            </div>

            <Dialog open={mobileMenuOpen} onClose={setMobileMenuOpen} className="lg:hidden">
                <div className="fixed inset-0 z-50 bg-black/40" aria-hidden="true" />
                <DialogPanel className="fixed top-0 right-0 z-50 h-full w-full max-w-sm overflow-y-auto bg-white p-6 dark:bg-[var(--foreground)]">
                    <div className="flex items-center justify-between">
                        <Link href="/" className="flex items-center gap-3" onClick={() => setMobileMenuOpen(false)}>
                            <Logo className="h-8" />
                            <span className="font-semibold">Synth Veil</span>
                        </Link>
                        <button onClick={() => setMobileMenuOpen(false)} aria-label="Close menu" className="p-2">
                            <XMarkIcon className="h-6 w-6 text-gray-700 dark:text-gray-200" />
                        </button>
                    </div>

                    <div className="mt-8 space-y-4">
                        {navigation.map((item) => (
                            <Link
                                key={item.name}
                                href={item.href}
                                onClick={() => setMobileMenuOpen(false)}
                                className="block rounded-md px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-50 dark:text-white dark:hover:bg-white/5"
                            >
                                {item.name}
                            </Link>
                        ))}
                        <div className="mt-6 border-t border-gray-200 pt-4 dark:border-gray-700">
                            {adminNavigation.map((item) => (
                                <Link
                                    key={item.name}
                                    href={item.href}
                                    onClick={() => setMobileMenuOpen(false)}
                                    className="block rounded-md px-3 py-2 text-base font-medium text-gray-500 hover:bg-gray-50 dark:text-gray-400 dark:hover:bg-white/5"
                                >
                                    {item.name}
                                </Link>
                            ))}
                        </div>
                    </div>
                </DialogPanel>
            </Dialog>
        </header>
    );
};

export default Header;
