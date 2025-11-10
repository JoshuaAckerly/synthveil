import Main from '@/layouts/main';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FormControl, FormField, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useForm } from '@inertiajs/react';

interface Props {
    success?: string;
}

export default function Contact({ success }: Props) {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        email: '',
        message: ''
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/contact');
    };
    return (
        <Main>
            <div className="mx-auto max-w-2xl px-6 py-16">
                <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-8">Contact</h1>
                
                <Card>
                    <CardHeader>
                        <CardTitle>Get in Touch</CardTitle>
                    </CardHeader>
                    <CardContent>
                        {success && (
                            <div className="mb-6 p-4 bg-green-50 border border-green-200 text-green-800 rounded-md dark:bg-green-900/20 dark:border-green-800 dark:text-green-400">
                                {success}
                            </div>
                        )}
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <FormField name="name" error={errors.name}>
                                <FormLabel>Name</FormLabel>
                                <FormControl>
                                    <Input 
                                        type="text" 
                                        value={data.name}
                                        onChange={e => setData('name', e.target.value)}
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
                                        onChange={e => setData('email', e.target.value)}
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
                                        onChange={e => setData('message', e.target.value)}
                                        placeholder="Your message..."
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormField>
                            
                            <Button 
                                type="submit"
                                disabled={processing}
                                className="w-full"
                                size="lg"
                            >
                                {processing ? 'Sending...' : 'Send Message'}
                            </Button>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </Main>
    );
}