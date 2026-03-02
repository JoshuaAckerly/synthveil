import SEO from '@/components/seo';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FormControl, FormField, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import Main from '@/layouts/main';
import { useForm } from '@inertiajs/react';
import React, { useState } from 'react';

interface Props {
    success?: string;
}

export default function Contact({ success }: Props) {
    const [submitError, setSubmitError] = useState<string | null>(null);
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        email: '',
        message: '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/contact', {
            onStart: () => setSubmitError(null),
            onError: (formErrors) => {
                if (Object.keys(formErrors).length === 0) {
                    setSubmitError('Your message could not be sent right now. Please try again.');
                }
            },
        });
    };
    return (
        <>
            <SEO
                title="Contact"
                description="Get in touch with Synth Veil. Inquiries about bookings, collaborations, or general questions welcome."
                keywords="contact synth veil, booking inquiries, collaboration, get in touch"
                canonicalUrl="https://synthveil.graveyardjokes.com/contact"
            />
            <Main>
                <div className="mx-auto max-w-2xl px-6 py-16">
                    <h1 className="mb-8 text-4xl font-bold text-gray-900 dark:text-white">Contact</h1>

                    <Card>
                        <CardHeader>
                            <CardTitle>Get in Touch</CardTitle>
                        </CardHeader>
                        <CardContent>
                            {success && (
                                <div className="mb-6 rounded-md border border-green-200 bg-green-50 p-4 text-green-800 dark:border-green-800 dark:bg-green-900/20 dark:text-green-400">
                                    {success}
                                </div>
                            )}

                            {submitError && (
                                <div className="mb-6 rounded-md border border-red-200 bg-red-50 p-4 text-red-800 dark:border-red-800 dark:bg-red-900/20 dark:text-red-400">
                                    {submitError}
                                </div>
                            )}

                            {Object.keys(errors).length > 0 && (
                                <div className="mb-6 rounded-md border border-red-200 bg-red-50 p-4 text-red-800 dark:border-red-800 dark:bg-red-900/20 dark:text-red-400">
                                    Please review the highlighted fields and try again.
                                </div>
                            )}

                            <form onSubmit={handleSubmit} className="space-y-6" aria-busy={processing ? 'true' : 'false'}>
                                <FormField name="name" error={errors.name}>
                                    <FormLabel>Name</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="text"
                                            value={data.name}
                                            onChange={(e) => setData('name', e.target.value)}
                                            placeholder="Your name"
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormField>

                                <FormField name="email" error={errors.email}>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="email"
                                            value={data.email}
                                            onChange={(e) => setData('email', e.target.value)}
                                            placeholder="your@email.com"
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormField>

                                <FormField name="message" error={errors.message}>
                                    <FormLabel>Message</FormLabel>
                                    <FormControl>
                                        <Textarea
                                            rows={4}
                                            value={data.message}
                                            onChange={(e) => setData('message', e.target.value)}
                                            placeholder="Your message..."
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormField>

                                <Button type="submit" disabled={processing} className="w-full" size="lg">
                                    {processing ? 'Sending...' : 'Send Message'}
                                </Button>
                            </form>
                        </CardContent>
                    </Card>
                </div>
            </Main>
        </>
    );
}
