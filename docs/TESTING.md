# Testing Strategy

This document outlines the comprehensive testing strategy for the portfolio application.

## Table of Contents

- [Overview](#overview)
- [Test Pyramid](#test-pyramid)
- [Testing Frameworks](#testing-frameworks)
- [Test Types](#test-types)
- [Running Tests](#running-tests)
- [Coverage Requirements](#coverage-requirements)
- [CI/CD Integration](#cicd-integration)

## Overview

Our testing strategy ensures application reliability and prevents regressions through multiple test layers:

- **Unit Tests**: Test individual functions and modules in isolation
- **Integration Tests**: Test API endpoints and service interactions
- **E2E Tests**: Test complete user workflows in a real browser
- **Accessibility Tests**: Ensure WCAG 2.1 AA compliance

## Test Pyramid

```
        /\
       /  \
      / E2E \         ~ 12 tests (User flows)
     /--------\
    /          \
   / Integration \    ~ 10 tests (API routes)
  /--------------\
 /                \
/   Unit Tests     \  ~ 34 tests (Functions, utils)
--------------------
```

**Total: 56+ tests**

## Testing Frameworks

| Framework                  | Purpose                     | Version |
| -------------------------- | --------------------------- | ------- |
| **Vitest**                 | Unit & Integration testing  | ^3.2.4  |
| **Playwright**             | E2E testing                 | ^1.51.1 |
| **@testing-library/react** | Component testing utilities | ^16.3.0 |
| **@axe-core/playwright**   | Accessibility testing       | ^4.10.2 |

## Test Types

### 1. Unit Tests

**Location**: `tests/unit/`

**Purpose**: Test individual functions and modules in isolation.

**Coverage Areas**:

- **Services** (`tests/unit/services/`)
  - Email validation and SMTP handling
  - Zod schema validation
  - Error handling (authentication, network)

- **Utilities** (`tests/unit/lib/`, `tests/unit/utils/`)
  - Class name merging (Tailwind)
  - Data loading (projects, certifications, timeline)
  - Locale handling

**Example**:

```typescript
// tests/unit/services/contact.test.ts
it("should reject invalid email format", async () => {
  const result = await submitContactForm({
    email: "invalid-email",
    // ... other fields
  });

  expect(result.success).toBe(false);
  expect(result.validationErrors[0].field).toBe("email");
});
```

**Running**:

```bash
npm run test:unit
```

### 2. Integration Tests

**Location**: `tests/integration/`

**Purpose**: Test API endpoints and service interactions.

**Coverage Areas**:

- API route handlers (`/api/contact`)
- Request/response validation
- Error status codes (400, 500)
- Edge cases (malformed JSON, empty bodies)

**Example**:

```typescript
// tests/integration/api/contact.test.ts
it("should return 400 when email is missing", async () => {
  const request = new Request("http://localhost/api/contact", {
    method: "POST",
    body: JSON.stringify({ name: "Test" }), // Missing email
  });

  const response = await POST(request);
  expect(response.status).toBe(400);
});
```

**Running**:

```bash
npm run test:integration
```

### 3. End-to-End (E2E) Tests

**Location**: `tests/e2e/`

**Purpose**: Test complete user workflows in a real browser.

**Coverage Areas**:

- Navigation and routing
- Form submissions (success & error states)
- Interactive components (filters, modals)
- Mobile responsive behavior
- Network error handling

**Example**:

```typescript
// tests/e2e/portfolio.spec.ts
test("shows error message on API failure", async ({ page }) => {
  await page.goto("/contact");

  await page.route("**/api/contact", (route) => route.fulfill({ status: 500 }));

  // Fill form and submit...
  await expect(page.getByText(/error|failed/i)).toBeVisible();
});
```

**Running**:

```bash
npm run test:e2e
```

### 4. Accessibility (a11y) Tests

**Location**: `tests/accessibility/`

**Purpose**: Ensure WCAG 2.1 Level AA compliance.

**Coverage Areas**:

- **WCAG Violations**: Automated checks for all pages
- **Heading Hierarchy**: Proper h1-h6 structure
- **ARIA Labels**: Screen reader accessibility
- **Keyboard Navigation**: Tab order and focus
- **Color Contrast**: Text readability (4.5:1 ratio)
- **Form Labels**: Input accessibility
- **Alt Text**: Image descriptions

**Standards Tested**:

- WCAG 2.0 Level A
- WCAG 2.0 Level AA
- WCAG 2.1 Level A
- WCAG 2.1 Level AA

**Example**:

```typescript
// tests/accessibility/a11y.spec.ts
test("homepage should not have accessibility violations", async ({ page }) => {
  await page.goto("/");

  const results = await new AxeBuilder({ page })
    .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
    .analyze();

  expect(results.violations).toEqual([]);
});
```

**Running**:

```bash
npm run test:a11y
```

## Running Tests

### All Tests

```bash
npm run test:all
```

Runs unit, integration, E2E, and accessibility tests sequentially.

### Individual Test Suites

```bash
# Unit tests only
npm run test:unit

# Integration tests only
npm run test:integration

# E2E tests only
npm run test:e2e

# Accessibility tests only
npm run test:a11y

# All Vitest tests (unit + integration)
npm run test
```

### Watch Mode

```bash
npm run test:watch
```

Runs Vitest in watch mode for development.

### Coverage Report

```bash
npm run test:coverage
```

Generates coverage report in `coverage/` directory.

**View HTML Report**:

```bash
open coverage/index.html
```

## Coverage Requirements

Coverage thresholds are enforced via `vitest.config.ts`:

```typescript
coverage: {
  thresholds: {
    lines: 70,
    functions: 70,
    branches: 70,
    statements: 70,
  }
}
```

**Current Coverage**: ~70%+ across all metrics

### Excluded from Coverage

- Node modules
- Test files
- Configuration files
- Type definitions (`.d.ts`)
- Build outputs (`.next/`, `out/`)

## CI/CD Integration

### On Pull Request

All tests run automatically:

1. ✅ **Unit Tests** (`npm run test:unit`)
2. ✅ **Integration Tests** (`npm run test:integration`)
3. ✅ **Coverage Report** (`npm run test:coverage`)
4. ✅ **E2E Tests** (`npm run test:e2e`)
5. ✅ **Accessibility Tests** (`npm run test:a11y`)

### Required Checks

The following must pass before merge:

- Build (22)
- test (unit + integration with coverage)
- Lint & Format Check
- TypeScript Check
- Security Scan
- Bundle Size Analysis

### Workflow Files

- `.github/workflows/ci.yml` - Unit/Integration tests
- `.github/workflows/playwright-e2e.yml` - E2E/A11y tests

## Writing New Tests

### Unit Test Template

```typescript
import { describe, it, expect } from "vitest";
import { functionToTest } from "@/lib/utils";

describe("functionToTest", () => {
  it("should handle valid input", () => {
    const result = functionToTest("valid");
    expect(result).toBe("expected");
  });

  it("should handle edge cases", () => {
    const result = functionToTest("");
    expect(result).toBe("default");
  });
});
```

### Integration Test Template

```typescript
import { describe, it, expect } from "vitest";
import { GET } from "@/app/api/route/route";

describe("GET /api/route", () => {
  it("should return 200 on success", async () => {
    const request = new Request("http://localhost/api/route");
    const response = await GET(request);

    expect(response.status).toBe(200);
  });
});
```

### E2E Test Template

```typescript
import { test, expect } from "@playwright/test";

test("feature name", async ({ page }) => {
  await page.goto("/page");

  await page.getByRole("button", { name: "Submit" }).click();

  await expect(page.getByText("Success")).toBeVisible();
});
```

### A11y Test Template

```typescript
import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

test("page should be accessible", async ({ page }) => {
  await page.goto("/page");

  const results = await new AxeBuilder({ page })
    .withTags(["wcag2a", "wcag2aa"])
    .analyze();

  expect(results.violations).toEqual([]);
});
```

## Best Practices

### 1. Test Isolation

- Each test should be independent
- Use `beforeEach` for setup, `afterEach` for cleanup
- Don't rely on test execution order

### 2. Mocking

```typescript
// Mock external dependencies
vi.mock("nodemailer");

// Mock with proper types
const mockFn = vi.fn() as MockedFunction<typeof realFn>;
```

### 3. Descriptive Names

```typescript
// ❌ Bad
it("works", () => {});

// ✅ Good
it("should return 400 when email is missing", () => {});
```

### 4. Arrange-Act-Assert Pattern

```typescript
it("should validate email format", async () => {
  // Arrange
  const invalidEmail = "not-an-email";

  // Act
  const result = await validateEmail(invalidEmail);

  // Assert
  expect(result.valid).toBe(false);
});
```

### 5. Avoid `any` Types

```typescript
// ❌ Avoid
const mock = {} as any;

// ✅ Use proper types
const mock = {} as unknown as Transporter;
```

## Debugging Tests

### Vitest

```bash
# Run specific test file
npm run test:unit -- tests/unit/services/contact.test.ts

# Run tests matching pattern
npm run test:unit -- -t "email validation"

# Debug mode
node --inspect-brk node_modules/.bin/vitest
```

### Playwright

```bash
# Run in headed mode (see browser)
npx playwright test --headed

# Debug mode with Playwright Inspector
npx playwright test --debug

# Run specific test
npx playwright test tests/e2e/portfolio.spec.ts -g "contact form"
```

## Troubleshooting

### Test Failures

1. Check error message and stack trace
2. Run test in isolation: `npm run test:unit -- -t "test name"`
3. Check for race conditions in async code
4. Verify mocks are properly reset

### Coverage Not Meeting Threshold

1. Run `npm run test:coverage` to see report
2. Check `coverage/index.html` for uncovered lines
3. Add tests for missing coverage
4. Consider excluding irrelevant files

### E2E Test Timeouts

1. Increase timeout: `test.setTimeout(60000)`
2. Check network conditions
3. Verify selectors are correct
4. Use `page.waitForLoadState()` when needed

## Resources

- [Vitest Documentation](https://vitest.dev/)
- [Playwright Documentation](https://playwright.dev/)
- [Testing Library](https://testing-library.com/)
- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [Axe-core Rules](https://github.com/dequelabs/axe-core/blob/develop/doc/rule-descriptions.md)
