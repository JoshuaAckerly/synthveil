import { Button } from '@/components/ui/button';
import { FormControl, FormField, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Head, useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';

interface Props {
    status?: string;
}

export default function Login({ status }: Props) {
    const { data, setData, post, processing, errors } = useForm<{
        email: string;
        password: string;
    }>({
        email: '',
        password: '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post('/login');
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 dark:bg-[var(--background)]">
            <Head title="Admin Login" />

            <div className="w-full max-w-md">
                <div className="mb-8 text-center">
                    <img alt="Synth Veil" src="/images/synthveil-logo.webp" className="mx-auto mb-4 h-12 w-auto" />
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Admin Login</h1>
                    <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Sign in to manage Synth Veil</p>
                </div>

                {status && (
                    <div className="mb-4 rounded-md bg-green-50 p-3 text-sm text-green-700 dark:bg-green-900/20 dark:text-green-400">{status}</div>
                )}

                <div className="rounded-xl border border-gray-200 bg-white p-8 shadow-sm dark:border-white/10 dark:bg-white/5">
                    <form onSubmit={submit} className="space-y-5">
                        <FormField name="email" error={errors.email}>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                                <Input
                                    type="email"
                                    autoComplete="email"
                                    value={data.email}
                                    onChange={(e) => setData('email', e.target.value)}
                                    required
                                    autoFocus
                                />
                            </FormControl>
                            <FormMessage />
                        </FormField>

                        <FormField name="password" error={errors.password}>
                            <FormLabel>Password</FormLabel>
                            <FormControl>
                                <Input
                                    type="password"
                                    autoComplete="current-password"
                                    value={data.password}
                                    onChange={(e) => setData('password', e.target.value)}
                                    required
                                />
                            </FormControl>
                            <FormMessage />
                        </FormField>

                        <Button type="submit" className="w-full" disabled={processing}>
                            {processing ? 'Signing in…' : 'Sign in'}
                        </Button>
                    </form>
                </div>
            </div>
        </div>
    );
}
