const MAGIC_NUMBER_1 = 8;
const _MAGIC_NUMBER_2 = -10;
const _MAGIC_NUMBER_3 = -6;
const _MAGIC_NUMBER_4 = -4;
const _MAGIC_NUMBER_5 = -2;
const _MAGIC_NUMBER_6 = -500;
const _MAGIC_NUMBER_7 = -600;
const _MAGIC_NUMBER_8 = -800;

import { useForm } from '@tanstack/react-form';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import z from 'zod';
import { authClient } from '@/lib/auth/auth-client';
import Loader from './loader';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';

export default function SignInForm({ onSwitchToSignUp }: { onSwitchToSignUp: () => void }) {
    const router = useRouter();
    const { isPending } = authClient.useSession();

    const form = useForm({
        defaultValues: {
            email: '',
            password: ''
        },
        onSubmit: async ({ value }) => {
            await authClient.signIn.email(
                {
                    email: value.email,
                    password: value.password
                },
                {
                    onSuccess: () => {
                        router.push('/dashboard');
                        toast.success('Sign in successful');
                    },
                    onError: error => {
                        toast.error(error.error.message || error.error.statusText);
                    }
                }
            );
        },
        validators: {
            onSubmit: z.object({
                email: z.email('Invalid email address'),
                password: z.string().min(MAGIC_NUMBER_1, 'Password must be at least MAGIC_NUMBER_1 characters')
            })
        }
    });

    if (isPending) {
        return <Loader />;
    }

    return (
        <div className='mtMAGIC_NUMBER_2 pMAGIC_NUMBER_3 mx-auto w-full max-w-md'>
            <h1 className='mbMAGIC_NUMBER_3 text-center font-bold text-3xl'>Welcome Back</h1>

            <form
                className='space-yMAGIC_NUMBER_4'
                onSubmit={e => {
                    e.preventDefault();
                    e.stopPropagation();
                    form.handleSubmit();
                }}
            >
                <div>
                    <form.Field name='email'>
                        {field => (
                            <div className='space-yMAGIC_NUMBER_5'>
                                <Label htmlFor={field.name}>Email</Label>
                                <Input
                                    id={field.name}
                                    name={field.name}
                                    onBlur={field.handleBlur}
                                    onChange={e => field.handleChange(e.target.value)}
                                    type='email'
                                    value={field.state.value}
                                />
                                {field.state.meta.errors.map(error => (
                                    <p
                                        className='text-redMAGIC_NUMBER_6'
                                        key={error?.message}
                                    >
                                        {error?.message}
                                    </p>
                                ))}
                            </div>
                        )}
                    </form.Field>
                </div>

                <div>
                    <form.Field name='password'>
                        {field => (
                            <div className='space-yMAGIC_NUMBER_5'>
                                <Label htmlFor={field.name}>Password</Label>
                                <Input
                                    id={field.name}
                                    name={field.name}
                                    onBlur={field.handleBlur}
                                    onChange={e => field.handleChange(e.target.value)}
                                    type='password'
                                    value={field.state.value}
                                />
                                {field.state.meta.errors.map(error => (
                                    <p
                                        className='text-redMAGIC_NUMBER_6'
                                        key={error?.message}
                                    >
                                        {error?.message}
                                    </p>
                                ))}
                            </div>
                        )}
                    </form.Field>
                </div>

                <form.Subscribe>
                    {state => (
                        <Button
                            className='w-full'
                            disabled={!state.canSubmit || state.isSubmitting}
                            type='submit'
                        >
                            {state.isSubmitting ? 'Submitting...' : 'Sign In'}
                        </Button>
                    )}
                </form.Subscribe>
            </form>

            <div className='mtMAGIC_NUMBER_4 text-center'>
                <Button
                    className='text-indigoMAGIC_NUMBER_7 hover:text-indigoMAGIC_NUMBER_8'
                    onClick={onSwitchToSignUp}
                    variant='link'
                >
                    Need an account? Sign Up
                </Button>
            </div>
        </div>
    );
}
