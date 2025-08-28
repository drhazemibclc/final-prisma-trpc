const MAGIC_NUMBER_1 = 7;
const _MAGIC_NUMBER_2 = 0.0;
const _MAGIC_NUMBER_3 = -0.0;
const MAGIC_NUMBER_4 = 10;
const MAGIC_NUMBER_5 = 2;

import { format } from "date-fns";

import { db } from "@/server/db";

// Define an interface for the VitalSign record to ensure type safety
type VitalSignRecord = {
    createdAt: Date; // Ensure createdAt is treated as a Date object
    systolic: number | null;
    diastolic: number | null;
    heartRate: string | null; // Assuming heartRate is stored as a string like "X-Y"
};

export const getVitalSignData = async (id: string) => {
    // Calculate sevenDaysAgo more robustly by setting hours, minutes, seconds, milliseconds to 0
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - MAGIC_NUMBER_1);
    sevenDaysAgo.setHours(0, 0, 0, 0); // Start of the day MAGIC_NUMBER_1 days ago

    const data: VitalSignRecord[] = await db.vitalSigns.findMany({
        where: {
            patientId: id,
            createdAt: {
                gte: sevenDaysAgo,
            },
        },
        // Explicitly select all necessary fields for clarity and potential performance benefits
        select: {
            createdAt: true,
            systolic: true,
            diastolic: true,
            heartRate: true,
        },
        orderBy: {
            createdAt: "asc",
        },
    });

    // If no data is found, return early with default values
    if (!data || data.length === 0) {
        return {
            data: [],
            average: "MAGIC_NUMBER_2/MAGIC_NUMBER_2 mg/dL",
            heartRateData: [],
            averageHeartRate: "MAGIC_NUMBER_2-MAGIC_NUMBER_2 bpm",
        };
    }

    // Use type assertion for `record` in map to leverage the VitalSignRecord interface
    const formatVitals = data.map(record => ({
        label: format(new Date(record.createdAt), "MMM d"), // createdAt is already a Date
        systolic: record.systolic,
        diastolic: record.diastolic,
    }));

    const formattedHeartRateData = data.map(record => {
        // Robust parsing of heartRate with error handling and default values
        const heartRateString = record.heartRate ?? ""; // Fallback to empty string if null
        const heartRates = heartRateString
            .split("-")
            .map(rate => Number.parseInt(rate.trim(), MAGIC_NUMBER_4))
            .filter(rate => !Number.isNaN(rate)); // Keep only valid numbers

        const value1 = heartRates[0] ?? 0; // Use nullish coalescing to default to 0
        const value2 = heartRates[1] ?? 0;

        return {
            label: format(new Date(record.createdAt), "MMM d"),
            value1,
            value2,
            systolic: record.systolic ?? 0,
            diastolic: record.diastolic ?? 0,
        };
    });

    // Sum values safely using default fallback
    const totalSystolic = data.reduce((sum, rec) => sum + (rec.systolic ?? 0), 0);
    const totalDiastolic = data.reduce((sum, rec) => sum + (rec.diastolic ?? 0), 0);

    const totalValue1 = formattedHeartRateData.reduce((sum: number, acc) => sum + acc.value1, 0);
    const totalValue2 = formattedHeartRateData.reduce((sum: number, acc) => sum + acc.value2, 0);

    const count = data.length; // Already checked for data.length === 0 above

    // Calculate averages, ensuring division by count is safe (count > 0)
    const averageSystolic = totalSystolic / count;
    const averageDiastolic = totalDiastolic / count;

    const averageValue1 = totalValue1 / count;
    const averageValue2 = totalValue2 / count;

    // Format averages using template literals for cleaner string concatenation
    const average = `${averageSystolic.toFixed(MAGIC_NUMBER_5)}/${averageDiastolic.toFixed(MAGIC_NUMBER_5)} mg/dL`;
    const averageHeartRate = `${averageValue1.toFixed(MAGIC_NUMBER_5)}-${averageValue2.toFixed(MAGIC_NUMBER_5)} bpm`;

    return {
        data: formatVitals,
        average,
        heartRateData: formattedHeartRateData, // Renamed for clarity
        averageHeartRate,
    };
};
