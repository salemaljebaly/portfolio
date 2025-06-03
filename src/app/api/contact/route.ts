"use server";

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
  try {
    // Validate the data
    const validatedData = contactSchema.parse(data);

    // Here you would normally send an email or save to database
    // For now, we'll just log it and simulate success
    console.log("Contact form submission:", validatedData);

    // In production, you would:
    // 1. Send email using a service like SendGrid, AWS SES, or SMTP
    // 2. Save to database for record keeping
    // 3. Send a confirmation email to the user

    // Example email sending (requires email service setup):
    /*
    const { Resend } = require('resend');
    const resend = new Resend(process.env.RESEND_API_KEY);

    await resend.emails.send({
      from: 'noreply@docker.com.ly',
      to: process.env.CONTACT_EMAIL,
      subject: `New Contact Form Submission from ${validatedData.name}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${validatedData.name}</p>
        <p><strong>Email:</strong> ${validatedData.email}</p>
        <p><strong>Company:</strong> ${validatedData.company || 'Not provided'}</p>
        <p><strong>Inquiry Type:</strong> ${validatedData.inquiryType}</p>
        <p><strong>Message:</strong></p>
        <p>${validatedData.message}</p>
      `
    });
    */

    return { success: true, message: "Message sent successfully" };
  } catch (error) {
    console.error("Contact form error:", error);
    return { success: false, message: "Failed to send message" };
  }
}
