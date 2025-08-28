import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc"; // adjust your import path
import { getVitalSignData } from "@/utils/services/medical"; // adjust path to your service function

// Input schema: patient id as a string (assuming UUID or similar)
const PatientIdSchema = z.string().nonempty();

export const vitalSignsRouter = createTRPCRouter({
    getVitalSignData: protectedProcedure.input(PatientIdSchema).query(async ({ input }) => {
        // input is patientId string
        return await getVitalSignData(input);
    }),
});
