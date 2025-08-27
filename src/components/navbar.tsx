'use client';

import dynamic from 'next/dynamic';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import UserToggle from './common/user-toggle';
import { Skeleton } from './ui/skeleton';

const ThemeToggle = dynamic(() => import('./ui/theme-toggle'), {
    loading: () => <Skeleton className='h-10 w-10 rounded-md' />
});

export default function Navbar() {
    const pathname = usePathname();

    // Extract first part of the route (e.g., "/admin", "/doctor", "/patient")
    const rootSegment = pathname?.split('/')[1] || '';

    // Clinic branding (you can replace with logo img)
    const clinicName = 'Smart Clinic Hurghada';

    // Generate breadcrumbs or simple nav items based on rootSegment
    // You can expand this later for nested breadcrumbs if needed
    const navLabel = (() => {
        switch (rootSegment) {
            case 'admin':
                return 'Admin Dashboard';
            case 'doctor':
                return 'Doctor Portal';
            case 'patient':
                return 'Patient Management';
            case 'record':
                return 'Medical Records';
            case 'auth':
                return 'Authentication';
            case 'dashboard':
                return 'Dashboard';
            default:
                return clinicName;
        }
    })();

    return (
        <header className='flex h-16 w-full items-center justify-between border-border border-b bg-white px-5 dark:bg-gray-900'>
            {/* Left: Logo / Branding */}
            <Link
                className='font-extrabold text-gray-900 text-lg dark:text-white'
                href='/'
            >
                {clinicName}
            </Link>

            {/* Center: Dynamic section label */}
            <div className='hidden font-semibold text-gray-700 md:block dark:text-gray-300'>{navLabel}</div>

            {/* Right: Controls */}
            <div className='flex items-center gap-x-3'>
                <ThemeToggle />
                <UserToggle />
            </div>
        </header>
    );
}
