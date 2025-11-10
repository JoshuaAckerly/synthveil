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
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-4xl font-bold text-gray-900 dark:text-white">Manage Events</h1>
                    <Button asChild>
                        <Link href="/admin/events/create">Add Event</Link>
                    </Button>
                </div>

                {success && (
                    <div className="mb-6 p-4 bg-green-50 border border-green-200 text-green-800 rounded-md">
                        {success}
                    </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {events.map((event) => (
                        <Card key={event.id}>
                            <CardHeader>
                                <CardTitle className="text-lg">{event.title}</CardTitle>
                                <p className="text-sm text-gray-600">{event.venue}, {event.location}</p>
                            </CardHeader>
                            <CardContent>
                                <p className="text-sm text-gray-500 mb-2">
                                    {new Date(event.event_date).toLocaleDateString()}
                                </p>
                                {event.price && (
                                    <p className="text-sm text-gray-500 mb-4">${event.price}</p>
                                )}
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
                    <Card className="text-center py-12">
                        <CardContent>
                            <p className="text-gray-600 dark:text-gray-300 mb-4">No events found.</p>
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