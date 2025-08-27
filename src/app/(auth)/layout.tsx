import { redirect } from 'next/navigation';
import type { ReactNode } from 'react';
import { getSession } from '@/lib/auth';

export default async function AuthenticationLayout({ children }: Readonly<{ children: ReactNode }>) {
    const session = await getSession();

    if (session) {
        redirect('/dashboard');
    }

    return children;
}
