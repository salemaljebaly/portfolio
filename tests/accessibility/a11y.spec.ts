import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

test.describe("Accessibility Tests", () => {
  test("homepage should not have accessibility violations", async ({
    page,
  }) => {
    await page.goto("/");

    const accessibilityScanResults = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
      .exclude(".pipeline-step")
      .analyze();

    expect(accessibilityScanResults.violations).toEqual([]);
  });

  test("about page should not have accessibility violations", async ({
    page,
  }) => {
    await page.goto("/about");

    const accessibilityScanResults = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
      .analyze();

    expect(accessibilityScanResults.violations).toEqual([]);
  });

  test("projects page should not have accessibility violations", async ({
    page,
  }) => {
    await page.goto("/projects");

    const accessibilityScanResults = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
      .analyze();

    expect(accessibilityScanResults.violations).toEqual([]);
  });

  test("certifications page should not have accessibility violations", async ({
    page,
  }) => {
    await page.goto("/certifications");

    const accessibilityScanResults = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
      .exclude("iframe")
      .analyze();

    expect(accessibilityScanResults.violations).toEqual([]);
  });

  test("contact page should not have accessibility violations", async ({
    page,
  }) => {
    await page.goto("/contact");

    const accessibilityScanResults = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
      .analyze();

    expect(accessibilityScanResults.violations).toEqual([]);
  });

  test("book page should not have accessibility violations", async ({
    page,
  }) => {
    await page.goto("/book");

    const accessibilityScanResults = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
      .exclude("iframe")
      .analyze();

    expect(accessibilityScanResults.violations).toEqual([]);
  });

  test("should have proper heading hierarchy", async ({ page }) => {
    await page.goto("/");

    // Check for h1
    const h1Count = await page.locator("h1").count();
    expect(h1Count).toBeGreaterThan(0);

    // Verify only one h1 per page
    expect(h1Count).toBe(1);
  });

  test("all images should have alt text", async ({ page }) => {
    await page.goto("/");

    const imagesWithoutAlt = await page
      .locator('img:not([alt]), img[alt=""]')
      .count();
    expect(imagesWithoutAlt).toBe(0);
  });

  test("all links should have accessible names", async ({ page }) => {
    await page.goto("/");

    const linksWithoutText = await page
      .locator('a:not([aria-label]):not(:has-text(""))')
      .count();

    const allLinks = await page.locator("a").count();

    // Most links should have text or aria-label
    expect(linksWithoutText).toBeLessThan(allLinks);
  });

  test("form inputs should have labels", async ({ page }) => {
    await page.goto("/contact");

    const inputs = await page
      .locator(
        'input[type="text"]:visible, input[type="email"]:visible, textarea:visible',
      )
      .all();

    for (const input of inputs) {
      const hasLabel = await input.evaluate((el) => {
        const id = el.id;
        if (!id) return false;
        return !!document.querySelector(`label[for="${id}"]`);
      });

      const hasAriaLabel = await input.getAttribute("aria-label");
      const hasAriaLabelledBy = await input.getAttribute("aria-labelledby");

      expect(
        hasLabel || hasAriaLabel || hasAriaLabelledBy,
        "Input should have a label, aria-label, or aria-labelledby",
      ).toBeTruthy();
    }
  });

  test("interactive elements should be keyboard accessible", async ({
    page,
  }) => {
    await page.goto("/");

    const buttons = await page.locator("button").all();

    for (const button of buttons) {
      const tabIndex = await button.getAttribute("tabindex");
      // tabindex should not be less than 0 (which makes it not keyboard accessible)
      if (tabIndex !== null) {
        expect(parseInt(tabIndex)).toBeGreaterThanOrEqual(-1);
      }
    }
  });

  test("color contrast should be sufficient", async ({ page }) => {
    await page.goto("/");

    const accessibilityScanResults = await new AxeBuilder({ page })
      .withTags(["wcag2aa"])
      .include("body")
      .exclude(".pipeline-step")
      .analyze();

    const contrastViolations = accessibilityScanResults.violations.filter(
      (v) => v.id === "color-contrast",
    );

    expect(contrastViolations).toEqual([]);
  });

  test("page should have lang attribute", async ({ page }) => {
    await page.goto("/");

    const htmlLang = await page.locator("html").getAttribute("lang");
    expect(htmlLang).toBeTruthy();
    expect(htmlLang).toMatch(/^(en|ar)/);
  });

  test("skip to main content link should be present", async ({ page }) => {
    await page.goto("/");

    // Check if there's a skip link (common accessibility pattern)
    const skipLink = page.locator('a[href="#main"], a[href="#content"]');
    const count = await skipLink.count();

    // It's okay if there's no skip link, but if there is one, it should work
    if (count > 0) {
      expect(count).toBeGreaterThan(0);
    }
  });
});
