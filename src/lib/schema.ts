const MAGIC_NUMBER_1 = 2;
const MAGIC_NUMBER_2 = 30;
const MAGIC_NUMBER_3 = 50;
const MAGIC_NUMBER_4 = 10;
const MAGIC_NUMBER_5 = 5;
const MAGIC_NUMBER_6 = 500;
const MAGIC_NUMBER_7 = 8;
const MAGIC_NUMBER_8 = 6;
const MAGIC_NUMBER_9 = 120;
const MAGIC_NUMBER_10 = 80;

export const MAGIC_2_0 = MAGIC_NUMBER_1;
export const MAGIC_30_1 = MAGIC_NUMBER_2;
export const MAGIC_50_2 = MAGIC_NUMBER_3;
export const MAGIC_10_3 = MAGIC_NUMBER_4;
export const MAGIC_5_4 = MAGIC_NUMBER_5;
export const MAGIC_500_5 = MAGIC_NUMBER_6;
export const MAGIC_8_6 = MAGIC_NUMBER_7;
export const MAGIC_6_7 = MAGIC_NUMBER_8;
export const MAGIC_120_8 = MAGIC_NUMBER_9;
export const MAGIC_80_9 = MAGIC_NUMBER_10;

import { z } from 'zod';

export const PatientFormSchema = z.object({
    firstName: z
        .string()
        .trim()
        .min(MAGIC_2_0, 'First name must be at least MAGIC_2_0 characters')
        .max(MAGIC_30_1, "First name can't be more than MAGIC_50_2 characters"),
    lastName: z
        .string()
        .trim()
        .min(MAGIC_2_0, 'dLast name must be at least MAGIC_2_0 characters')
        .max(MAGIC_30_1, "First name can't be more than MAGIC_50_2 characters"),
    dateOfBirth: z.coerce.date(),
    gender: z.enum(['MALE', 'FEMALE'], { message: 'Gender is required' }),

    phone: z.string().min(MAGIC_10_3, 'Enter phone number').max(MAGIC_10_3, 'Enter phone number'),
    email: z.email('Invalid email address.'),
    address: z
        .string()
        .min(MAGIC_5_4, 'Address must be at least MAGIC_5_4 characters')
        .max(MAGIC_500_5, 'Address must be at most MAGIC_500_5 characters'),
    maritalStatus: z.enum(['married', 'single', 'divorced', 'widowed', 'separated'], {
        message: 'Marital status is required.'
    }),
    nutritionalStatus: z.enum(['normal', 'wasted', 'stunted', 'malnourished', 'obese'], {
        message: 'Nutritional status is required.'
    }),
    emergencyContactName: z
        .string()
        .min(MAGIC_2_0, 'Emergency contact name is required.')
        .max(MAGIC_50_2, 'Emergency contact must be at most MAGIC_50_2 characters'),
    emergencyContactNumber: z.string().min(MAGIC_10_3, 'Enter phone number').max(MAGIC_10_3, 'Enter phone number'),
    relation: z.enum(['mother', 'father', 'husband', 'wife', 'other'], {
        message: 'Relations with contact person required'
    }),
    bloodGroup: z.string().optional(),
    allergies: z.string().optional(),
    medicalConditions: z.string().optional(),
    medicalHistory: z.string().optional(),
    // insuranceProvider: z.string().optional(),
    // insuranceNumber: z.string().optional(),
    // privacyConsent: z
    //     .boolean()
    //     .default(false)
    //     .refine(val => val === true, {
    //         message: 'You must agree to the privacy policy.'
    //     }),
    // serviceConsent: z
    //     .boolean()
    //     .default(false)
    //     .refine(val => val === true, {
    //         message: 'You must agree to the terms of service.'
    //     }),
    // medicalConsent: z
    //     .boolean()
    //     .default(false)
    //     .refine(val => val === true, {
    //         message: 'You must agree to the medical treatment terms.'
    //     }),
    img: z.string().optional()
});

export const AppointmentSchema = z.object({
    doctorId: z.string().min(1, 'Select physician'),
    patientId: z.string().min(1, 'Select patient'),
    type: z.string().min(1, 'Select type of appointment'),
    appointmentDate: z.string().min(1, 'Select appointment date'),
    time: z.string().min(1, 'Select appointment time'),
    note: z.string().optional()
});

export const DoctorSchema = z.object({
    name: z
        .string()
        .trim()
        .min(MAGIC_2_0, 'Name must be at least MAGIC_2_0 characters')
        .max(MAGIC_50_2, 'Name must be at most MAGIC_50_2 characters'),
    phone: z.string().min(MAGIC_10_3, 'Enter phone number').max(MAGIC_10_3, 'Enter phone number'),
    email: z.email('Invalid email address.'),
    address: z
        .string()
        .min(MAGIC_5_4, 'Address must be at least MAGIC_5_4 characters')
        .max(MAGIC_500_5, 'Address must be at most MAGIC_500_5 characters'),
    specialization: z.string().min(MAGIC_2_0, 'Specialization is required.'),
    licenseNumber: z.string().min(MAGIC_2_0, 'License number is required'),
    type: z.enum(['FULL', 'PART'], { message: 'Type is required.' }),
    department: z.string().min(MAGIC_2_0, 'Department is required.'),
    img: z.string().optional(),
    password: z
        .string()
        .min(MAGIC_8_6, {
            message: 'Password must be at least MAGIC_8_6 characters long!'
        })
        .optional()
        .or(z.literal(''))
});

