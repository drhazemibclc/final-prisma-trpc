const MAGIC_NUMBER_1 = 5;
const MAGIC_NUMBER_2 = 200;
const MAGIC_NUMBER_3 = 404;
const MAGIC_NUMBER_4 = 500;

import { db } from '@/server/db';
import { processAppointments } from '@/types/helper';

import { daysOfWeek } from '../';

export async function getAdminDashboardStats() {
    try {
        const todayDate = new Date().getDay();
        const today = daysOfWeek[todayDate];

        const [totalPatient, totalDoctors, appointments, doctors] = await Promise.all([
            db.patient.count(),
            db.doctor.count(),
            db.appointment.findMany({
                include: {
                    patient: {
                        select: {
                            id: true,
                            lastName: true,
                            firstName: true,
                            img: true,
                            colorCode: true,
                            gender: true,
                            dateOfBirth: true
                        }
                    },
                    doctor: {
                        select: {
                            name: true,
                            img: true,
                            colorCode: true,
                            specialization: true
                        }
                    }
                },
                orderBy: { appointmentDate: 'desc' }
            }),
            db.doctor.findMany({
                where: {
                    workingDays: {
                        some: { day: { equals: today, mode: 'insensitive' } }
                    }
                },
                select: {
                    id: true,
                    name: true,
                    specialization: true,
                    img: true,
                    colorCode: true
                },
                take: MAGIC_NUMBER_1
            })
        ]);

        const { appointmentCounts, monthlyData } = await processAppointments(appointments);

        const last5Records = appointments.slice(0, MAGIC_NUMBER_1);

        return {
            success: true,
            totalPatient,
            totalDoctors,
            appointmentCounts,
            availableDoctors: doctors,
            monthlyData,
            last5Records,
            totalAppointments: appointments.length,
            status: MAGIC_NUMBER_2
        };
    } catch (error) {
        console.log(error);

        return { error: true, message: 'Something went wrong' };
    }
}

export async function getServices() {
    try {
        const data = await db.services.findMany({
            orderBy: { serviceName: 'asc' }
        });

        if (!data) {
            return {
                success: false,
                message: 'Data not found',
                status: MAGIC_NUMBER_3,
                data: []
            };
        }

        return {
            success: true,
            data
        };
    } catch (error) {
        console.log(error);
        return {
            success: false,
            message: 'Internal Server Error',
            status: MAGIC_NUMBER_4
        };
    }
}
