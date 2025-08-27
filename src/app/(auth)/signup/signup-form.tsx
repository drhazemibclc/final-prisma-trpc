'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { signUp } from '@/lib/auth/auth-client';

export const signupSchema = z.object({
    name: z.string().min(1, { message: 'Name is required.' }),
    email: z.string().email({ message: 'Please enter a valid email.' }),
    password: z.string().min(8, { message: 'Password must be at least 8 characters.' })
});

export default function SignupForm() {
    const router = useRouter();
    const [showPassword, setShowPassword] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const form = useForm<z.infer<typeof signupSchema>>({
        resolver: zodResolver(signupSchema),
        defaultValues: { name: '', email: '', password: '' }
    });

    const onSubmit = async (values: z.infer<typeof signupSchema>) => {
        setIsSubmitting(true);

        try {
            await signUp.email(
                {
                    name: values.name,
                    email: values.email,
                    password: values.password
                },
                {
                    onSuccess: () => {
                        toast.success('Account created', {
                            description: 'Welcome! Redirecting to your dashboard...'
                        });
                        router.replace('/dashboard');
                    },
                    onError: (err: { error: Error }) => {
                        toast.error('Signup failed', { description: err.error.message });
                    }
                }
            );
        } catch (err) {
            console.error(err);
            toast.error('Unexpected error occurred.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className='space-y-6'
            >
                {/* Name */}
                <FormField
                    control={form.control}
                    name='name'
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Full Name</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder='John Doe'
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {/* Email */}
                <FormField
                    control={form.control}
                    name='email'
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Email Address</FormLabel>
                            <FormControl>
                                <Input
                                    type='email'
                                    placeholder='johndoe@example.com'
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {/* Password */}
                <FormField
                    control={form.control}
                    name='password'
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Password</FormLabel>
                            <FormControl>
                                <Input
                                    type={showPassword ? 'text' : 'password'}
                                    placeholder='••••••••'
                                    autoComplete='new-password'
                                    {...field}
                                />
                            </FormControl>
                            <FormDescription className='flex items-center justify-between text-xs'>
                                <label className='flex cursor-pointer select-none items-center gap-2'>
                                    <Checkbox
                                        checked={showPassword}
                                        onCheckedChange={checked => setShowPassword(!!checked)}
                                    />
                                    Show password
                                    <textarea /> 
                                </label>
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {/* Submit */}
                <Button
                    type='submit'
                    className='w-full'
                    disabled={isSubmitting}
                >
                    {isSubmitting ? (
                        <span className='flex items-center justify-center gap-2'>
                            <div className='h-4 w-4 animate-spin rounded-full border-2 border-gray-500 border-t-transparent' />
                            Creating account...
                        </span>
                    ) : (
                        'Sign Up'
                    )}
                </Button>
            </form>
        </Form>
    );
}
