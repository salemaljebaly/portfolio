import { expect, test } from "@playwright/test";

test.describe("Portfolio navigation", () => {
  test("top navigation routes to main sections", async ({ page }) => {
    await page.goto("/");

    const destinations = [
      { label: "About", path: "/about", heading: "About Me" },
      { label: "Projects", path: "/projects", heading: "Projects Portfolio" },
      {
        label: "Certifications",
        path: "/certifications",
        heading: "Certifications",
      },
      { label: "Contact", path: "/contact", heading: "Get In Touch" },
      { label: "Book a Call", path: "/book", heading: "Schedule a Meeting" },
    ];

    for (const { label, path, heading } of destinations) {
      await page
        .getByRole("navigation")
        .getByRole("link", { name: label })
        .click();
      await expect(page).toHaveURL(new RegExp(`${path}$`));
      await expect(
        page.getByRole("heading", { level: 1, name: heading }),
      ).toBeVisible();
    }

    await page
      .getByRole("navigation")
      .getByRole("link", { name: "Home" })
      .click();
    await expect(page).toHaveURL(/\/$/);
    await expect(
      page.getByRole("heading", { level: 1, name: "Salem Aljebaly" }),
    ).toBeVisible();
  });
});

test.describe("Navigation responsive", () => {
  test("mobile hamburger reveals links", async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto("/");

    const menuButton = page.getByRole("button", { name: "Navigation menu" });
    const mobileProjectsLink = page.locator("nav a[href='/projects']").nth(1);

    await expect(menuButton).toBeVisible();
    await expect(mobileProjectsLink).toBeHidden();

    await menuButton.click();
    await expect(mobileProjectsLink).toBeVisible();

    await menuButton.click();
    await expect(mobileProjectsLink).toBeHidden();
  });
});

test.describe("Scroll behavior", () => {
  test("header applies scrolled styles after scrolling", async ({ page }) => {
    await page.goto("/");

    const header = page.locator("header");
    const initialClasses = (await header.getAttribute("class")) ?? "";
    expect(initialClasses).toContain("bg-transparent");

    await page.evaluate(() => window.scrollTo(0, 400));
    await expect
      .poll(async () => (await header.getAttribute("class")) ?? "")
      .toContain("bg-background/80");
  });
});

test.describe("Projects page", () => {
  test("expands project details and filters by category", async ({ page }) => {
    await page.goto("/projects");

    const learnMore = page.getByRole("button", { name: "Learn More" }).first();
    await learnMore.click();
    await expect(
      page.getByRole("heading", { level: 4, name: "Overview" }),
    ).toBeVisible();

    await page.getByRole("button", { name: "Show Less" }).click();
    await expect(
      page.getByRole("heading", { level: 4, name: "Overview" }),
    ).toHaveCount(0);

    await page.getByRole("button", { name: "IoT" }).click();
    await expect(
      page.getByRole("heading", { name: "ThingsBoard Mobile App" }),
    ).toBeVisible();
    await expect(
      page.getByRole("heading", { name: "mstore-api-optimizer" }),
    ).toHaveCount(0);
  });
});

test.describe("Certifications", () => {
  test("filters AWS credentials and verify links open externally", async ({
    page,
  }) => {
    await page.goto("/certifications");

    await page.getByRole("button", { name: "AWS" }).click();
    await expect(
      page.getByRole("heading", { name: "AWS Certified Cloud Practitioner" }),
    ).toBeVisible();
    await expect(
      page.getByRole("heading", {
        name: "Foundations of User Experience (UX) Design",
      }),
    ).toHaveCount(0);

    await expect(
      page.getByRole("link", { name: "Verify" }).first(),
    ).toHaveAttribute("target", "_blank");
  });
});

test.describe("Contact form", () => {
  test("enforces required fields and shows success message", async ({
    page,
  }) => {
    await page.goto("/contact");

    await page.getByRole("button", { name: "Send Message" }).click();
    await expect(page.getByRole("textbox", { name: "Name *" })).toBeFocused();

    await page.route("**/api/contact", async (route) => {
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify({ success: true }),
      });
    });

    await page.getByRole("textbox", { name: "Name *" }).fill("Test User");
    await page
      .getByRole("textbox", { name: "Email *" })
      .fill("test@example.com");
    await page.getByRole("textbox", { name: "Company" }).fill("Test Co");
    await page
      .getByRole("combobox", { name: "Inquiry Type" })
      .selectOption("consulting");
    await page
      .getByRole("textbox", { name: "Message *" })
      .fill("This is a test message that meets the validation requirements.");

    await page.getByRole("button", { name: "Send Message" }).click();
    await expect(
      page.getByText(
        "Thank you for your message! I'll get back to you as soon as possible.",
      ),
    ).toBeVisible();
  });
});

test.describe("Book a Call", () => {
  test("loads the Cal.com embed", async ({ page }) => {
    await page.goto("/book");

    await expect(
      page.getByRole("heading", { level: 1, name: "Schedule a Meeting" }),
    ).toBeVisible();

    const bookingIframe = page.locator("iframe");
    const iframeVisible = await bookingIframe
      .first()
      .waitFor({ state: "visible", timeout: 15000 })
      .then(() => true)
      .catch(() => false);

    if (!iframeVisible) {
      await expect(
        page.getByRole("link", { name: /Schedule a meeting on Cal\.com/i }),
      ).toBeVisible();
      return;
    }

    const bookingFrame = page.frameLocator("iframe");
    await expect
      .poll(
        async () =>
          bookingFrame
            .getByRole("heading", { name: "30 Min Meeting" })
            .isVisible(),
        { timeout: 20000 },
      )
      .toBeTruthy();
  });
});

test.describe("Footer", () => {
  test("contains accessible external links", async ({ page }) => {
    await page.goto("/");

    const footer = page.getByRole("contentinfo");
    await expect(footer.getByRole("link", { name: "GitHub" })).toHaveAttribute(
      "href",
      "https://github.com/salemaljebaly",
    );
    await expect(footer.getByRole("link", { name: "GitHub" })).toHaveAttribute(
      "target",
      "_blank",
    );
    await expect(
      footer.getByRole("link", { name: "LinkedIn" }),
    ).toHaveAttribute("href", "https://linkedin.com/in/salemaljebaly");
    await expect(
      footer.getByRole("link", { name: "LinkedIn" }),
    ).toHaveAttribute("target", "_blank");
    await expect(footer.getByRole("link", { name: "Email" })).toHaveAttribute(
      "href",
      "mailto:contact@docker.com.ly",
    );
  });
});
