import { redirect } from 'next/navigation';
import Navbar from '@/components/navbar';
import { Sidebar } from '@/components/sidebar';
import { getCachedSession, getCachedUserRole } from '@/lib/auth/session';

export default async function ProtectedLayout({ children }: { children: React.ReactNode }) {
    const session = await getCachedSession();

    if (!session) {
        redirect('/signin');
    }

    // Check if user has a valid role
    const userRole = await getCachedUserRole();
    const hasValidRole = userRole && ['ADMIN', 'DOCTOR', 'PATIENT', 'STAFF'].includes(userRole);

    if (!hasValidRole) {
        redirect('/');
    }

    return (
        <div className='flex h-screen w-full bg-gray-200'>
            <div className='w-[14%] md:w-[8%] lg:w-[16%] xl:w-[14%]'>
                <Sidebar />
            </div>
            <div className='flex w-[86%] flex-col bg-[#F7F8FA] md:w-[92%] lg:w-[84%] xl:w-[86%]'>
                <Navbar />
                <div className='h-full w-full overflow-y-scroll p-2'>{children}</div>
            </div>
        </div>
    );
}
