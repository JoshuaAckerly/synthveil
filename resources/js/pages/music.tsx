import SEO from '@/components/seo';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Main from '@/layouts/main';

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

export default function Music({ releases }: Props) {
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

                    {releases.length > 0 ? (
                        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                            {releases.map((release) => (
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
                    ) : (
                        <Card className="py-12 text-center">
                            <CardContent>
                                <p className="mb-4 text-lg text-gray-600 dark:text-gray-300">No releases available yet.</p>
                                <p className="text-gray-500 dark:text-gray-400">Check back soon for new music!</p>
                            </CardContent>
                        </Card>
                    )}
                </div>
            </Main>
        </>
    );
}
