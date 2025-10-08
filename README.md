# Playwright TypeScript Starter

A hands-on starter to learn Playwright by doing.

## Quick Start

```bash
# 1) Unzip, then inside the folder:
cp .env.example .env  # edit BASE_URL etc. if you wish

# 2) Install dependencies & browsers
npm ci
npx playwright install --with-deps

# 3) Run tests
npm test

# Explore:
npm run test:ui     # UI mode
npm run test:headed # headed browser
npm run report      # open HTML report
npm run trace:open  # open traces from last run
```

## Project Highlights
- TypeScript + Playwright Test
- Page Objects (POM) under `src/pages`
- Auth storage state via global setup
- API tests with Playwright request context
- Network mocking example
- a11y smoke using axe-core
- GitHub Actions CI workflow

## Customize
- Change `BASE_URL` in `.env` to your app.
- Replace selectors in `tests/setup/global.setup.ts` and POMs.
- Add more page objects and spec files as you learn.

Happy testing!
