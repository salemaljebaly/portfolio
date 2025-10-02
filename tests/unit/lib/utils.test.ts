import { describe, it, expect } from "vitest";
import { cn } from "@/lib/utils";

describe("cn utility function", () => {
  it("should merge class names correctly", () => {
    const result = cn("text-red-500", "bg-blue-500");
    expect(result).toContain("text-red-500");
    expect(result).toContain("bg-blue-500");
  });

  it("should handle conditional classes", () => {
    const isActive = true;
    const result = cn("base-class", isActive && "active-class");
    expect(result).toContain("base-class");
    expect(result).toContain("active-class");
  });

  it("should handle false conditional classes", () => {
    const isActive = false;
    const result = cn("base-class", isActive && "active-class");
    expect(result).toBe("base-class");
    expect(result).not.toContain("active-class");
  });

  it("should merge conflicting Tailwind classes correctly", () => {
    const result = cn("p-4", "p-8");
    // twMerge should keep only the last padding class
    expect(result).toBe("p-8");
  });

  it("should handle arrays of classes", () => {
    const result = cn(["text-sm", "font-bold"], "text-blue-500");
    expect(result).toContain("text-sm");
    expect(result).toContain("font-bold");
    expect(result).toContain("text-blue-500");
  });

  it("should handle undefined and null values", () => {
    const result = cn("base", undefined, null, "extra");
    expect(result).toContain("base");
    expect(result).toContain("extra");
  });

  it("should handle empty input", () => {
    const result = cn();
    expect(result).toBe("");
  });

  it("should handle objects with boolean values", () => {
    const result = cn({
      "text-red-500": true,
      "bg-blue-500": false,
      "font-bold": true,
    });
    expect(result).toContain("text-red-500");
    expect(result).toContain("font-bold");
    expect(result).not.toContain("bg-blue-500");
  });
});
