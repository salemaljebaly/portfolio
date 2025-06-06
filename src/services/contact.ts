import nodemailer from "nodemailer";
import { z } from "zod";

// Validation schema
const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  company: z.string().optional(),
  inquiryType: z.enum(["general", "consulting", "collaboration", "other"]),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

// Create transporter outside the function to reuse the connection
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
});

export async function submitContactForm(data: {
  name: string;
  email: string;
  company: string;
  inquiryType: string;
  message: string;
}) {
  try {
    // Validate the input data
    const validatedData = contactSchema.parse(data);

    // Prepare email content
    const emailContent = `
      New Contact Form Submission
      
      Name: ${validatedData.name}
      Email: ${validatedData.email}
      Company: ${validatedData.company || "Not provided"}
      Inquiry Type: ${validatedData.inquiryType}
      
      Message:
      ${validatedData.message}
    `;

    // Send email
    await transporter.sendMail({
      from: process.env.SMTP_USER,
      to: process.env.CONTACT_FORM_RECIPIENT || process.env.SMTP_USER,
      subject: `New Contact Form Submission - ${validatedData.inquiryType}`,
      text: emailContent,
      replyTo: validatedData.email,
    });

    return {
      success: true,
      message:
        "Thank you! Your message has been sent successfully. We'll get back to you soon.",
    };
  } catch (error) {
    console.error("Error in submitContactForm:", error);
    if (error instanceof z.ZodError) {
      return {
        success: false,
        message: "Invalid form data. Please check your inputs and try again.",
      };
    }
    return {
      success: false,
      message: "Failed to send message. Please try again later.",
    };
  }
}
