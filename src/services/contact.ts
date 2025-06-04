import { z } from "zod";

// Validation schema
const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  company: z.string().optional(),
  inquiryType: z.enum(["general", "consulting", "collaboration", "other"]),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

export async function submitContactForm(data: {
  name: string;
  email: string;
  company: string;
  inquiryType: string;
  message: string;
}) {
  // ...existing validation and email sending logic...
  const validatedData = contactSchema.parse(data);
  console.log("Contact form submission:", validatedData);
  return { success: true, message: "Message sent successfully" };
}
