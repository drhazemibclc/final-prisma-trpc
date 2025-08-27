import { NewPatient } from '@/components/new-patient';
import { getSession } from '@/lib/auth';
import { createContext } from '@/server/api/context';
import { appRouter } from '@/trpc/routers/_app';

const Registration = async () => {
    const session = await getSession();
    const userId = session?.user.id;
    const caller = appRouter.createCaller(await createContext({}));

    const data = await caller.patient.getPatientById(userId ?? 'N/A');

    return (
        <div className='flex h-full w-full justify-center'>
            <div className='relative w-full max-w-6xl pb-10'>
                <NewPatient
                    data={data || undefined}
                    type={data ? 'update' : 'create'}
                />
            </div>
        </div>
    );
};

export default Registration;
