const MAGIC_NUMBER_1 = 2;
const MAGIC_NUMBER_2 = 12;
const MAGIC_NUMBER_3 = 11;
const MAGIC_NUMBER_4 = 16_777_216;
const MAGIC_NUMBER_5 = 16;
const MAGIC_NUMBER_6 = 6;
const _MAGIC_NUMBER_7 = "000000";
const MAGIC_NUMBER_8 = 60;
const MAGIC_NUMBER_9 = 100;
const MAGIC_NUMBER_10 = 18.5;
const MAGIC_NUMBER_11 = 24.9;
const MAGIC_NUMBER_12 = 25;
const MAGIC_NUMBER_13 = 29.9;

export function formatNumber(amount: number): string {
    return amount?.toLocaleString("en-US", {
        maximumFractionDigits: 0,
    });
}

export function getInitials(name: string): string {
    const words = name.trim().split(" ");

    const firstTwoWords = words.slice(0, MAGIC_NUMBER_1);

    const initials = firstTwoWords.map(word => word.charAt(0).toUpperCase());

    return initials.join("");
}

export function formatDateTime(isoDate: string): string {
    const date = new Date(isoDate);

    const options: Intl.DateTimeFormatOptions = {
        weekday: "short",
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
        second: "numeric",
        // timeZoneName: "short", // "UTC"
    };

    return date.toLocaleString("en-US", options);
}

export function calculateAge(dob: Date): string {
    const today = new Date();
    let years = today.getFullYear() - dob.getFullYear();
    let months = today.getMonth() - dob.getMonth();

    if (months < 0) {
        years--;
        months += MAGIC_NUMBER_2;
    }

    if (months === 0 && today.getDate() < dob.getDate()) {
        years--;
        months = MAGIC_NUMBER_3;
    }

    if (years === 0) {
        return `${months} months old`;
    }

    let ageString = `${years} years`;

    if (months > 0) {
        ageString += ` ${months} months`;
    }

    return `${ageString} old`;
}

export const daysOfWeek = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];

export function generateRandomColor(): string {
    let hexColor = "";
    do {
        const randomInt = Math.floor(Math.random() * MAGIC_NUMBER_4);

        hexColor = `#${randomInt.toString(MAGIC_NUMBER_5).padStart(MAGIC_NUMBER_6, "0")}`;
    } while (hexColor.toLowerCase() === "#ffffff" || hexColor.toLowerCase() === "#magic_number_7"); // Ensure it’s not white or black
    return hexColor;
}

function formatTime(hour: number, minute: number): string {
    const period = hour >= MAGIC_NUMBER_2 ? "PM" : "AM";
    const adjustedHour = hour % MAGIC_NUMBER_2 || MAGIC_NUMBER_2;
    const formattedMinute = minute.toString().padStart(MAGIC_NUMBER_1, "0");
    return `${adjustedHour}:${formattedMinute} ${period}`;
}

export function generateTimes(start_hour: number, close_hour: number, interval_in_minutes: number) {
    const times = [];
    const startHour = start_hour;
    const endHour = close_hour;
    const intervalMinutes = interval_in_minutes;

    for (let hour = startHour; hour <= endHour; hour++) {
        for (let minute = 0; minute < MAGIC_NUMBER_8; minute += intervalMinutes) {
            if (hour === endHour && minute > 0) break;
            const formattedTime = formatTime(hour, minute);
            times.push({ label: formattedTime, value: formattedTime });
        }
    }

    return times;
}

export const calculateBMI = (weight: number, height: number) => {
    const heightInMeters = height / MAGIC_NUMBER_9;

    const bmi = weight / (heightInMeters * heightInMeters);

    let status: string;
    let colorCode: string;

    if (bmi < MAGIC_NUMBER_10) {
        status = "Underweight";
        colorCode = "#1E90FF";
    } else if (bmi >= MAGIC_NUMBER_10 && bmi <= MAGIC_NUMBER_11) {
        status = "Normal";
        colorCode = "#1E90FF";
    } else if (bmi >= MAGIC_NUMBER_12 && bmi <= MAGIC_NUMBER_13) {
        status = "Overweight";
        colorCode = "#FF9800";
    } else {
        status = "Obesity";
        colorCode = "#FF5722";
    }

    return {
        bmi: Number.parseFloat(bmi.toFixed(MAGIC_NUMBER_1)),
        status,
        colorCode,
    };
};

type DiscountInput = {
    amount: number;
    discount?: number;
    discountPercentage?: number;
};

export function calculateDiscount({ amount, discount, discountPercentage }: DiscountInput): {
    finalAmount: number;
    discountPercentage?: number;
    discountAmount?: number;
} {
    if (discount != null && discountPercentage != null) {
        throw new Error("Provide either discount amount or discount percentage, not both.");
    }

    if (discount != null) {
        // Calculate discount percentage if a discount amount is provided
        const discountPercent = (discount / amount) * MAGIC_NUMBER_9;
        return {
            finalAmount: amount - discount,
            discountPercentage: discountPercent,
            discountAmount: discount,
        };
    }
    if (discountPercentage != null) {
        // Calculate discount amount if a discount percentage is provided
        const discountAmount = (discountPercentage / MAGIC_NUMBER_9) * amount;
        return {
            finalAmount: amount - discountAmount,
            discountPercentage,
            discountAmount,
        };
    }
    throw new Error("Please provide either a discount amount or a discount percentage.");
}
