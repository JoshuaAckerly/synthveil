import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Main from '@/layouts/main';
import { Link, router } from '@inertiajs/react';

interface Contact {
    id: number;
    name: string;
    email: string;
    message: string;
    is_read: boolean;
    created_at: string;
}

interface Props {
    contacts: Contact[];
    success?: string;
}

export default function Index({ contacts, success }: Props) {
    const handleDelete = (id: number) => {
        if (confirm('Are you sure you want to delete this contact?')) {
            router.delete(`/admin/contacts/${id}`);
        }
    };

    return (
        <Main>
            <div className="mx-auto max-w-6xl px-6 py-16">
                <div className="mb-8 flex items-center justify-between">
                    <h1 className="text-4xl font-bold text-gray-900 dark:text-white">Contact Submissions</h1>
                    <Button variant="outline" asChild>
                        <Link href="/admin">← Back to Dashboard</Link>
                    </Button>
                </div>

                {success && <div className="mb-6 rounded-md border border-green-200 bg-green-50 p-4 text-green-800">{success}</div>}

                <div className="space-y-4">
                    {contacts.map((contact) => (
                        <Card key={contact.id} className={!contact.is_read ? 'border-indigo-200 bg-indigo-50/50 dark:bg-indigo-950/20' : ''}>
                            <CardHeader>
                                <div className="flex items-start justify-between">
                                    <div>
                                        <CardTitle className="flex items-center gap-2 text-lg">
                                            {contact.name}
                                            {!contact.is_read && <span className="rounded-full bg-indigo-600 px-2 py-1 text-xs text-white">New</span>}
                                        </CardTitle>
                                        <p className="text-sm text-gray-600">{contact.email}</p>
                                        <p className="text-xs text-gray-500">{new Date(contact.created_at).toLocaleDateString()}</p>
                                    </div>
                                    <div className="flex gap-2">
                                        <Button variant="outline" size="sm" asChild>
                                            <Link href={`/admin/contacts/${contact.id}`}>View</Link>
                                        </Button>
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={() => handleDelete(contact.id)}
                                            className="text-red-600 hover:text-red-700"
                                        >
                                            Delete
                                        </Button>
                                    </div>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <p className="line-clamp-3 text-gray-700 dark:text-gray-300">{contact.message}</p>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                {contacts.length === 0 && (
                    <Card className="py-12 text-center">
                        <CardContent>
                            <p className="text-gray-600 dark:text-gray-300">No contact submissions found.</p>
                        </CardContent>
                    </Card>
                )}
            </div>
        </Main>
    );
}
