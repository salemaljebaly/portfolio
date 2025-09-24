import nodemailer from "nodemailer";
import { z } from "zod";

// Validation schema with custom error messages
const contactSchema = z.object({
  name: z
    .string()
    .min(2, {
      message: "Name must be at least 2 characters long",
    })
    .max(100, {
      message: "Name must not exceed 100 characters",
    }),
  email: z.string().email({
    message: "Please enter a valid email address",
  }),
  company: z.string().optional(),
  inquiryType: z.enum(["general", "consulting", "collaboration", "other"]),
  message: z
    .string()
    .min(10, {
      message: "Message must be at least 10 characters long",
    })
    .max(5000, {
      message: "Message must not exceed 5000 characters",
    }),
});

// Type for validation errors
export type ValidationError = {
  field: string;
  message: string;
};

// Create email transporter with more secure settings
const createTransporter = async () => {
  // Ensure required environment variables are present
  const requiredEnvVars = ["SMTP_USER", "SMTP_PASSWORD"];
  const missingVars = requiredEnvVars.filter(
    (varName) => !process.env[varName],
  );

  if (missingVars.length > 0) {
    throw new Error(
      `Missing required environment variables: ${missingVars.join(", ")}`,
    );
  }

  return nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true, // use TLS
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASSWORD,
    },
    tls: {
      // do not fail on invalid certs
      rejectUnauthorized: false,
    },
  });
};

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

    // Create transporter instance
    const transporter = await createTransporter();

    // Verify SMTP connection
    await transporter.verify();

    // Prepare email content with HTML formatting
    const emailContent = `
      <h2>New Contact Form Submission</h2>
      
      <p><strong>Name:</strong> ${validatedData.name}</p>
      <p><strong>Email:</strong> ${validatedData.email}</p>
      <p><strong>Company:</strong> ${validatedData.company || "Not provided"}</p>
      <p><strong>Inquiry Type:</strong> ${validatedData.inquiryType}</p>
      
      <h3>Message:</h3>
      <p>${validatedData.message.replace(/\n/g, "<br>")}</p>
    `;

    // Send email with both HTML and text versions
    await transporter.sendMail({
      from: {
        name: validatedData.name,
        address: process.env.SMTP_USER!,
      },
      to: process.env.CONTACT_FORM_RECIPIENT || process.env.SMTP_USER,
      subject: `New Contact Form Submission - ${validatedData.inquiryType}`,
      text: validatedData.message,
      html: emailContent,
      replyTo: validatedData.email,
    });

    return {
      success: true,
      message:
        "Thank you! Your message has been sent successfully. We'll get back to you soon.",
    };
  } catch (error) {
    console.error("Error in submitContactForm:", error);

    // Handle Zod validation errors
    if (error instanceof z.ZodError) {
      const validationErrors: ValidationError[] = error.issues.map((issue) => ({
        field: issue.path[0].toString(),
        message: issue.message,
      }));

      return {
        success: false,
        message: "Please correct the following errors:",
        validationErrors,
      };
    }

    // Handle SMTP-specific errors
    if (error instanceof Error && "code" in error) {
      const smtpError = error as Error & { code?: string };
      if (smtpError.code === "EAUTH") {
        console.error("SMTP Authentication Error:", error);
        return {
          success: false,
          message: "Email service configuration error. Please try again later.",
        };
      }
    }

    return {
      success: false,
      message: "Failed to send message. Please try again later.",
    };
  }
}
