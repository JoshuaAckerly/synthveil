'use client';

import SEO from '@/components/seo';
import { Button } from '@/components/ui/button';
import Main from '@/layouts/main';
import { useGSAP } from '@gsap/react';
import { Link } from '@inertiajs/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useRef } from 'react';
import { getProjectUrl } from '../env';

const RELEASES = [
    { title: 'Drift / Fracture', year: '2026', type: 'EP', desc: 'Six movements of dissonance and resolution, recorded live in a converted warehouse.', color: 'from-violet-900/60 to-indigo-900/60' },
    { title: 'Liminal State', year: '2025', type: 'Album', desc: 'Full-length exploration of threshold spaces — the in-between moments where time feels elastic.', color: 'from-cyan-900/60 to-blue-900/60' },
    { title: 'Signal Decay', year: '2025', type: 'Single', desc: 'A meditation on digital entropy — what survives when the signal finally breaks down.', color: 'from-rose-900/60 to-purple-900/60' },
];

const SHOWS = [
    { venue: 'The Bell House', city: 'Brooklyn, NY', date: 'Sep 12, 2026', support: 'w/ Pale Chorus' },
    { venue: 'Empty Bottle', city: 'Chicago, IL', date: 'Sep 19, 2026', support: 'w/ Aether Drift' },
    { venue: 'Echoplex', city: 'Los Angeles, CA', date: 'Oct 3, 2026', support: '' },
    { venue: 'Neumos', city: 'Seattle, WA', date: 'Oct 11, 2026', support: 'w/ Low Hum' },
];