export const workingDaySchema = z.object({
    day: z.enum(['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday']),
    startTime: z.string(),
    closeTime: z.string()
});
export type Day = z.infer<typeof workingDaySchema>;
export const StaffSchema = z.object({
    name: z
        .string()
        .trim()
        .min(MAGIC_2_0, 'Name must be at least MAGIC_2_0 characters')
        .max(MAGIC_50_2, 'Name must be at most MAGIC_50_2 characters'),
    role: z.enum(['STAFF'], { message: 'Role is required.' }),
    phone: z
        .string()
        .min(MAGIC_10_3, 'Contact must be MAGIC_10_3-digits')
        .max(MAGIC_10_3, 'Contact must be MAGIC_10_3-digits'),
    email: z.email('Invalid email address.'),
    address: z
        .string()
        .min(MAGIC_5_4, 'Address must be at least MAGIC_5_4 characters')
        .max(MAGIC_500_5, 'Address must be at most MAGIC_500_5 characters'),
    licenseNumber: z.string().optional(),
    department: z.string().optional(),
    img: z.string().optional(),
    password: z
        .string()
        .min(MAGIC_8_6, {
            message: 'Password must be at least MAGIC_8_6 characters long!'
        })
        .optional()
        .or(z.literal(''))
});
export const StaffAuthSchema = z.object({
    name: z.string().min(1),
    email: z.email(),
    phone: z.string().min(1),
    address: z.string().min(1),
    department: z.string().optional(),
    img: z.string().optional(),
    licenseNumber: z.string().optional(),
    colorCode: z.string().optional(),
    hireDate: z.date().optional(),
    salary: z.number().optional(),
    role: z.enum(['ADMIN', 'DOCTOR', 'STAFF', 'PATIENT']),
    status: z.enum(['ACTIVE', 'INACTIVE', 'DORMANT']).optional(),
    password: z.string().min(MAGIC_6_7, 'Password should be at least MAGIC_6_7 characters long')
});

// Refined Success Response
export const CreateStaffSuccessResponse = z.object({
    success: z.literal(true), // This means 'success' must be true
    msg: z.string(),
    message: z.string().optional(), // Server might sometimes send 'message' even on success
    errors: z.boolean().optional(), // Account for 'errors' if it might be present
    error: z.boolean().optional() // Account for 'error' if it might be present
});

// Refined Error Response
export const CreateStaffErrorResponse = z.object({
    success: z.literal(false), // This means 'success' must be false
    message: z.string(),
    msg: z.string().optional(), // Server might sometimes send 'msg' even on error
    errors: z.boolean().optional(), // Account for 'errors' if it might be present
    error: z.boolean().optional() // Account for 'error' if it might be present
});

// Union of all possible outcomes
export const CreateStaffOutputSchema = z.union([
    CreateStaffSuccessResponse,
    CreateStaffErrorResponse,
    // If there's another "error" shape from the server (e.g., from auth.api.createUser direct error), add it here
    // For example, an object that might come directly from auth.api.createUser:
    z.object({
        success: z.boolean(), // Here, success might be a plain boolean
        message: z.string(),
        errors: z.boolean().optional(),
        error: z.boolean().optional(),
        msg: z.string().optional()
    })
]);

export const VitalSignsSchema = z.object({
    patientId: z.string(),
    medicalId: z.number().optional(),
    bodyTemperature: z.number().optional(),
    systolic: z.number().optional(),
    diastolic: z.number().optional(),
    heartRate: z.string().optional(), // if it's stored as a string (like "MAGIC_120_8-MAGIC_80_9")
    respiratoryRate: z.number().optional(),
    oxygenSaturation: z.number().optional(),
    weight: z.number(),
    height: z.number().optional()
});

export type VitalSignsFormData = z.infer<typeof VitalSignsSchema>;

export const DiagnosisSchema = z.object({
    patientId: z.string(),
    medicalId: z.number(),
    doctorId: z.string(),
    symptoms: z.string({ message: 'Symptoms required' }),
    diagnosis: z.string({ message: 'Diagnosis required' }),
    notes: z.string().optional(),
    prescribedMedications: z.string().optional(),
    followUpPlan: z.string().optional()
});

export const PaymentSchema = z.object({
    id: z.number(),
    billDate: z.date(),
    discount: z.number(),
    totalAmount: z.number()
});

export type PaymentInput = z.infer<typeof PaymentSchema>;

export const PatientBillSchema = z.object({
    billId: z.number(),
    serviceId: z.number(),
    serviceDate: z.string(),
    appointmentId: z.number(),
    quantity: z.string({ message: 'Quantity is required' }),
    unitCost: z.string({ message: 'Unit cost is required' }),
    totalCost: z.string({ message: 'Total cost is required' })
});

