import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Main from '@/layouts/main';
import { Link, router } from '@inertiajs/react';

interface Event {
    id: number;
    title: string;
    venue: string;
    location: string;
    event_date: string;
    price?: number;
    is_featured: boolean;
}

interface Props {
    events: Event[];
    success?: string;
}

export default function Index({ events, success }: Props) {
    const handleDelete = (id: number) => {
        if (confirm('Are you sure you want to delete this event?')) {
            router.delete(`/admin/events/${id}`);
        }
    };

    return (
        <Main>
            <div className="mx-auto max-w-6xl px-6 py-16">
                <div className="mb-8 flex items-center justify-between">
                    <h1 className="text-4xl font-bold text-gray-900 dark:text-white">Manage Events</h1>
                    <Button asChild>
                        <Link href="/admin/events/create">Add Event</Link>
                    </Button>
                </div>

                {success && <div className="mb-6 rounded-md border border-green-200 bg-green-50 p-4 text-green-800">{success}</div>}

                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    {events.map((event) => (
                        <Card key={event.id}>
                            <CardHeader>
                                <CardTitle className="text-lg">{event.title}</CardTitle>
                                <p className="text-sm text-gray-600">
                                    {event.venue}, {event.location}
                                </p>
                            </CardHeader>
                            <CardContent>
                                <p className="mb-2 text-sm text-gray-500">{new Date(event.event_date).toLocaleDateString()}</p>
                                {event.price && <p className="mb-4 text-sm text-gray-500">${event.price}</p>}
                                <div className="flex gap-2">
                                    <Button variant="outline" size="sm" asChild>
                                        <Link href={`/admin/events/${event.id}/edit`}>Edit</Link>
                                    </Button>
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() => handleDelete(event.id)}
                                        className="text-red-600 hover:text-red-700"
                                    >
                                        Delete
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                {events.length === 0 && (
                    <Card className="py-12 text-center">
                        <CardContent>
                            <p className="mb-4 text-gray-600 dark:text-gray-300">No events found.</p>
                            <Button asChild>
                                <Link href="/admin/events/create">Create First Event</Link>
                            </Button>
                        </CardContent>
                    </Card>
                )}
            </div>
        </Main>
    );
}
