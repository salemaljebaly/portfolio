import { describe, it, expect } from "vitest";
import {
  getRelevantCertifications,
  loadProjects,
  loadCertifications,
  loadTimeline,
  normalizeCategory,
  normalizeCertificationName,
  parseMonthYear,
} from "@/utils/loadData";

describe("loadData utilities", () => {
  describe("loadProjects", () => {
    it("should load English projects by default", () => {
      const projects = loadProjects("en");
      expect(projects).toBeDefined();
      expect(Array.isArray(projects)).toBe(true);
      expect(projects.length).toBeGreaterThan(0);
    });

    it("should load Arabic projects when locale is ar", () => {
      const projects = loadProjects("ar");
      expect(projects).toBeDefined();
      expect(Array.isArray(projects)).toBe(true);
      expect(projects.length).toBeGreaterThan(0);
    });

    it("should normalize categories", () => {
      const projects = loadProjects("en");
      const hasNormalizedCategory = projects.some(
        (p) => p.category === "Cloud & DevOps",
      );
      expect(hasNormalizedCategory).toBe(true);
    });

    it("should have required project fields", () => {
      const projects = loadProjects("en");
      const firstProject = projects[0];

      expect(firstProject).toHaveProperty("category");
      expect(typeof firstProject.category).toBe("string");
    });

    it("should keep unknown categories unchanged", () => {
      expect(normalizeCategory("Security")).toBe("Security");
    });
  });

  describe("loadCertifications", () => {
    it("should load English certifications by default", () => {
      const certifications = loadCertifications("en");
      expect(certifications).toBeDefined();
      expect(Array.isArray(certifications)).toBe(true);
      expect(certifications.length).toBeGreaterThan(0);
    });

    it("should load Arabic certifications when locale is ar", () => {
      const certifications = loadCertifications("ar");
      expect(certifications).toBeDefined();
      expect(Array.isArray(certifications)).toBe(true);
      expect(certifications.length).toBeGreaterThan(0);
    });

    it("should have required certification fields", () => {
      const certifications = loadCertifications("en");
      const firstCert = certifications[0];

      expect(firstCert).toBeDefined();
      expect(typeof firstCert).toBe("object");
    });
  });

  describe("loadTimeline", () => {
    it("should load English timeline by default", () => {
      const timeline = loadTimeline("en");
      expect(timeline).toBeDefined();
      expect(Array.isArray(timeline)).toBe(true);
      expect(timeline.length).toBeGreaterThan(0);
    });

    it("should load Arabic timeline when locale is ar", () => {
      const timeline = loadTimeline("ar");
      expect(timeline).toBeDefined();
      expect(Array.isArray(timeline)).toBe(true);
      expect(timeline.length).toBeGreaterThan(0);
    });

    it("should have required timeline fields", () => {
      const timeline = loadTimeline("en");
      const firstEvent = timeline[0];

      expect(firstEvent).toBeDefined();
      expect(typeof firstEvent).toBe("object");
    });
  });

  describe("Locale handling", () => {
    it("should return different data for different locales", () => {
      const enProjects = loadProjects("en");
      const arProjects = loadProjects("ar");

      // They should be different arrays
      expect(enProjects).not.toBe(arProjects);
    });

    it("should handle invalid locale gracefully", () => {
      const projects = loadProjects("invalid-locale" as string);
      expect(projects).toBeDefined();
      expect(Array.isArray(projects)).toBe(true);
    });
  });

  describe("certification helpers", () => {
    it("normalizes certification names for deduplication", () => {
      expect(
        normalizeCertificationName(
          "AWS Certified AI Practitioner Early Adopter",
        ),
      ).toBe("aws certified ai practitioner");
      expect(
        normalizeCertificationName(
          "AWS Certified Solutions Architect – Associate",
        ),
      ).toBe("aws certified solutions architect associate");
    });

    it("parses month/year and handles invalid date", () => {
      expect(parseMonthYear("January 2025")).toBeGreaterThan(0);
      expect(parseMonthYear("2025-99")).toBe(0);
    });

    it("returns relevant certifications ordered by priority and date", () => {
      const certifications = getRelevantCertifications("en");
      expect(certifications.length).toBeLessThanOrEqual(6);

      // AI Practitioner should appear only once after deduplication
      const aiPractitionerCount = certifications.filter((cert) =>
        normalizeCertificationName(cert.name).includes(
          "aws certified ai practitioner",
        ),
      ).length;
      expect(aiPractitionerCount).toBe(1);

      const names = certifications.map((cert) => cert.name);
      expect(names[0]).toContain("AWS Certified Solutions Architect");
      expect(names[1]).toContain("AWS Certified Developer");
      expect(names).toContain("AWS Certified Cloud Practitioner");
      expect(names).toContain("GitHub Foundations");
    });
  });
});