export default function Welcome() {
    const pageRef = useRef<HTMLDivElement>(null);
    const heroTitleRef = useRef<HTMLHeadingElement>(null);
    const heroTaglineRef = useRef<HTMLParagraphElement>(null);
    const heroCTARef = useRef<HTMLDivElement>(null);
    const heroBadgeRef = useRef<HTMLParagraphElement>(null);

    useGSAP(() => {
        // Hero entrance timeline
        const tl = gsap.timeline({ delay: 0.15 });

        tl.fromTo(heroBadgeRef.current,
            { opacity: 0, y: -16, scale: 0.9 },
            { opacity: 1, y: 0, scale: 1, duration: 0.6, ease: 'power2.out' }
        )
        .fromTo('.sv-char',
            { opacity: 0, y: 50, rotationX: -80, transformOrigin: '50% 100%' },
            { opacity: 1, y: 0, rotationX: 0, duration: 0.05, stagger: 0.045, ease: 'back.out(1.5)' },
            '-=0.2'
        )
        .fromTo(heroTaglineRef.current,
            { opacity: 0, y: 20 },
            { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' },
            '-=0.1'
        )
        .fromTo(heroCTARef.current,
            { opacity: 0, y: 20 },
            { opacity: 1, y: 0, duration: 0.7, ease: 'power2.out' },
            '-=0.3'
        );

        // Scroll-triggered reveals
        gsap.utils.toArray<HTMLElement>('.sv-section').forEach((el) => {
            gsap.fromTo(el,
                { opacity: 0, y: 60 },
                { opacity: 1, y: 0, duration: 0.9, ease: 'power2.out',
                  scrollTrigger: { trigger: el, start: 'top 82%', once: true } }
            );
        });

        // Staggered card reveals
        gsap.utils.toArray<HTMLElement>('.sv-card-group').forEach((group) => {
            gsap.fromTo(group.querySelectorAll('.sv-card'),
                { opacity: 0, y: 40 },
                { opacity: 1, y: 0, duration: 0.6, stagger: 0.12, ease: 'power2.out',
                  scrollTrigger: { trigger: group, start: 'top 80%', once: true } }
            );
        });
    }, { scope: pageRef });

    const title = 'Synth Veil';

    const structuredData = {
        '@context': 'https://schema.org',
        '@type': 'MusicGroup',
        name: 'Synth Veil',
        genre: ['Ambient', 'Electronic', 'Experimental'],
        url: getProjectUrl('synthveil'),
        description: 'Ambient synthscapes, modular experiments, and live performances. Exploring the boundaries of electronic music.',
    };

    return (
        <>
            <SEO
                title="Synth Veil"
                description="Ambient synthscapes, modular experiments, and live performances. Exploring the boundaries of electronic music."
                canonicalUrl={getProjectUrl('synthveil') + '/'}
                structuredData={structuredData}
            />
            <Main>
                <div ref={pageRef} className="text-white">

                    {/* ── Hero ──────────────────────────────────────────── */}
                    <section className="sv-gradient-bg relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 text-center">

                        {/* Ambient orbs */}
                        <div className="sv-orb-a pointer-events-none absolute left-[10%] top-[15%] h-72 w-72 rounded-full bg-violet-600/20 blur-3xl" aria-hidden="true" />
                        <div className="sv-orb-b pointer-events-none absolute bottom-[20%] right-[8%] h-96 w-96 rounded-full bg-cyan-500/15 blur-3xl" aria-hidden="true" />
                        <div className="sv-orb-c pointer-events-none absolute bottom-[10%] left-[30%] h-48 w-48 rounded-full bg-indigo-500/20 blur-2xl" aria-hidden="true" />

                        {/* Content */}
                        <div className="relative z-10 max-w-3xl">
                            <p ref={heroBadgeRef} className="mb-8 inline-block rounded-full border border-violet-400/30 bg-violet-500/10 px-4 py-1.5 text-sm font-medium text-violet-300 backdrop-blur-sm">
                                New EP — <span className="text-white">Drift / Fracture</span> out now
                            </p>

                            <h1 ref={heroTitleRef} className="mb-6 text-6xl font-black tracking-tight sm:text-7xl lg:text-8xl" style={{ perspective: '600px' }}>
                                {title.split('').map((char, i) => (
                                    <span key={i} className="sv-char inline-block" style={{ display: 'inline-block' }}>
                                        {char === ' ' ? '\u00A0' : char}
                                    </span>
                                ))}
                            </h1>

                            <p ref={heroTaglineRef} className="mx-auto mb-10 max-w-xl text-lg leading-relaxed text-white/60 sm:text-xl">
                                Ambient synthscapes and modular experiments from the space between signal and silence.
                            </p>

                            <div ref={heroCTARef} className="flex flex-wrap justify-center gap-4">
                                <Link
                                    href="/music"
                                    className="rounded-full bg-violet-600 px-8 py-3 text-sm font-semibold text-white transition-all hover:bg-violet-500 hover:shadow-[0_0_30px_rgba(139,92,246,0.4)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-400"
                                >
                                    Listen
                                </Link>
                                <Link
                                    href="/events"
                                    className="rounded-full border border-white/20 bg-white/5 px-8 py-3 text-sm font-semibold text-white backdrop-blur-sm transition-all hover:border-violet-400/50 hover:bg-white/10"
                                >
                                    See Live
                                </Link>
                            </div>
                        </div>

                        {/* Scroll hint */}
                        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce opacity-40">
                            <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                        </div>
                    </section>

                    {/* ── Releases ─────────────────────────────────────── */}
                    <section className="sv-section bg-[#080012] px-6 py-24">
                        <div className="mx-auto max-w-6xl">
                            <div className="mb-12 text-center">
                                <h2 className="text-4xl font-bold tracking-tight sm:text-5xl">Releases</h2>
                                <p className="mt-3 text-white/50">Recorded in isolation. Meant to be heard alone.</p>
                            </div>

                            <div className="sv-card-group grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                                {RELEASES.map((r) => (
                                    <article
                                        key={r.title}
                                        className={`sv-card group relative overflow-hidden rounded-2xl bg-gradient-to-br ${r.color} border border-white/10 p-8 transition-all duration-300 hover:scale-[1.02] hover:border-violet-400/30 hover:shadow-[0_0_40px_rgba(139,92,246,0.15)]`}
                                    >
                                        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/40" />
                                        <div className="relative z-10">
                                            <div className="mb-1 flex items-center gap-2 text-xs text-white/50">
                                                <span>{r.year}</span>
                                                <span>·</span>
                                                <span>{r.type}</span>
                                            </div>
                                            <h3 className="mb-3 text-2xl font-bold">{r.title}</h3>
                                            <p className="text-sm leading-relaxed text-white/60">{r.desc}</p>
                                            <Link
                                                href="/music"
                                                className="mt-5 inline-flex items-center gap-1 text-sm font-medium text-violet-300 transition-colors hover:text-violet-200"
                                            >
                                                Listen <span aria-hidden="true">→</span>
                                            </Link>
                                        </div>
                                    </article>
                                ))}
                            </div>
                        </div>
                    </section>

                    {/* ── Live ─────────────────────────────────────────── */}
                    <section className="sv-section bg-[#05000f] px-6 py-24">
                        <div className="mx-auto max-w-4xl">
                            <div className="mb-12 text-center">
                                <h2 className="text-4xl font-bold tracking-tight sm:text-5xl">Live</h2>
                                <p className="mt-3 text-white/50">Performing select dates this fall.</p>
                            </div>

                            <div className="sv-card-group space-y-3">
                                {SHOWS.map((show) => (
                                    <div
                                        key={show.venue + show.date}
                                        className="sv-card group flex flex-col items-start justify-between gap-4 rounded-xl border border-white/8 bg-white/3 px-6 py-5 backdrop-blur-sm transition-all hover:border-violet-400/30 hover:bg-white/6 sm:flex-row sm:items-center"
                                    >
                                        <div>
                                            <p className="font-semibold text-white">{show.venue}</p>
                                            <p className="text-sm text-white/50">{show.city}{show.support && <span className="ml-2 opacity-70">{show.support}</span>}</p>
                                        </div>
                                        <div className="flex items-center gap-4">
                                            <span className="text-sm text-white/60">{show.date}</span>
                                            <a
                                                href="#"
                                                className="rounded-full border border-violet-400/40 px-4 py-1.5 text-xs font-semibold text-violet-300 transition-all hover:border-violet-400 hover:bg-violet-500/10"
                                            >
                                                Tickets
                                            </a>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>

                    {/* ── About ────────────────────────────────────────── */}
                    <section className="sv-section sv-gradient-bg px-6 py-32 text-center">
                        <div className="mx-auto max-w-2xl">
                            <h2 className="mb-6 text-4xl font-bold sm:text-5xl">About</h2>
                            <p className="mb-4 text-lg leading-relaxed text-white/60">
                                Synth Veil is the modular synthesis and ambient project of a Brooklyn-based composer
                                working at the intersection of generative electronics and physical performance.
                            </p>
                            <p className="mb-10 text-lg leading-relaxed text-white/60">
                                Performances often incorporate real-time processing, long-form drones, and decomposed
                                field recordings — music designed to disorient and reorient in equal measure.
                            </p>
                            <div className="flex flex-wrap justify-center gap-4">
                                <a
                                    href="mailto:booking@synthveil.com"
                                    className="rounded-full bg-white/10 px-6 py-2.5 text-sm font-medium text-white transition hover:bg-white/20"
                                >
                                    Booking
                                </a>
                                <a
                                    href="https://www.instagram.com/synthveil"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="rounded-full bg-white/10 px-6 py-2.5 text-sm font-medium text-white transition hover:bg-white/20"
                                >
                                    Instagram
                                </a>
                                <a
                                    href="https://synthveil.bandcamp.com"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="rounded-full bg-white/10 px-6 py-2.5 text-sm font-medium text-white transition hover:bg-white/20"
                                >
                                    Bandcamp
                                </a>
                            </div>
                        </div>
                    </section>

                </div>
            </Main>
        </>
    );
}
