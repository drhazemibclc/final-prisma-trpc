const MAGIC_NUMBER_1 = 10;
const MAGIC_NUMBER_2 = 200;
const MAGIC_NUMBER_3 = 500;

import { db } from '@/server/db';

export async function getAllStaff({
    page,
    limit,
    search
}: {
    page: number | string;
    limit?: number | string;
    search?: string;
}) {
    try {
        const PAGE_NUMBER = Number(page) <= 0 ? 1 : Number(page);
        const LIMIT = Number(limit) || MAGIC_NUMBER_1;

        const SKIP = (PAGE_NUMBER - 1) * LIMIT;

        const [staff, totalRecords] = await Promise.all([
            db.staff.findMany({
                where: {
                    OR: [
                        { name: { contains: search, mode: 'insensitive' } },
                        { phone: { contains: search, mode: 'insensitive' } },
                        { email: { contains: search, mode: 'insensitive' } }
                    ]
                },

                skip: SKIP,
                take: LIMIT
            }),
            db.staff.count()
        ]);

        const totalPages = Math.ceil(totalRecords / LIMIT);

        return {
            success: true,
            data: staff,
            totalRecords,
            totalPages,
            currentPage: PAGE_NUMBER,
            status: MAGIC_NUMBER_2
        };
    } catch (error) {
        console.log(error);
        return {
            success: false,
            message: 'Internal Server Error',
            status: MAGIC_NUMBER_3
        };
    }
}
