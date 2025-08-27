'use server';


const MAGIC_NUMBER_1 = 200;
const MAGIC_NUMBER_2 = 500;



import { auth } from '@/lib/auth';
import { type ReviewFormValues, reviewSchema } from '@/lib/schema';
import db from '@/server/db';

export async function deleteDataById(
    id: string,

    deleteType: 'doctor' | 'staff' | 'patient' | 'payment' | 'bill'
) {
    try {
        switch (deleteType) {
            case 'doctor':
                await db.doctor.delete({ where: { id } });
                break;
            case 'staff':
                await db.staff.delete({ where: { id } });
                break;
            case 'patient':
                await db.patient.delete({ where: { id } });
                break;
            case 'payment':
                await db.payment.delete({ where: { id: Number(id) } });
        }

        if (deleteType === 'staff' || deleteType === 'patient' || deleteType === 'doctor') {
            await auth.api.deleteUser({ body: {} });
        }

        return {
            success: true,
            message: 'Data deleted successfully',
            status: MAGIC_NUMBER_1
        };
    } catch (error) {
        console.log(error);

        return {
            success: false,
            message: 'Internal Server Error',
            status: MAGIC_NUMBER_2
        };
    }
}

export async function createReview(values: ReviewFormValues) {
    try {
        const validatedFields = reviewSchema.parse(values);

        await db.rating.create({
            data: {
                ...validatedFields
            }
        });

        return {
            success: true,
            message: 'Review created successfully',
            status: MAGIC_NUMBER_1
        };
    } catch (error) {
        console.log(error);

        return {
            success: false,
            message: 'Internal Server Error',
            status: MAGIC_NUMBER_2
        };
    }
}
