import SEO from '@/components/seo';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Main from '@/layouts/main';

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

export default function Events({ events }: Props) {
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

                    <div className="space-y-6">
                        {events.length > 0 ? (
                            events.map((event) => (
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
                            ))
                        ) : (
                            <Card className="py-12 text-center">
                                <CardContent>
                                    <p className="mb-2 text-lg text-gray-600 dark:text-gray-300">No upcoming events scheduled.</p>
                                    <p className="text-gray-500 dark:text-gray-400">Stay tuned for announcements!</p>
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
