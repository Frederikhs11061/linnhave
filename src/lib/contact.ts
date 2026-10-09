import { z } from "zod";
export const contactSchema = z
  .object({
    name: z.string().trim().min(1).max(100),
    email: z.email().max(254),
    phone: z
      .string()
      .max(30)
      .regex(/^[+\d\s()-]*$/),
    subject: z.enum([
      "Et nyt hjem",
      "Renovering eller tømrerarbejde",
      "En indledende snak",
    ]),
    message: z.string().trim().min(10).max(5000),
    website: z.string().max(200),
  })
  .strict();
