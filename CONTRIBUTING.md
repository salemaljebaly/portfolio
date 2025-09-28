# Contributing Guide

Thanks for taking the time to contribute! This document outlines how to get started, the coding standards we follow, and how to propose changes.

## Getting Started

1. **Fork and clone the repository.**
2. **Install the required Node.js version.** The project targets Node.js 22 LTS. You can use [`nvm`](https://github.com/nvm-sh/nvm) or [`volta`](https://volta.sh) to manage versions.
3. **Install dependencies.**
   ```bash
   npm install
   ```
4. **Run the development server.**
   ```bash
   npm run dev
   ```

## Scripts Cheatsheet

| Command              | Description                           |
| -------------------- | ------------------------------------- |
| `npm run lint`       | Lints the codebase with ESLint.       |
| `npm run type-check` | Runs TypeScript in no-emit mode.      |
| `npm run build`      | Produces a production build.          |
| `npm run test:e2e`   | Executes Playwright end-to-end tests. |

## Branching & Commits

- Create a feature branch from the latest `main` (e.g. `feat/<short-topic>` or `fix/<short-topic>`).
- Follow conventional commit messages (`feat:`, `fix:`, `chore:`, etc.).
- Keep commits focused; avoid mixing unrelated changes.

## Pull Requests

Before opening a PR:

- [ ] Run `npm run lint`
- [ ] Run `npm run type-check`
- [ ] Run `npm run build`
- [ ] Run `npx playwright test`

PRs should include a summary of the change, screenshots for UI tweaks, and reference any related issues. Fill out the provided PR template and ensure the checklist is complete.

## Code Style

- Follow the existing ESLint + Prettier setup; the pre-commit hooks will enforce formatting.
- Prefer TypeScript types over `any`, and keep React components functional.
- Add concise comments only when logic is non-obvious.

## Tests

- Cover new UI or API surface areas with Playwright or unit tests when possible.
- When working with animations or canvas effects, consider adding visual notes or fallback checks similar to existing tests.

## Reporting Issues

Use the issue templates so triage is faster. Provide reproduction steps, expected behavior, and environment details.

## Code of Conduct

By participating you agree to the [Code of Conduct](CODE_OF_CONDUCT.md). Please report unacceptable behavior to @salemaljebaly.

Thanks again for contributing!
