import { createContext } from "@/server/api/context";
import { appRouter } from "@/trpc/routers/_app";
import { BookAppointment } from "./forms/book-appointment";

export const AppointmentContainer = async ({ id }: { id: string }) => {
    const caller = appRouter.createCaller(await createContext({}));

    const patient = await caller.patient.getPatientById(id);
    const doctorsRes = await caller.doctor.getDoctors();
    const doctors = doctorsRes.data;

    if (!patient || !doctors) return null;

    return (
        <div>
            <BookAppointment
                data={patient}
                doctors={doctors}
            />
        </div>
    );
};
