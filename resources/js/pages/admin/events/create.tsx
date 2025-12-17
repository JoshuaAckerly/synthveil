import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { FormControl, FormField, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import Main from '@/layouts/main';
import { Link, useForm } from '@inertiajs/react';

export default function Create() {
    const { data, setData, post, processing, errors } = useForm({
        title: '',
        description: '',
        venue: '',
        location: '',
        event_date: '',
        price: '',
        ticket_url: '',
        is_featured: false,
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/admin/events');
    };

    return (
        <Main>
            <div className="mx-auto max-w-2xl px-6 py-16">
                <div className="mb-8">
                    <Link href="/admin/events" className="text-indigo-600 hover:text-indigo-700">
                        ← Back to Events
                    </Link>
                    <h1 className="mt-4 text-4xl font-bold text-gray-900 dark:text-white">Add Event</h1>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle>Event Details</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <FormField name="title" error={errors.title}>
                                <FormLabel>Title</FormLabel>
                                <FormControl>
                                    <Input value={data.title} onChange={(e) => setData('title', e.target.value)} placeholder="Event title" />
                                </FormControl>
                                <FormMessage />
                            </FormField>

                            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                <FormField name="venue" error={errors.venue}>
                                    <FormLabel>Venue</FormLabel>
                                    <FormControl>
                                        <Input value={data.venue} onChange={(e) => setData('venue', e.target.value)} placeholder="Venue name" />
                                    </FormControl>
                                    <FormMessage />
                                </FormField>

                                <FormField name="location" error={errors.location}>
                                    <FormLabel>Location</FormLabel>
                                    <FormControl>
                                        <Input
                                            value={data.location}
                                            onChange={(e) => setData('location', e.target.value)}
                                            placeholder="City, State"
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormField>
                            </div>

                            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                <FormField name="event_date" error={errors.event_date}>
                                    <FormLabel>Event Date</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="datetime-local"
                                            value={data.event_date}
                                            onChange={(e) => setData('event_date', e.target.value)}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormField>

                                <FormField name="price" error={errors.price}>
                                    <FormLabel>Price</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="number"
                                            step="0.01"
                                            value={data.price}
                                            onChange={(e) => setData('price', e.target.value)}
                                            placeholder="0.00"
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormField>
                            </div>

                            <FormField name="ticket_url" error={errors.ticket_url}>
                                <FormLabel>Ticket URL</FormLabel>
                                <FormControl>
                                    <Input
                                        type="url"
                                        value={data.ticket_url}
                                        onChange={(e) => setData('ticket_url', e.target.value)}
                                        placeholder="https://..."
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormField>

                            <FormField name="description" error={errors.description}>
                                <FormLabel>Description</FormLabel>
                                <FormControl>
                                    <Textarea
                                        value={data.description}
                                        onChange={(e) => setData('description', e.target.value)}
                                        placeholder="Event description"
                                        rows={4}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormField>

                            <FormField name="is_featured">
                                <div className="flex items-center space-x-2">
                                    <FormControl>
                                        <Checkbox checked={data.is_featured} onChange={(e) => setData('is_featured', e.target.checked)} />
                                    </FormControl>
                                    <FormLabel>Featured Event</FormLabel>
                                </div>
                            </FormField>

                            <div className="flex gap-4">
                                <Button type="submit" disabled={processing}>
                                    {processing ? 'Creating...' : 'Create Event'}
                                </Button>
                                <Button variant="outline" asChild>
                                    <Link href="/admin/events">Cancel</Link>
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </Main>
    );
}
