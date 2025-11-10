import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Main from '@/layouts/main';
import { Link } from '@inertiajs/react';

export default function Dashboard() {
    return (
        <Main>
            <div className="mx-auto max-w-6xl px-6 py-16">
                <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-8">Admin Dashboard</h1>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Releases</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-gray-600 dark:text-gray-300 mb-4">
                                Manage music releases, albums, and singles
                            </p>
                            <Button asChild>
                                <Link href="/admin/releases">Manage Releases</Link>
                            </Button>
                        </CardContent>
                    </Card>
                    
                    <Card>
                        <CardHeader>
                            <CardTitle>Events</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-gray-600 dark:text-gray-300 mb-4">
                                Manage live shows and events
                            </p>
                            <Button asChild>
                                <Link href="/admin/events">Manage Events</Link>
                            </Button>
                        </CardContent>
                    </Card>
                    
                    <Card>
                        <CardHeader>
                            <CardTitle>Contacts</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-gray-600 dark:text-gray-300 mb-4">
                                View and manage contact submissions
                            </p>
                            <Button asChild>
                                <Link href="/admin/contacts">View Contacts</Link>
                            </Button>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </Main>
    );
}