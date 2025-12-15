import { Head } from '@inertiajs/react';

interface SEOProps {
    title?: string;
    description?: string;
    keywords?: string;
    ogType?: 'website' | 'article' | 'music.song' | 'music.album';
    ogImage?: string;
    canonicalUrl?: string;
    structuredData?: object;
}

export default function SEO({
    title = 'Synth Veil',
    description = 'Ambient synthscapes, modular experiments, and live performances. Exploring the boundaries of electronic music.',
    keywords = 'synth veil, ambient music, electronic music, modular synthesis, live performances, synthwave, experimental music',
    ogType = 'website',
    ogImage = 'https://synthveil.graveyardjokes.com/images/og-image.jpg',
    canonicalUrl,
    structuredData,
}: SEOProps) {
    const siteName = 'Synth Veil';
    const baseUrl = 'https://synthveil.graveyardjokes.com';
    const currentUrl = canonicalUrl || baseUrl;

    const fullTitle = title === 'Synth Veil' ? title : `${title} - ${siteName}`;

    return (
        <Head>
            {/* Primary Meta Tags */}
            <title>{fullTitle}</title>
            <meta name="title" content={fullTitle} />
            <meta name="description" content={description} />
            <meta name="keywords" content={keywords} />
            <meta name="author" content="Synth Veil" />
            <meta name="robots" content="index, follow" />
            <meta name="language" content="English" />
            <meta name="revisit-after" content="7 days" />

            {/* Canonical URL */}
            <link rel="canonical" href={currentUrl} />

            {/* Open Graph / Facebook */}
            <meta property="og:type" content={ogType} />
            <meta property="og:url" content={currentUrl} />
            <meta property="og:title" content={fullTitle} />
            <meta property="og:description" content={description} />
            <meta property="og:image" content={ogImage} />
            <meta property="og:site_name" content={siteName} />
            <meta property="og:locale" content="en_US" />

            {/* Twitter */}
            <meta property="twitter:card" content="summary_large_image" />
            <meta property="twitter:url" content={currentUrl} />
            <meta property="twitter:title" content={fullTitle} />
            <meta property="twitter:description" content={description} />
            <meta property="twitter:image" content={ogImage} />

            {/* Additional Meta Tags */}
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <meta name="theme-color" content="#000000" />

            {/* Structured Data / JSON-LD */}
            {structuredData && <script type="application/ld+json">{JSON.stringify(structuredData)}</script>}
        </Head>
    );
}
