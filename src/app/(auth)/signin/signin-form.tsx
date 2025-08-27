/* eslint-disable @next/next/no-img-element */
'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { OctagonAlertIcon } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation'; // <-- import router
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { FaGithub } from 'react-icons/fa';
import { toast } from 'sonner';
import { z } from 'zod';
import { Alert, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { authClient } from '@/lib/auth/auth-client';

const signInSchema = z.object({
    email: z.email(),
    password: z.string().min(1, {
        message: 'Password is required'
    })
});

export const SignInView = () => {
    const [error, setError] = useState<string | null>(null);
    const [pending, setPending] = useState(false);
    const router = useRouter();
    const form = useForm<z.infer<typeof signInSchema>>({
        resolver: zodResolver(signInSchema),
        defaultValues: {
            email: '',
            password: ''
        }
    });

    const onSubmit = (values: z.infer<typeof signInSchema>) => {
        setError(null);
        setPending(true);

        authClient.signIn.email(
            {
                email: values.email,
                password: values.password,
                callbackURL: '/dashboard' // <-- redirect here after signin
            },
            {
                onSuccess: () => {
                    setPending(false);
                    router.push('/dashboard'); // <-- client-side navigation
                },
                onError: ({ error }: { error: Error }) => {
                    setPending(false);
                    setError(error.message);
                    toast.error('Login failed', { description: error.message });
                }
            }
        );
    };

    const signInWithSocial = (provider: 'github') => {
        setError(null);
        setPending(true);

        authClient.signIn.social(
            {
                provider,
                callbackURL: '/'
            },
            {
                onSuccess: () => {
                    setPending(false);
                },
                onError: ({ error }: { error: Error }) => {
                    setPending(false);
                    setError(error.message);
                    toast.error('Login failed', { description: error.message });
                }
            }
        );
    };

    return (
        <div className='flex flex-col gap-6'>
            <Card className='overflow-hidden p-0'>
                <CardContent className='grid p-0 md:grid-cols-3'>
                    <Form {...form}>
                        <form
                            className='p-6 md:p-8'
                            onSubmit={form.handleSubmit(onSubmit)}
                        >
                            <div className='flex flex-col gap-6'>
                                <div className='flex flex-col items-center text-center'>
                                    <h1 className='font-bold text-2xl'>Welcome back</h1>
                                    <p className='text-balance text-muted-foreground'>Sign in to your account</p>
                                </div>

                                <div className='grid gap-3'>
                                    <FormField
                                        control={form.control}
                                        name='email'
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Email</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        placeholder='your.email@example.com'
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>

                                <div className='grid gap-3'>
                                    <FormField
                                        control={form.control}
                                        name='password'
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Password</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        placeholder='* * * * * * * *'
                                                        type='password'
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                                {!!error && (
                                    <Alert className='border-none bg-destructive/10'>
                                        <OctagonAlertIcon className='!text-destructive h-4 w-4' />
                                        <AlertTitle>{error}</AlertTitle>
                                    </Alert>
                                )}
                                <Button
                                    className='w-full'
                                    disabled={pending}
                                    type='submit'
                                >
                                    Sign In
                                </Button>
                                <div className='relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-border after:border-t'>
                                    <span className='relative z-10 bg-card px-2 text-muted-foreground'>
                                        Or continue with
                                    </span>
                                </div>

                                <div className='grid grid-cols-1 gap-4'>
                                    <Button
                                        className='w-full'
                                        disabled={pending}
                                        onClick={() => signInWithSocial('github')}
                                        type='button'
                                        variant='outline'
                                    >
                                        <FaGithub className='size-5' />
                                        Github
                                    </Button>
                                </div>

                                <div className='text-center text-sm'>
                                    Don&apos;t have an account?{' '}
                                    <Link
                                        className='underline underline-offset-4'
                                        href='/signup'
                                    >
                                        Sign Up
                                    </Link>
                                </div>
                            </div>
                        </form>
                    </Form>
                    <div className='relative col-span-2 hidden flex-col items-center justify-center gap-y-4 bg-radial from-sidebar-accent to-sidebar md:flex'>
                        <Image
                            alt='Better nextjs'
                            className='object-cover'
                            fill
                            priority
                            sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
                            src='/images/clinic.webp'
                        />
                    </div>
                </CardContent>
            </Card>

            <div className='text-balance text-center text-muted-foreground text-xs *:[a]:underline *:[a]:underline-offset-4 *:[a]:hover:text-primary'>
                By signing up, you agree to our <a href='/#'>Terms of Service</a> and <a href='/#'>Privacy Policy</a>.
            </div>
        </div>
    );
};
