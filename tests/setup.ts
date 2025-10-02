import "@testing-library/jest-dom";
import { vi } from "vitest";

// Mock environment variables for tests
process.env.SMTP_USER = "test@example.com";
process.env.SMTP_PASSWORD = "test-password";
process.env.CONTACT_FORM_RECIPIENT = "recipient@example.com";

// Mock Next.js router
vi.mock("next/navigation", () => ({
  useRouter: () => ({
    push: vi.fn(),
    replace: vi.fn(),
    prefetch: vi.fn(),
  }),
  usePathname: () => "/",
  useSearchParams: () => new URLSearchParams(),
}));