export const ServicesSchema = z.object({
    serviceName: z.string({ message: 'Service name is required' }),
    price: z.number({ message: 'Service price is required' }),
    description: z.string({ message: 'Service description is required' })
});

export const PrescriptionSchema = z.object({
    // id will be auto-generated by Drizzle, so it's not typically part of the input schema for creation
    // For updates, it would be z.number().int().positive()

    appointmentId: z.number().int().positive().optional(), // Nullable in Drizzle, so optional here.
    // Use .nullish() if you expect null explicitly.
    doctorId: z.string().min(1, 'Doctor ID is required'),
    dosage: z.string().min(1, 'Dosage is required'),
    duration: z.string().min(1, 'Duration is required'),
    frequency: z.string().min(1, 'Frequency is required'),
    instructions: z.string().optional().nullable(), // Optional and can be null
    issuedDate: z.coerce.date().default(() => new Date()), // Automatically set to current date if not provided
    medicationName: z.string().min(1, 'Medication name is required'),
    patientId: z.string().min(1, 'Patient ID is required'),
    prescriptionName: z.string().min(1, 'Prescription name is required'),
    status: z.enum(['active', 'inactive', 'archived', 'pending']).default('active') // Example statuses. Adjust to your actual needs.
    // createdAt and updatedAt are handled by Drizzle timestamps
});

export const VaccinationSchema = z.object({
    // id will be auto-generated by Drizzle
    administeredBy: z.string().min(1, 'Administering staff ID is required').optional().nullable(), // Nullable in Drizzle
    administeredDate: z.coerce.date().refine(date => date <= new Date(), {
        // Administered date cannot be in the future
        message: 'Administered date cannot be in the future'
    }),
    nextDueDate: z.coerce.date().optional().nullable(), // Nullable
    notes: z.string().optional().nullable(), // Nullable
    patientId: z.string().min(1, 'Patient ID is required'),
    vaccineName: z.string().min(1, 'Vaccine name is required')
    // createdAt and updatedAt are handled by Drizzle timestamps
});

export const WHOGrowthStandardSchema = z.object({
    // id will be auto-generated by Drizzle
    patientId: z.string().min(1, 'Patient ID is required'),

    ageDays: z.number().int().min(0, 'Age in days cannot be negative'),
    gender: z.enum(['MALE', 'FEMALE'], {
        message: "Gender must be 'MALE' or 'FEMALE'"
    }), // Matches your Gender enum
    lValue: z.number(), // Assuming it can't be zero. Adjust if needed.
    measurementType: z.string().min(1, 'Measurement type is required'),
    mValue: z.number(),
    sValue: z.number(), // Assuming it can't be zero. Adjust if needed.

    // Standard deviation values
    sd0: z.number(),
    sd1neg: z.number(),
    sd1pos: z.number(),
    sd2neg: z.number(),
    sd2pos: z.number(),
    sd3neg: z.number(),
    sd3pos: z.number(),
    sd4neg: z.number().optional().nullable(), // Nullable
    sd4pos: z.number().optional().nullable() // Nullable
});

export const whoGrowthQuerySchema = z.object({
    gender: z.enum(['MALE', 'FEMALE']),
    measurementType: z.enum(['WFA', 'HFA', 'HcFA'])
});

export type WhoGrowthQuery = z.infer<typeof whoGrowthQuerySchema>;

export const PatientCreateInputSchema = z.object({
    pid: z.string(), // This 'pid' will be the "new-patient" string or an existing ID
    data: PatientFormSchema // The actual form data for the patient
});

// Schema for updating an existing patient
export const PatientUpdateInputSchema = z.object({
    pid: z.string(), // The ID of the patient to update (required)
    data: PatientFormSchema.partial() // The data to update, making fields optional for partial updates
});

export const DoctorAuthSchema = DoctorSchema.extend({
    password: z.string().min(MAGIC_6_7, 'Password should be at least MAGIC_6_7 characters long')
});

// Define a common success message output schema
export const SuccessOutputSchema = z.object({
    msg: z.string()
});

export const reviewSchema = z.object({
    patientId: z.string(),
    staffId: z.string(),
    rating: z.number().min(1).max(MAGIC_5_4),
    comment: z
        .string()
        .min(1, 'Review must be at least MAGIC_10_3 characters long')
        .max(MAGIC_500_5, 'Review must not exceed MAGIC_500_5 characters')
});

export type ReviewFormValues = z.infer<typeof reviewSchema>;
export type DiagnosisFormData = z.infer<typeof DiagnosisSchema>;
export const AddNewBillInputSchema = PatientBillSchema.extend({
    appointmentId: z.number().int().positive().optional(), // Nullable in Drizzle, so optional here.
    billId: z
        .union([z.number(), z.null(), z.undefined()])
        .optional()
        .transform(val => (val === 0 ? undefined : val))
});
export const WorkingDaysSchema = z.object({
    day: z.enum(['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday']),
    startTime: z.string(),
    closeTime: z.string()
});
