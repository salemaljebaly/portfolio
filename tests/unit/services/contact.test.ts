import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { submitContactForm } from "@/services/contact";
import nodemailer from "nodemailer";
import type { Transporter } from "nodemailer";

// Mock nodemailer
vi.mock("nodemailer");

describe("Contact Service", () => {
  const mockVerify = vi.fn();
  const mockSendMail = vi.fn();

  const mockTransporter = {
    verify: mockVerify,
    sendMail: mockSendMail,
  } as unknown as Transporter;

  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(nodemailer.createTransport).mockReturnValue(mockTransporter);
    mockVerify.mockResolvedValue(true);
    mockSendMail.mockResolvedValue({ messageId: "test-id" });
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe("Successful submissions", () => {
    it("should successfully send email with valid data", async () => {
      const validData = {
        name: "John Doe",
        email: "john@example.com",
        company: "Test Company",
        inquiryType: "consulting",
        message:
          "This is a test message that is long enough to pass validation.",
      };

      const result = await submitContactForm(validData);

      expect(result.success).toBe(true);
      expect(result.message).toContain("successfully");
      expect(mockSendMail).toHaveBeenCalledTimes(1);
    });

    it("should handle submission without optional company field", async () => {
      const validData = {
        name: "Jane Smith",
        email: "jane@example.com",
        company: "",
        inquiryType: "general",
        message: "Test message without company information provided here.",
      };

      const result = await submitContactForm(validData);

      expect(result.success).toBe(true);
    });
  });

  describe("Validation errors", () => {
    it("should reject name that is too short", async () => {
      const invalidData = {
        name: "A",
        email: "valid@example.com",
        company: "",
        inquiryType: "general",
        message: "Valid message that meets minimum length requirements.",
      };

      const result = await submitContactForm(invalidData);

      expect(result.success).toBe(false);
      expect(result.message).toContain("correct");
      if ("validationErrors" in result) {
        expect(result.validationErrors).toBeDefined();
        expect(result.validationErrors?.[0].field).toBe("name");
      }
    });

    it("should reject name that is too long", async () => {
      const invalidData = {
        name: "A".repeat(101),
        email: "valid@example.com",
        company: "",
        inquiryType: "general",
        message: "Valid message for testing purposes.",
      };

      const result = await submitContactForm(invalidData);

      expect(result.success).toBe(false);
      if ("validationErrors" in result) {
        expect(result.validationErrors?.[0].field).toBe("name");
      }
    });

    it("should reject invalid email format", async () => {
      const invalidData = {
        name: "John Doe",
        email: "invalid-email",
        company: "",
        inquiryType: "general",
        message: "Valid message content here for testing.",
      };

      const result = await submitContactForm(invalidData);

      expect(result.success).toBe(false);
      if ("validationErrors" in result) {
        expect(result.validationErrors?.[0].field).toBe("email");
        expect(result.validationErrors?.[0].message).toContain("valid email");
      }
    });

    it("should reject message that is too short", async () => {
      const invalidData = {
        name: "John Doe",
        email: "john@example.com",
        company: "",
        inquiryType: "general",
        message: "Short",
      };

      const result = await submitContactForm(invalidData);

      expect(result.success).toBe(false);
      if ("validationErrors" in result) {
        expect(result.validationErrors?.[0].field).toBe("message");
        expect(result.validationErrors?.[0].message).toContain("10 characters");
      }
    });

    it("should reject message that is too long", async () => {
      const invalidData = {
        name: "John Doe",
        email: "john@example.com",
        company: "",
        inquiryType: "general",
        message: "A".repeat(5001),
      };

      const result = await submitContactForm(invalidData);

      expect(result.success).toBe(false);
      if ("validationErrors" in result) {
        expect(result.validationErrors?.[0].field).toBe("message");
      }
    });

    it("should reject invalid inquiry type", async () => {
      const invalidData = {
        name: "John Doe",
        email: "john@example.com",
        company: "",
        inquiryType: "invalid-type",
        message: "Valid message content for testing purposes.",
      };

      const result = await submitContactForm(invalidData);

      expect(result.success).toBe(false);
    });
  });

  describe("SMTP errors", () => {
    it("should handle SMTP authentication error", async () => {
      const authError = new Error("Authentication failed") as Error & {
        code: string;
      };
      authError.code = "EAUTH";
      mockVerify.mockRejectedValue(authError);

      const validData = {
        name: "John Doe",
        email: "john@example.com",
        company: "",
        inquiryType: "general",
        message: "Test message content that is long enough.",
      };

      const result = await submitContactForm(validData);

      expect(result.success).toBe(false);
      expect(result.message).toContain("configuration error");
    });

    it("should handle general SMTP errors", async () => {
      mockSendMail.mockRejectedValue(new Error("Network error occurred"));

      const validData = {
        name: "John Doe",
        email: "john@example.com",
        company: "",
        inquiryType: "general",
        message: "Test message for error handling validation.",
      };

      const result = await submitContactForm(validData);

      expect(result.success).toBe(false);
      expect(result.message).toContain("Failed to send");
    });
  });

  describe("Email content", () => {
    it("should include all form fields in email", async () => {
      const validData = {
        name: "Test User",
        email: "test@example.com",
        company: "Test Corp",
        inquiryType: "collaboration",
        message: "This is a detailed test message for collaboration.",
      };

      await submitContactForm(validData);

      expect(mockSendMail).toHaveBeenCalledWith(
        expect.objectContaining({
          subject: expect.stringContaining("collaboration"),
          replyTo: "test@example.com",
        }),
      );
    });

    it("should handle messages with newlines", async () => {
      const validData = {
        name: "Test User",
        email: "test@example.com",
        company: "",
        inquiryType: "general",
        message: "Line 1\nLine 2\nLine 3 with multiple lines of text.",
      };

      const result = await submitContactForm(validData);

      expect(result.success).toBe(true);
    });
  });

  describe("Environment validation", () => {
    it("should fail when SMTP_USER is missing", async () => {
      const originalUser = process.env.SMTP_USER;
      delete process.env.SMTP_USER;

      vi.mocked(nodemailer.createTransport).mockImplementation(() => {
        throw new Error("Missing required environment variables: SMTP_USER");
      });

      const validData = {
        name: "Test User",
        email: "test@example.com",
        company: "",
        inquiryType: "general",
        message: "Test message for environment validation.",
      };

      const result = await submitContactForm(validData);

      expect(result.success).toBe(false);

      process.env.SMTP_USER = originalUser;
    });

    it("should fail when SMTP_PASSWORD is missing", async () => {
      const originalPassword = process.env.SMTP_PASSWORD;
      delete process.env.SMTP_PASSWORD;

      vi.mocked(nodemailer.createTransport).mockImplementation(() => {
        throw new Error(
          "Missing required environment variables: SMTP_PASSWORD",
        );
      });

      const validData = {
        name: "Test User",
        email: "test@example.com",
        company: "",
        inquiryType: "general",
        message: "Test message for password validation.",
      };

      const result = await submitContactForm(validData);

      expect(result.success).toBe(false);

      process.env.SMTP_PASSWORD = originalPassword;
    });
  });
});
