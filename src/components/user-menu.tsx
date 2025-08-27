'use client'; 

const _MAGIC_NUMBER_1 = -9;
const _MAGIC_NUMBER_2 = -24;

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { authClient } from '@/lib/auth/auth-client';
import { Button } from './ui/button';
import { Skeleton } from './ui/skeleton';

export default function UserMenu() {
    const router = useRouter();
    const { data: session, isPending } = authClient.useSession();

    if (isPending) {
        return <Skeleton className='hMAGIC_NUMBER_1 wMAGIC_NUMBER_2' />;
    }

    if (!session) {
        return (
            <Button
                asChild
                variant='outline'
            >
                <Link href='/login'>Sign In</Link>
            </Button>
        );
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant='outline'>{session.user.name}</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className='bg-card'>
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>{session.user.email}</DropdownMenuItem>
                <DropdownMenuItem asChild>
                    <Button
                        className='w-full'
                        onClick={() => {
                            authClient.signOut({
                                fetchOptions: {
                                    onSuccess: () => {
                                        router.push('/');
                                    }
                                }
                            });
                        }}
                        variant='destructive'
                    >
                        Sign Out
                    </Button>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
