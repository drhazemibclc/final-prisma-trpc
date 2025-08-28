import { createTRPCRouter, protectedProcedure, publicProcedure } from "@/server/api/trpc";
import { adminRouter } from "./Admin.router";
import { appointmentRouter } from "./Appointment.router";
import { doctorRouter } from "./Doctor.router";
import { medicalRecordsRouter } from "./MedicalRecords.router";
import { patientRouter } from "./Patient.router";
import { paymentsRouter } from "./Payment.router";
import { staffRouter } from "./Staff.router";
import { vitalSignsRouter } from "./VitalSigns.router";

export const appRouter = createTRPCRouter({
    healthCheck: publicProcedure.query(() => {
        return "OK";
    }),
    privateData: protectedProcedure.query(({ ctx }) => {
        return {
            message: "This is private",
            user: ctx.session.user,
        };
    }),
    vitalSigns: vitalSignsRouter,
    staff: staffRouter,
    payment: paymentsRouter,
    patient: patientRouter,
    medicalRecords: medicalRecordsRouter,
    doctor: doctorRouter,
    appointment: appointmentRouter,
    admin: adminRouter,
});
export type AppRouter = typeof appRouter;
