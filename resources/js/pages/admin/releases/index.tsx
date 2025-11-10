import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Main from '@/layouts/main';
import { Link, router } from '@inertiajs/react';

interface Release {
    id: number;
    title: string;
    type: string;
    release_date: string;
    is_featured: boolean;
}

interface Props {
    releases: Release[];
    success?: string;
}

export default function Index({ releases, success }: Props) {
    const handleDelete = (id: number) => {
        if (confirm('Are you sure you want to delete this release?')) {
            router.delete(`/admin/releases/${id}`);
        }
    };

    return (
        <Main>
            <div className="mx-auto max-w-6xl px-6 py-16">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-4xl font-bold text-gray-900 dark:text-white">Manage Releases</h1>
                    <Button asChild>
                        <Link href="/admin/releases/create">Add Release</Link>
                    </Button>
                </div>

                {success && (
                    <div className="mb-6 p-4 bg-green-50 border border-green-200 text-green-800 rounded-md">
                        {success}
                    </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {releases.map((release) => (
                        <Card key={release.id}>
                            <CardHeader>
                                <CardTitle className="text-lg">{release.title}</CardTitle>
                                <p className="text-sm text-indigo-600 capitalize">{release.type}</p>
                            </CardHeader>
                            <CardContent>
                                <p className="text-sm text-gray-500 mb-4">
                                    {new Date(release.release_date).toLocaleDateString()}
                                </p>
                                <div className="flex gap-2">
                                    <Button variant="outline" size="sm" asChild>
                                        <Link href={`/admin/releases/${release.id}/edit`}>Edit</Link>
                                    </Button>
                                    <Button 
                                        variant="outline" 
                                        size="sm" 
                                        onClick={() => handleDelete(release.id)}
                                        className="text-red-600 hover:text-red-700"
                                    >
                                        Delete
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                {releases.length === 0 && (
                    <Card className="text-center py-12">
                        <CardContent>
                            <p className="text-gray-600 dark:text-gray-300 mb-4">No releases found.</p>
                            <Button asChild>
                                <Link href="/admin/releases/create">Create First Release</Link>
                            </Button>
                        </CardContent>
                    </Card>
                )}
            </div>
        </Main>
    );
}