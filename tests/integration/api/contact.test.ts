import { describe, it, expect, vi, beforeEach } from "vitest";
import { POST } from "@/app/api/contact/route";
import * as contactService from "@/services/contact";

// Mock the contact service
vi.mock("@/services/contact");

describe("POST /api/contact", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("Successful requests", () => {
    it("should return 200 with success message on valid submission", async () => {
      vi.spyOn(contactService, "submitContactForm").mockResolvedValue({
        success: true,
        message: "Thank you! Your message has been sent successfully.",
      });

      const request = new Request("http://localhost/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: "John Doe",
          email: "john@example.com",
          company: "Test Co",
          inquiryType: "consulting",
          message: "This is a valid test message.",
        }),
      });

      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data.success).toBe(true);
      expect(data.message).toContain("successfully");
    });
  });

  describe("Validation errors", () => {
    it("should return 400 when name is missing", async () => {
      const request = new Request("http://localhost/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: "john@example.com",
          inquiryType: "consulting",
          message: "Test message",
        }),
      });

      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(400);
      expect(data.success).toBe(false);
      expect(data.validationErrors).toBeDefined();
      expect(data.validationErrors[0].field).toBe("name");
    });

    it("should return 400 when email is missing", async () => {
      const request = new Request("http://localhost/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: "John Doe",
          inquiryType: "consulting",
          message: "Test message",
        }),
      });

      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(400);
      expect(data.success).toBe(false);
      expect(data.validationErrors[0].field).toBe("email");
    });

    it("should return 400 when message is missing", async () => {
      const request = new Request("http://localhost/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: "John Doe",
          email: "john@example.com",
          inquiryType: "consulting",
        }),
      });

      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(400);
      expect(data.success).toBe(false);
      expect(data.validationErrors[0].field).toBe("message");
    });

    it("should return 400 when inquiryType is missing", async () => {
      const request = new Request("http://localhost/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: "John Doe",
          email: "john@example.com",
          message: "Test message",
        }),
      });

      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(400);
      expect(data.success).toBe(false);
      expect(data.validationErrors[0].field).toBe("inquiryType");
    });
  });

  describe("Service validation errors", () => {
    it("should return 400 when service returns validation errors", async () => {
      vi.spyOn(contactService, "submitContactForm").mockResolvedValue({
        success: false,
        message: "Please correct the following errors:",
        validationErrors: [
          {
            field: "email",
            message: "Please enter a valid email address",
          },
        ],
      });

      const request = new Request("http://localhost/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: "John Doe",
          email: "invalid-email",
          inquiryType: "consulting",
          message: "Test message content",
        }),
      });

      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(400);
      expect(data.success).toBe(false);
      expect(data.validationErrors).toBeDefined();
    });
  });

  describe("Server errors", () => {
    it("should return 500 on unexpected errors", async () => {
      vi.spyOn(contactService, "submitContactForm").mockRejectedValue(
        new Error("Unexpected error"),
      );

      const request = new Request("http://localhost/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: "John Doe",
          email: "john@example.com",
          inquiryType: "consulting",
          message: "Test message content here",
        }),
      });

      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(500);
      expect(data.success).toBe(false);
      expect(data.message).toContain("unexpected error");
    });

    it("should return 500 on malformed JSON", async () => {
      const request = new Request("http://localhost/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: "invalid json",
      });

      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(500);
      expect(data.success).toBe(false);
    });
  });

  describe("Edge cases", () => {
    it("should handle empty request body", async () => {
      const request = new Request("http://localhost/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({}),
      });

      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(400);
      expect(data.success).toBe(false);
    });

    it("should handle request with all fields empty strings", async () => {
      const request = new Request("http://localhost/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: "",
          email: "",
          inquiryType: "",
          message: "",
        }),
      });

      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(400);
      expect(data.success).toBe(false);
    });
  });
});
