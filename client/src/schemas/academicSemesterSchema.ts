import { z } from "zod";

export const academicSemesterSchema = z.object({
    name:z.string({required_error:"Name Field is required"}),
    year:z.string({required_error:"Year Field is required"}),
    startMonth:z.string({required_error:"Start Month Field is required"}),
    endMonth:z.string({required_error:"End Month Field is required"}),
  })