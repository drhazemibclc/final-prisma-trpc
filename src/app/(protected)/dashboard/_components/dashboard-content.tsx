'use client';

import type { Session, User } from 'better-auth';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState, useTransition } from 'react';
import { trpc } from '@/trpc/client';
import { DashboardSkeleton } from './dashboard-skeleton';

type DashboardContentProps = {
    session: Session;
    user: User | null;
    userRole: string;
};

export function DashboardContent({ user, userRole }: DashboardContentProps) {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [isPending, startTransition] = useTransition();

    const page = Number(searchParams.get('p')) || 1;
    const searchQuery = searchParams.get('q') || '';
    const id = searchParams.get('id') ?? undefined;

    const [searchValue, setSearchValue] = useState(searchQuery);

    const {
        data: appointmentsData,
        isLoading,
        error
    } = trpc.appointment.getPatientAppointments.useQuery({
        page,
        search: searchQuery,
        id,
        limit: 10
    });

    const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        startTransition(() => {
            router.push(`?p=1&q=${encodeURIComponent(searchValue)}`);
        });
    };

    const handlePageChange = (newPage: number) => {
        startTransition(() => {
            router.push(`?p=${newPage}&q=${encodeURIComponent(searchQuery)}`);
        });
    };

    if (isLoading) return <DashboardSkeleton />;

    if (error)
        return (
            <div
                className='py-8 text-center'
                role='alert'
            >
                <p className='text-red-500'>Error loading appointments: {error.message}</p>
            </div>
        );

    if (!appointmentsData?.data?.length)
        return (
            <div className='py-8 text-center'>
                <p className='text-gray-500'>No appointments found</p>
            </div>
        );

    return (
        <div className='space-y-6'>
            <div className='flex items-center justify-between'>
                <h1 className='font-bold text-2xl'>
                    Dashboard — {user?.name ?? 'Unknown'} ({userRole})
                </h1>
                <form
                    className='flex items-center space-x-2'
                    onSubmit={handleSearch}
                >
                    <input
                        aria-label='Search appointments'
                        className='rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500'
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchValue(e.target.value)}
                        placeholder='Search appointments...'
                        type='text'
                        value={searchValue}
                    />
                    <button
                        className='rounded-md bg-blue-500 px-3 py-2 text-white hover:bg-blue-600'
                        disabled={isPending}
                        type='submit'
                    >
                        Search
                    </button>
                </form>
            </div>
            {appointmentsData.data.map(appointment => (
                <div
                    className='px-6 py-4'
                    key={appointment.id}
                >
                    <div className='flex items-center justify-between'>
                        <div>
                            <p className='font-medium text-gray-900 text-sm'>
                                {appointment.patient?.firstName} {appointment.patient?.lastName}
                            </p>
                            <p className='text-gray-500 text-sm'>
                                {appointment.doctor?.name} • {appointment.type}
                            </p>
                        </div>
                        <div className='text-right'>
                            <p className='font-medium text-gray-900 text-sm'>
                                {new Date(appointment.appointmentDate).toLocaleDateString()}
                            </p>
                            <p className='text-gray-500 text-sm'>{appointment.time}</p>
                        </div>
                    </div>
                </div>
            ))}

            {appointmentsData.totalPages > 1 && (
                <nav
                    aria-label='Pagination'
                    className='flex justify-center space-x-2'
                >
                    {Array.from({ length: appointmentsData.totalPages }).map((_, i) => {
                        const pageNumber = i + 1;
                        return (
                            <button
                                aria-current={page === pageNumber ? 'page' : undefined}
                                className={`rounded px-3 py-2 ${
                                    page === pageNumber
                                        ? 'bg-blue-500 text-white'
                                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                                }`}
                                disabled={isPending}
                                key={`page-${pageNumber}`}
                                onClick={() => handlePageChange(pageNumber)}
                                type='button'
                            >
                                {pageNumber}
                            </button>
                        );
                    })}
                </nav>
            )}
        </div>
    );
}
