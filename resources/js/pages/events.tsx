import SEO from '@/components/seo';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select } from '@/components/ui/select';
import Main from '@/layouts/main';
import { usePage } from '@inertiajs/react';
import { useEffect, useMemo, useState } from 'react';

interface Event {
    id: number;
    title: string;
    description?: string;
    venue: string;
    location: string;
    event_date: string;
    price?: number;
    ticket_url?: string;
    is_featured: boolean;
}

interface Props {
    events: Event[];
}

const ITEMS_PER_PAGE = 5;

export default function Events({ events }: Props) {
    const { url } = usePage();

    const queryParams = useMemo(() => new URLSearchParams(url.split('?')[1] ?? ''), [url]);
    const initialSearchQuery = queryParams.get('search') ?? '';
    const requestedTimeFilter = queryParams.get('time');
    const initialTimeFilter: 'all' | 'upcoming' | 'past' =
        requestedTimeFilter === 'upcoming' || requestedTimeFilter === 'past' ? requestedTimeFilter : 'all';
    const parsedInitialPage = Number.parseInt(queryParams.get('page') ?? '1', 10);
    const initialPage = Number.isFinite(parsedInitialPage) && parsedInitialPage > 0 ? parsedInitialPage : 1;

    const [searchQuery, setSearchQuery] = useState(initialSearchQuery);
    const [timeFilter, setTimeFilter] = useState<'all' | 'upcoming' | 'past'>(initialTimeFilter);
    const [currentPage, setCurrentPage] = useState(initialPage);

    const filteredEvents = useMemo(() => {
        const normalizedQuery = searchQuery.trim().toLowerCase();
        const now = new Date();

        return events.filter((event) => {
            const eventDate = new Date(event.event_date);
            const matchesTimeFilter =
                timeFilter === 'all' ||
                (timeFilter === 'upcoming' && eventDate >= now) ||
                (timeFilter === 'past' && eventDate < now);

            const matchesQuery =
                normalizedQuery.length === 0 ||
                event.title.toLowerCase().includes(normalizedQuery) ||
                event.venue.toLowerCase().includes(normalizedQuery) ||
                event.location.toLowerCase().includes(normalizedQuery) ||
                (event.description ?? '').toLowerCase().includes(normalizedQuery);

            return matchesTimeFilter && matchesQuery;
        });
    }, [events, searchQuery, timeFilter]);

    const totalPages = Math.max(1, Math.ceil(filteredEvents.length / ITEMS_PER_PAGE));

    useEffect(() => {
        setCurrentPage((previousPage) => Math.min(previousPage, totalPages));
    }, [totalPages]);

    const paginatedEvents = useMemo(() => {
        const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
        return filteredEvents.slice(startIndex, startIndex + ITEMS_PER_PAGE);
    }, [filteredEvents, currentPage]);

    useEffect(() => {
        if (typeof window === 'undefined') {
            return;
        }

        const params = new URLSearchParams();

        if (searchQuery.trim().length > 0) {
            params.set('search', searchQuery);
        }

        if (timeFilter !== 'all') {
            params.set('time', timeFilter);
        }

        if (currentPage > 1) {
            params.set('page', String(currentPage));
        }

        const query = params.toString();
        const nextUrl = `${window.location.pathname}${query ? `?${query}` : ''}`;
        window.history.replaceState(window.history.state, '', nextUrl);
    }, [searchQuery, timeFilter, currentPage]);

    const handleSearchChange = (value: string) => {
        setSearchQuery(value);
        setCurrentPage(1);
    };

    const handleTimeFilterChange = (value: 'all' | 'upcoming' | 'past') => {
        setTimeFilter(value);
        setCurrentPage(1);
    };

    const clearFilters = () => {
        setSearchQuery('');
        setTimeFilter('all');
        setCurrentPage(1);
    };

    const hasActiveFilters = searchQuery.trim().length > 0 || timeFilter !== 'all' || currentPage > 1;

    return (
        <>
            <SEO
                title="Events"
                description="Upcoming Synth Veil live performances, shows, and events. Get tickets and join us for immersive ambient electronic experiences."
                keywords="synth veil events, live performances, concerts, shows, tickets, ambient music events"
                canonicalUrl="https://synthveil.graveyardjokes.com/events"
            />
            <Main>
                <div className="mx-auto max-w-4xl px-6 py-16">
                    <h1 className="mb-8 text-4xl font-bold text-gray-900 dark:text-white">Events</h1>

                    <div className="mb-8 grid grid-cols-1 gap-4 md:grid-cols-2">
                        <div className="space-y-2">
                            <label htmlFor="events-search" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                Search events
                            </label>
                            <Input
                                id="events-search"
                                type="search"
                                value={searchQuery}
                                onChange={(event) => handleSearchChange(event.target.value)}
                                placeholder="Search by title, venue, location, or description"
                            />
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="events-time-filter" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                Filter by date
                            </label>
                            <Select
                                id="events-time-filter"
                                value={timeFilter}
                                onChange={(event) => handleTimeFilterChange(event.target.value as 'all' | 'upcoming' | 'past')}
                            >
                                <option value="all">All events</option>
                                <option value="upcoming">Upcoming events</option>
                                <option value="past">Past events</option>
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

                    <div className="space-y-6">
                        {filteredEvents.length > 0 ? (
                            <>
                                <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-300">
                                    <span>
                                        Showing {(currentPage - 1) * ITEMS_PER_PAGE + 1}-
                                        {Math.min(currentPage * ITEMS_PER_PAGE, filteredEvents.length)} of {filteredEvents.length}
                                    </span>
                                    <span>
                                        Page {currentPage} of {totalPages}
                                    </span>
                                </div>

                                {paginatedEvents.map((event) => (
                                    <Card key={event.id} className="transition-shadow hover:shadow-lg">
                                        <CardHeader>
                                            <CardTitle>{event.title}</CardTitle>
                                        </CardHeader>
                                        <CardContent>
                                            <div className="mb-4 grid grid-cols-1 gap-4 md:grid-cols-2">
                                                <div className="space-y-2">
                                                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Venue</p>
                                                    <p className="text-gray-900 dark:text-gray-100">{event.venue}</p>
                                                </div>
                                                <div className="space-y-2">
                                                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Location</p>
                                                    <p className="text-gray-900 dark:text-gray-100">{event.location}</p>
                                                </div>
                                                <div className="space-y-2">
                                                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Date</p>
                                                    <p className="text-gray-900 dark:text-gray-100">{new Date(event.event_date).toLocaleDateString()}</p>
                                                </div>
                                                {event.price && (
                                                    <div className="space-y-2">
                                                        <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Price</p>
                                                        <p className="text-gray-900 dark:text-gray-100">${event.price}</p>
                                                    </div>
                                                )}
                                            </div>
                                            {event.description && <p className="mb-4 text-gray-600 dark:text-gray-300">{event.description}</p>}
                                            {event.ticket_url && (
                                                <Button asChild>
                                                    <a href={event.ticket_url}>Get Tickets</a>
                                                </Button>
                                            )}
                                        </CardContent>
                                    </Card>
                                ))}

                                {totalPages > 1 && (
                                    <div className="flex items-center justify-center gap-3">
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
                                    <p className="mb-2 text-lg text-gray-600 dark:text-gray-300">No events matched your filters.</p>
                                    <p className="text-gray-500 dark:text-gray-400">Try a different search or date filter.</p>
                                </CardContent>
                            </Card>
                        )}

                        <Card className="bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-950 dark:to-purple-950">
                            <CardHeader>
                                <CardTitle className="text-lg">Get Notified</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="mb-4 text-gray-600 dark:text-gray-300">
                                    Join our mailing list to be the first to know about new shows and releases.
                                </p>
                                <Button>Subscribe</Button>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </Main>
        </>
    );
}
