'use client';

import Main from '@/layouts/main';
import { Button } from '@/components/ui/button';

export default function Welcome() {
    return (
        <>
            <Main>
                <div className="bg-transparent">
                    <div className="mx-auto max-w-3xl px-6 py-24 text-center">
                        <p className="inline-block rounded-full bg-gradient-to-r from-indigo-100 to-pink-100 px-3 py-1 text-sm font-medium text-indigo-700">
                            New — Live sets announced
                        </p>

                        <h1 className="mt-8 text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl dark:text-white">Synth Veil</h1>

                        <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
                            Ambient synthscapes, modular experiments, and live performances. Join the mailing list for updates.
                        </p>

                        <div className="mt-8 flex justify-center gap-4">
                            <Button size="lg">
                                Buy tickets
                            </Button>
                            <Button variant="outline" size="lg">
                                Listen
                            </Button>
                        </div>
                    </div>
                </div>
            </Main>
        </>
    );
}
