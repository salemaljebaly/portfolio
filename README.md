# Salem Aljebaly Portfolio

Bilingual (English/Arabic) portfolio website built with Next.js 15, MagicUI, and Tailwind CSS.

## Quick Setup

1. **Install dependencies:**

```bash
npm install
```

2. **Install MagicUI:**

```bash
# npx magicui-cli@latest init
# Select: Yes, New York style, Neutral color, Yes to CSS variables

# Add components
npx magicui-cli@latest add particles typing-animation number-ticker magic-card animated-beam animated-list marquee bento-grid shimmer-button box-reveal
```

3. **Add required files:**

- Add Salem's CV as `public/SalemAljebalyCV.pdf`
- Add certification images in `public/certifications/`
- Copy `.env.example` to `.env.local` and update the values

4. **Run development:**

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

- ✅ Bilingual (English/Arabic) with RTL support
- ✅ MagicUI animated components
- ✅ SEO optimized with structured data
- ✅ Edge runtime ready
- ✅ Accessible (WCAG 2.1 AA)
- ✅ Contact form with server actions
- ✅ Responsive design

## Deployment

Deploy to Vercel and configure custom domain (docker.com.ly).

## Technologies

- Next.js 15.3.3 (App Router)
- MagicUI Components
- Tailwind CSS v4
- Framer Motion
- Zain Google Font
- TypeScript

## TODO

- add robots.txt
