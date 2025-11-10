import Main from '@/layouts/main';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface Release {
    id: number;
    title: string;
    description?: string;
    type: string;
    release_date: string;
    cover_image?: string;
    streaming_links?: any;
    is_featured: boolean;
}

interface Props {
    releases: Release[];
}

export default function Music({ releases }: Props) {
    return (
        <Main>
            <div className="mx-auto max-w-6xl px-6 py-16">
                <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-8">Music</h1>
                
                {releases.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {releases.map((release) => (
                            <Card key={release.id} className="hover:shadow-lg transition-shadow">
                                <CardHeader>
                                    <CardTitle className="text-xl">{release.title}</CardTitle>
                                    <p className="text-sm text-indigo-600 dark:text-indigo-400 capitalize font-medium">
                                        {release.type}
                                    </p>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-gray-600 dark:text-gray-300 mb-4">
                                        {release.description || 'No description available'}
                                    </p>
                                    <p className="text-sm text-gray-500 mb-4">
                                        Released: {new Date(release.release_date).toLocaleDateString()}
                                    </p>
                                    <Button variant="outline" size="sm" className="w-full">
                                        Listen Now
                                    </Button>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                ) : (
                    <Card className="text-center py-12">
                        <CardContent>
                            <p className="text-gray-600 dark:text-gray-300 text-lg mb-4">No releases available yet.</p>
                            <p className="text-gray-500 dark:text-gray-400">Check back soon for new music!</p>
                        </CardContent>
                    </Card>
                )}
            </div>
        </Main>
    );
}