import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { FormControl, FormField, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import Main from '@/layouts/main';
import { Link, useForm } from '@inertiajs/react';

export default function Create() {
    const { data, setData, post, processing, errors } = useForm({
        title: '',
        description: '',
        type: 'single',
        release_date: '',
        is_featured: false
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/admin/releases');
    };

    return (
        <Main>
            <div className="mx-auto max-w-2xl px-6 py-16">
                <div className="mb-8">
                    <Link href="/admin/releases" className="text-indigo-600 hover:text-indigo-700">
                        ← Back to Releases
                    </Link>
                    <h1 className="text-4xl font-bold text-gray-900 dark:text-white mt-4">Add Release</h1>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle>Release Details</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <FormField name="title" error={errors.title}>
                                <FormLabel>Title</FormLabel>
                                <FormControl>
                                    <Input
                                        value={data.title}
                                        onChange={e => setData('title', e.target.value)}
                                        placeholder="Release title"
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormField>

                            <FormField name="type" error={errors.type}>
                                <FormLabel>Type</FormLabel>
                                <FormControl>
                                    <Select
                                        value={data.type}
                                        onChange={e => setData('type', e.target.value)}
                                    >
                                        <option value="single">Single</option>
                                        <option value="ep">EP</option>
                                        <option value="album">Album</option>
                                    </Select>
                                </FormControl>
                                <FormMessage />
                            </FormField>

                            <FormField name="release_date" error={errors.release_date}>
                                <FormLabel>Release Date</FormLabel>
                                <FormControl>
                                    <Input
                                        type="date"
                                        value={data.release_date}
                                        onChange={e => setData('release_date', e.target.value)}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormField>

                            <FormField name="description" error={errors.description}>
                                <FormLabel>Description</FormLabel>
                                <FormControl>
                                    <Textarea
                                        value={data.description}
                                        onChange={e => setData('description', e.target.value)}
                                        placeholder="Release description"
                                        rows={4}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormField>

                            <FormField name="is_featured">
                                <div className="flex items-center space-x-2">
                                    <FormControl>
                                        <Checkbox
                                            checked={data.is_featured}
                                            onChange={e => setData('is_featured', e.target.checked)}
                                        />
                                    </FormControl>
                                    <FormLabel>Featured Release</FormLabel>
                                </div>
                            </FormField>

                            <div className="flex gap-4">
                                <Button type="submit" disabled={processing}>
                                    {processing ? 'Creating...' : 'Create Release'}
                                </Button>
                                <Button variant="outline" asChild>
                                    <Link href="/admin/releases">Cancel</Link>
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </Main>
    );
}