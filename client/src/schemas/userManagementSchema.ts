import { z } from "zod";

const isEmailUnique = (email: string) => {
  const existingEmails = ["bappastudent11@gmail.com","bsb1@gmail.com","test@gmail.com"];
  return !existingEmails.includes(email);
};

export const studentSchema = z.object({
  name: z.object({
    firstName: z
      .string({ required_error: "First Name is required" })
      .refine((val) => /^[A-Z]/.test(val), {
        message: "First Name must start with an uppercase letter",
      }),
    middleName: z
      .string()
      .optional()
      .refine((val) => !val || /^[A-Z]/.test(val), {
        message: "Middle Name must start with an uppercase letter",
      }),
    lastName: z
      .string({ required_error: "Last Name is required" })
      .refine((val) => /^[A-Z]/.test(val), {
        message: "Last Name must start with an uppercase letter",
      }),
  }),
  gender: z.enum(["male", "female", "other"], {
    required_error: "Gender is required",
  }),
  dateOfBirth: z.string().optional(),
  email: z
    .string({ required_error: "Email is required" })
    .email({ message: "Valid email is required" })
    .refine((email) => isEmailUnique(email), {
      message: "Email must be unique",
    }),
  contactNo: z.string({ required_error: "Contact number is required" }),
  emergencyContactNo: z.string({
    required_error: "Emergency contact number is required",
  }),
  bloogGroup: z.string({ required_error: "Blood group is required" }),
  presentAddress: z.string({ required_error: "Present address is required" }),
  permanentAddress: z.string({
    required_error: "Permanent address is required",
  }),
  guardian: z.object({
    fatherName: z
      .string({ required_error: "Father's name is required" })
      .refine((val) => /^[A-Z]/.test(val), {
        message: "Father's Name must start with an uppercase letter",
      }),
    fatherOccupation: z.string({
      required_error: "Father's occupation is required",
    }),
    fatherContactNo: z.string({
      required_error: "Father's contact number is required",
    }),
    motherName: z
      .string()
      .optional()
      .refine((val) => !val || /^[A-Z]/.test(val), {
        message: "Mother's Name must start with an uppercase letter",
      }),
    motherOccupation: z
      .string({ required_error: "Mother's occupation is required" })
      .optional(),
    motherContactNo: z
      .string({ required_error: "Mother's contact number is required" })
      .optional(),
  }),
  localGuardian: z.object({
    name: z
      .string({ required_error: "Local guardian's name is required" })
      .refine((val) => /^[A-Z]/.test(val), {
        message: "Local Guardian's Name must start with an uppercase letter",
      }),
    occupation: z.string({
      required_error: "Local guardian's occupation is required",
    }),
    contactNo: z.string({
      required_error: "Local guardian's contact number is required",
    }),
    address: z.string({
      required_error: "Local guardian's address is required",
    }),
  }),
  academicDepartment: z.string({
    required_error: "Academic department is required",
  }),
  admissionSemester: z.string({
    required_error: "Admission semester is required",
  }),
});
