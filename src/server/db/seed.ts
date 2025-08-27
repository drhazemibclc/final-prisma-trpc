import { faker } from '@faker-js/faker';
import { PrismaClient } from '@prisma/client';

import 'dotenv/config';
import { type Prisma, Role, ServiceCategory } from 'prisma/generated/client';

const db = new PrismaClient();
// Helper function to get random enum value
function getRandomEnumValue<T extends Record<string, string>>(enumObject: T): T[keyof T] {
    const enumValues = Object.values(enumObject);
    const randomIndex = faker.number.int({ min: 0, max: enumValues.length - 1 });
    return enumValues[randomIndex] as T[keyof T];
}

async function clearExistingData() {
    await db.auditLog.deleteMany();
    await db.rating.deleteMany();
    await db.payment.deleteMany();
    await db.patientBills.deleteMany();
    await db.labTest.deleteMany();
    await db.prescription.deleteMany();
    await db.diagnosis.deleteMany();
    await db.vitalSigns.deleteMany();
    await db.medicalRecords.deleteMany();
    await db.appointment.deleteMany();
    await db.workingDays.deleteMany();
    await db.doctor.deleteMany();
    await db.staff.deleteMany();
    await db.patient.deleteMany();
    await db.services.deleteMany();
    await db.wHOGrowthStandard.deleteMany();
    await db.user.deleteMany();
}

async function seedInternalUsers(NUM_USERS_TO_GENERATE: number) {
    const usersToCreate: Prisma.UserCreateManyInput[] = Array.from({
        length: NUM_USERS_TO_GENERATE
    }).map(() => ({
        id: faker.string.uuid(),
        email: faker.internet.email(),
        name: faker.person.fullName(),
        emailVerified: faker.datatype.boolean(),
        createdAt: faker.date.anytime(),
        updatedAt: faker.date.recent(),
        role: getRandomEnumValue(Role)
    }));
    const internalUsers = await db.user.createManyAndReturn({
        data: usersToCreate
    });
    return internalUsers;
}

async function seedServices(NUM_SERVICES: number) {
    const servicesData: Prisma.ServicesCreateInput[] = Array.from({
        length: NUM_SERVICES
    }).map(() => ({
        serviceName: faker.commerce.productName(),
        description: faker.commerce.productDescription(),
        price: Number.parseFloat(faker.commerce.price({ min: 10, max: 500, dec: 2 })),
        category: getRandomEnumValue(ServiceCategory),
        duration: faker.number.int({ min: 15, max: 120 }),
        isAvailable: faker.datatype.boolean()
    }));
    const services = await db.services.createManyAndReturn({
        data: servicesData
    });
    return services;
}

// ... (repeat this pattern for each major seeding step, e.g. seedPatients, seedDoctors, seedStaff, etc.)
// For brevity, only a few are shown here. You should extract each major block into its own function.

async function main() {
    console.log('Start seeding...');
    await clearExistingData();

    const NUM_USERS_TO_GENERATE = 70;
    const NUM_SERVICES = 20;

    let services: Prisma.ServicesGetPayload<true>[] = [];
    let internalUsers: Prisma.UserGetPayload<true>[] = [];

    internalUsers = await seedInternalUsers(NUM_USERS_TO_GENERATE);
    console.log(`Created ${internalUsers.length} internal users.`);

    services = await seedServices(NUM_SERVICES);
    console.log(`Created ${services.length} services.`);

    // ... (call each seeding function in order, passing required arguments and updating variables as needed)
    // For example:
    // patients = await seedPatients(...);
    // doctors = await seedDoctors(...);
    // staff = await seedStaff(...);
    // appointments = await seedAppointments(...);
    // medicalRecords = await seedMedicalRecords(...);
    // etc.

    // After all seeding steps
    console.log('Seeding finished.');
}

main()
    .catch(e => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await db.$disconnect();
    });
