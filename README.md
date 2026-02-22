# Salem Aljebaly Portfolio

[![CI](https://github.com/salemaljebaly/portfolio/actions/workflows/ci.yml/badge.svg)](https://github.com/salemaljebaly/portfolio/actions/workflows/ci.yml)
[![Playwright](https://github.com/salemaljebaly/portfolio/actions/workflows/playwright-e2e.yml/badge.svg)](https://github.com/salemaljebaly/portfolio/actions/workflows/playwright-e2e.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

Portfolio website built with Next.js 15, MagicUI, and Tailwind CSS.

## Quick Setup

1. **Install Node.js 22 LTS** (see `.nvmrc` for the pinned version).

2. **Install dependencies:**

```bash
npm install
```

3. **Install MagicUI:**

```bash
# npx magicui-cli@latest init
# Select: Yes, New York style, Neutral color, Yes to CSS variables

# Add components
npx magicui-cli@latest add particles typing-animation number-ticker magic-card animated-beam animated-list marquee bento-grid shimmer-button box-reveal
```

4. **Add required files:**

- Add Salem's CV as `public/SalemResume.pdf`
- Add certification images in `public/certifications/`
- Copy `.env.example` to `.env.local` and update the values

5. **Run development:**

```bash
npm run dev
```

## Testing

Comprehensive test suite with 56+ tests across all layers. See [Testing Guide](docs/TESTING.md) for detailed documentation.

### Quick Start

```bash
# Run all tests
npm run test:all

# Run individual test suites
npm run test:unit         # Unit tests (34 tests)
npm run test:integration  # API integration tests (10 tests)
npm run test:e2e          # E2E tests with Playwright (12 tests)
npm run test:a11y         # Accessibility tests (14 tests)

# Development
npm run test:watch        # Watch mode for unit/integration
npm run test:coverage     # Generate coverage report
```

### Test Coverage

- **Unit Tests**: Services, utilities, data loading
- **Integration Tests**: API endpoints, error handling
- **E2E Tests**: User workflows, form submissions, navigation
- **Accessibility Tests**: WCAG 2.1 AA compliance

**Coverage**: 70%+ (lines, functions, branches, statements)

### First Time Setup

```bash
# Install Playwright browsers once
npm run playwright:install
```

See [docs/TESTING.md](docs/TESTING.md) for testing strategies, best practices, and troubleshooting.

## Key Features

- ✅ MagicUI animated components
- ✅ SEO optimized with structured data
- ✅ Edge runtime ready
- ✅ Accessible (WCAG 2.1 AA)
- ✅ Contact form with server actions
- ✅ Comprehensive test coverage (56+ tests)
- ✅ Automated accessibility testing
- ✅ Responsive design

## Deployment

- Deploy to Vercel and configure the custom domain (`docker.com.ly`).
- Review the security headers in `next.config.ts` if additional third-party embeds are added.

## Project Structure

```
├── src/                # Application code
│   ├── app/            # Next.js App Router routes
│   ├── components/     # Reusable UI building blocks
│   └── lib/            # Utilities and helpers
├── tests/              # Test suites
│   ├── unit/           # Unit tests (services, utils)
│   ├── integration/    # API integration tests
│   ├── e2e/            # Playwright end-to-end tests
│   └── accessibility/  # WCAG compliance tests
├── docs/               # Documentation
│   ├── TESTING.md      # Testing guide
│   └── github-actions-tips.md  # GitHub CLI tips
├── public/             # Static assets and documents
└── .github/            # Workflows, issue templates, label automation
```

## Technologies

- Next.js 15.5.4 (App Router)
- MagicUI Components
- Tailwind CSS v4
- Framer Motion
- Zain Google Font
- TypeScript

## Contributing

Contributions are welcome! Please read the [Contributing Guide](CONTRIBUTING.md) for the development workflow, coding standards, and testing checklist. All participants are expected to follow the [Code of Conduct](CODE_OF_CONDUCT.md).

## Community & Support

- 💬 Open a discussion or issue using the provided templates.
- 🏷️ Pull requests are auto-labeled based on changed files; see `.github/labeler.yml`.
- 🔄 Labels are synced automatically on pushes to `main`.

## License

This project is licensed under the [MIT License](LICENSE).
