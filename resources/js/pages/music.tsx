import SEO from '@/components/seo';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select } from '@/components/ui/select';
import Main from '@/layouts/main';
import { usePage } from '@inertiajs/react';
import { useEffect, useMemo, useState } from 'react';

interface Release {
    id: number;
    title: string;
    description?: string;
    type: string;
    release_date: string;
    cover_image?: string;
    streaming_links?: Record<string, string>;
    is_featured: boolean;
}

interface Props {
    releases: Release[];
}

const ITEMS_PER_PAGE = 6;

export default function Music({ releases }: Props) {
    const { url } = usePage();

    const queryParams = useMemo(() => new URLSearchParams(url.split('?')[1] ?? ''), [url]);
    const initialSearchQuery = queryParams.get('search') ?? '';
    const initialSelectedType = queryParams.get('type') ?? 'all';
    const parsedInitialPage = Number.parseInt(queryParams.get('page') ?? '1', 10);
    const initialPage = Number.isFinite(parsedInitialPage) && parsedInitialPage > 0 ? parsedInitialPage : 1;

    const [searchQuery, setSearchQuery] = useState(initialSearchQuery);
    const [selectedType, setSelectedType] = useState(initialSelectedType);
    const [currentPage, setCurrentPage] = useState(initialPage);

    const availableTypes = useMemo(() => {
        return Array.from(new Set(releases.map((release) => release.type))).sort((first, second) => first.localeCompare(second));
    }, [releases]);

    const filteredReleases = useMemo(() => {
        const normalizedQuery = searchQuery.trim().toLowerCase();

        return releases.filter((release) => {
            const matchesType = selectedType === 'all' || release.type === selectedType;

            const matchesQuery =
                normalizedQuery.length === 0 ||
                release.title.toLowerCase().includes(normalizedQuery) ||
                release.type.toLowerCase().includes(normalizedQuery) ||
                (release.description ?? '').toLowerCase().includes(normalizedQuery);

            return matchesType && matchesQuery;
        });
    }, [releases, searchQuery, selectedType]);

    const totalPages = Math.max(1, Math.ceil(filteredReleases.length / ITEMS_PER_PAGE));

    useEffect(() => {
        setCurrentPage((previousPage) => Math.min(previousPage, totalPages));
    }, [totalPages]);

    const paginatedReleases = useMemo(() => {
        const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
        return filteredReleases.slice(startIndex, startIndex + ITEMS_PER_PAGE);
    }, [filteredReleases, currentPage]);

    useEffect(() => {
        if (typeof window === 'undefined') {
            return;
        }

        const params = new URLSearchParams();

        if (searchQuery.trim().length > 0) {
            params.set('search', searchQuery);
        }

        if (selectedType !== 'all') {
            params.set('type', selectedType);
        }

        if (currentPage > 1) {
            params.set('page', String(currentPage));
        }

        const query = params.toString();
        const nextUrl = `${window.location.pathname}${query ? `?${query}` : ''}`;
        window.history.replaceState(window.history.state, '', nextUrl);
    }, [searchQuery, selectedType, currentPage]);

    const handleSearchChange = (value: string) => {
        setSearchQuery(value);
        setCurrentPage(1);
    };

    const handleTypeChange = (value: string) => {
        setSelectedType(value);
        setCurrentPage(1);
    };

    const clearFilters = () => {
        setSearchQuery('');
        setSelectedType('all');
        setCurrentPage(1);
    };

    const hasActiveFilters = searchQuery.trim().length > 0 || selectedType !== 'all' || currentPage > 1;

    return (
        <>
            <SEO
                title="Music"
                description="Explore Synth Veil's discography of ambient soundscapes, modular experiments, and electronic compositions. Stream and download our latest releases."
                keywords="synth veil music, releases, ambient albums, electronic music, streaming, downloads"
                ogType="music.album"
                canonicalUrl="https://synthveil.graveyardjokes.com/music"
            />
            <Main>
                <div className="mx-auto max-w-6xl px-6 py-16">
                    <h1 className="mb-8 text-4xl font-bold text-gray-900 dark:text-white">Music</h1>

                    <div className="mb-8 grid grid-cols-1 gap-4 md:grid-cols-2">
                        <div className="space-y-2">
                            <label htmlFor="music-search" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                Search releases
                            </label>
                            <Input
                                id="music-search"
                                type="search"
                                value={searchQuery}
                                onChange={(event) => handleSearchChange(event.target.value)}
                                placeholder="Search by title, type, or description"
                            />
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="music-type-filter" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                Filter by type
                            </label>
                            <Select id="music-type-filter" value={selectedType} onChange={(event) => handleTypeChange(event.target.value)}>
                                <option value="all">All types</option>
                                {availableTypes.map((type) => (
                                    <option key={type} value={type}>
                                        {type}
                                    </option>
                                ))}
                            </Select>
                        </div>
                    </div>

                    {hasActiveFilters && (
                        <div className="mb-8 flex justify-end">
                            <Button variant="outline" size="sm" onClick={clearFilters}>
                                Clear filters
                            </Button>
                        </div>
                    )}

                    {filteredReleases.length > 0 ? (
                        <>
                            <div className="mb-4 flex items-center justify-between text-sm text-gray-600 dark:text-gray-300">
                                <span>
                                    Showing {(currentPage - 1) * ITEMS_PER_PAGE + 1}-
                                    {Math.min(currentPage * ITEMS_PER_PAGE, filteredReleases.length)} of {filteredReleases.length}
                                </span>
                                <span>
                                    Page {currentPage} of {totalPages}
                                </span>
                            </div>

                        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                            {paginatedReleases.map((release) => (
                                <Card key={release.id} className="transition-shadow hover:shadow-lg">
                                    <CardHeader>
                                        <CardTitle className="text-xl">{release.title}</CardTitle>
                                        <p className="text-sm font-medium text-indigo-600 capitalize dark:text-indigo-400">{release.type}</p>
                                    </CardHeader>
                                    <CardContent>
                                        <p className="mb-4 text-gray-600 dark:text-gray-300">{release.description || 'No description available'}</p>
                                        <p className="mb-4 text-sm text-gray-500">Released: {new Date(release.release_date).toLocaleDateString()}</p>
                                        <Button variant="outline" size="sm" className="w-full">
                                            Listen Now
                                        </Button>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                            {totalPages > 1 && (
                                <div className="mt-8 flex items-center justify-center gap-3">
                                    <Button variant="outline" size="sm" onClick={() => setCurrentPage((page) => page - 1)} disabled={currentPage === 1}>
                                        Previous
                                    </Button>
                                    <span className="text-sm text-gray-600 dark:text-gray-300">
                                        Page {currentPage} of {totalPages}
                                    </span>
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() => setCurrentPage((page) => page + 1)}
                                        disabled={currentPage === totalPages}
                                    >
                                        Next
                                    </Button>
                                </div>
                            )}
                        </>
                    ) : (
                        <Card className="py-12 text-center">
                            <CardContent>
                                <p className="mb-4 text-lg text-gray-600 dark:text-gray-300">No releases matched your filters.</p>
                                <p className="text-gray-500 dark:text-gray-400">Try a different search or type filter.</p>
                            </CardContent>
                        </Card>
                    )}
                </div>
            </Main>
        </>
    );
}
