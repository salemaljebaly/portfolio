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

- Add Salem's CV as `public/SalemAljebalyCV.pdf`
- Add certification images in `public/certifications/`
- Copy `.env.example` to `.env.local` and update the values

5. **Run development:**

```bash
npm run dev
```

## End-to-End Tests

Playwright smoke tests cover core desktop and mobile flows.

```bash
# install Playwright browsers once
npm run playwright:install

# run the suite (Playwright starts/stops the Next.js server automatically)
npm run test:e2e

# watch the tests interactively
npx playwright test --headed --debug
# or
PWDEBUG=1 npx playwright test --headed --project=chromium
```

## Key Features

- ✅ MagicUI animated components
- ✅ SEO optimized with structured data
- ✅ Edge runtime ready
- ✅ Accessible (WCAG 2.1 AA)
- ✅ Contact form with server actions
- ✅ Automated Playwright smoke tests
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
├── tests/              # Playwright end-to-end tests
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
