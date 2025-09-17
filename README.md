# Cypress Accessibility Starter (Cypress + axe-core + CI)

This repo demonstrates modern UI test automation with **Cypress** and automated **accessibility auditing** via **axe-core**. It includes test tagging, CI with GitHub Actions, and visual HTML reports.

## Quick Start

```bash
npm ci
npm test
npm run report  # build Mochawesome HTML report
```

### Key features
- Cypress E2E tests (smoke + happy path)
- Accessibility audits (critical/serious) with `cypress-axe`
- CI via GitHub Actions (Chrome headless)
- Mochawesome HTML reports as CI artifacts
- Easy to extend: add specs under `cypress/e2e/*`

## Scripts
- `npm test` — headless run (Chrome)
- `npm run report` — merge JSON + generate HTML report in `mochawesome-report/`
- `npm run test:smoke` / `npm run test:a11y` — run tagged subsets

## Folder structure
```
.
├─ .github/workflows/ci.yml
├─ cypress/
│  ├─ e2e/
│  │  ├─ a11y/saucedemo.a11y.cy.js
│  │  └─ smoke/saucedemo.login.cy.js
│  ├─ fixtures/users.json
│  └─ support/{commands.js,e2e.js}
├─ cypress.config.js
├─ package.json
└─ README.md
```

## CI status badge
Add this to the top of the README after pushing to GitHub:

```
![CI](https://github.com/<your-username>/<your-repo>/actions/workflows/ci.yml/badge.svg)
```

---

> Target site is **SauceDemo**. To point to a different app, update `baseUrl` in `cypress.config.js` and adjust selectors in the specs.
