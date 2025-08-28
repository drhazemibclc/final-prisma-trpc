import { createContext } from "@/server/api/context";
import { appRouter } from "@/trpc/routers/_app";
import BloodPressureChart from "./blood-pressure-chart";
import { HeartRateChart } from "./heart-rate-chart";

export default async function ChartContainer({ id }: { id: string }) {
    const caller = appRouter.createCaller(await createContext({}));

    const { data, average, heartRateData, averageHeartRate } = await caller.vitalSigns.getVitalSignData(id.toString());

    return (
        <>
            <BloodPressureChart
                average={average}
                data={data}
            />
            <HeartRateChart
                average={averageHeartRate}
                data={heartRateData}
            />
        </>
    );
}
