# Advance Playwright Framework 3x

![Playwright](https://img.shields.io/badge/Playwright-1.64-2EAD33?logo=playwright&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-7.0-3178C6?logo=typescript&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-20%2B-339933?logo=nodedotjs&logoColor=white)
![CI](https://github.com/playwright3x/Advance_Playwright_Framework_AI/actions/workflows/playwright.yml/badge.svg)

A TypeScript-based Playwright test automation framework organized around the **Page Object Model (POM)**, with data-driven testing and a custom **TTA HTML reporter**.

---

## Table of contents

- [Features](#features)
- [Tech stack](#tech-stack)
- [Requirements](#requirements)
- [Getting started](#getting-started)
- [Running tests](#running-tests)
- [Debugging in VS Code](#debugging-in-vs-code)
- [Project layout](#project-layout)
- [Page Object Model](#page-object-model)
- [Utilities](#utilities)
- [Reports](#reports)
- [Continuous integration](#continuous-integration)

---

## Features

- **Page Object Model**: locators and actions live in `src/pages`, so specs stay short and readable
- **Multi-environment config**: switch between QA, staging, prod, dev and API with one variable
- **Data-driven testing**: read test data from CSV, Excel, YAML or MySQL
- **Custom TTA HTML report**: per-step screenshots, videos, traces, a self-heal tab and a flaky-test analyzer
- **VS Code debugging**: ready-made launch configurations
- **GitHub Actions CI**: runs on every push and pull request

## Tech stack

| Area | Tools |
|---|---|
| Test runner | `@playwright/test`, TypeScript |
| Test data | `exceljs`, `xlsx`, `js-yaml`, `csv-parse`, `mysql2`, `@faker-js/faker` |
| API & validation | `ajv`, `ajv-formats`, `jsonpath-plus` |
| Config & logging | `dotenv`, `winston` |
| Reporting | Playwright HTML, custom TTA reporter, `allure-playwright` |
| CI | GitHub Actions |

## Requirements

- [Node.js](https://nodejs.org/) 20 or newer
- npm
- Playwright browser binaries (installed below)

## Getting started

### 1. Clone and install

```bash
git clone https://github.com/playwright3x/Advance_Playwright_Framework_AI.git
cd Advance_Playwright_Framework_AI
npm install
npx playwright install
```

### 2. Create a `.env` file

Create a `.env` file in the project root for environment-specific settings.

> [!IMPORTANT]
> `.env` is ignored by Git. Keep usernames and passwords there and never commit real credentials.

```env
TTA_ENV=qa
BASE_URL=https://app.thetestingacademy.com/
QA_BASE_URL=https://app.thetestingacademy.com/
STG_BASE_URL=https://stage.thetestingacademy.com/
PROD_BASE_URL=https://app.thetestingacademy.com/
DEV_BASE_URL=http://localhost:3000/
API_BASE_URL=https://restful-booker.herokuapp.com/
LOG_LEVEL=info
TEST_ENV=QA
TEST_AUTHOR=Your Name
```

<details>
<summary>Optional: MySQL settings for database-driven tests</summary>

```env
MYSQL_HOST=localhost
MYSQL_PORT=3306
MYSQL_USER=root
MYSQL_PASSWORD=
MYSQL_DATABASE=playwright_ddt
```

</details>

### How the base URL is chosen

1. `BASE_URL`, if it is set, always wins.
2. Otherwise `TTA_ENV` picks the environment, and its variable is used:

| `TTA_ENV` | Variable used |
|---|---|
| `qa` (default) | `QA_BASE_URL` |
| `stg` / `stage` / `staging` | `STG_BASE_URL` |
| `prod` / `production` | `PROD_BASE_URL` |
| `dev` / `local` | `DEV_BASE_URL` |
| `api` | `API_BASE_URL` |

## Running tests

| Command | What it does |
|---|---|
| `npm test` | Run all configured Playwright projects |
| `npm run test:chromium` | Run Chromium only |
| `npm run test:headed` | Run with the browser window visible |
| `npm run test:debug` | Step through tests in the Playwright Inspector |
| `npm run test:ui` | Open Playwright UI mode |
| `npm run report` | Open the latest Playwright HTML report |
| `npm run typecheck` | Type-check the project |

More examples:

```bash
# Run one spec file
npx playwright test src/tests/Login.spec.ts

# Run tests whose title matches
npx playwright test -g "Login"

# Run against staging
TTA_ENV=stg npm test
```

> [!NOTE]
> Tests run **headed** locally and **headless** on CI. The `chromium` project uses a 1920×1080 viewport.

## Debugging in VS Code

`.vscode/launch.json` has three configurations:

| Configuration | Debugs |
|---|---|
| Debug Login.spec.ts | `src/tests/Login.spec.ts` |
| Debug current spec file | The spec open in the editor |
| Debug all tests | Every spec in `src/tests` |

Set a breakpoint, open **Run and Debug** (`Cmd+Shift+D` / `Ctrl+Shift+D`), pick a configuration and press **F5**.

## Project layout

```
Advance_Playwright_Framework_AI
├── src/
│   ├── api/            # API clients
│   ├── config/         # Environment and framework configuration
│   ├── fixtures/       # Shared Playwright fixtures
│   ├── pages/          # Page Object Model classes
│   ├── testdata/       # Test data (xlsx, csv, yaml)
│   ├── tests/          # Playwright test cases
│   └── utils/          # Data readers, helpers and the custom reporter
├── docs/               # Project documentation
├── rules/              # Framework rules
├── .github/workflows/  # CI pipeline
├── .vscode/            # Debug configurations
├── playwright.config.ts
├── tsconfig.json
└── package.json
```

## Page Object Model

Each page class owns its locators and actions:

```ts
import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';

test('Login with valid credentials', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.goto();
  await loginPage.login('standard_user', 'tta_secret');
  await expect(page).toHaveTitle('TTACart - Products');
});
```

| Page object | Covers |
|---|---|
| `LoginPage` | Login form |
| `InventoryPage` | Product list, add to cart |
| `CartPage` | Cart contents and checkout |

> [!TIP]
> The TTACart demo app tags elements with `data-test`, not Playwright's default `data-testid`, so page objects use `[data-test="..."]` locators.

## Utilities

| File | Purpose |
|---|---|
| `csvReader.ts` | `readCSV(path)` returns rows as objects keyed by the header row |
| `excelReader.ts` | `readExcel(path, sheet?)` (async); `readLoginDataFromExcel(path)` |
| `yamlReader.ts` | `readYAML(path)` (sync) and the shared `LoginRow` type |
| `dbReader.ts` | `query(sql, params)`, `readLoginDataFromDB()`, `isDbConfigured()` for MySQL |
| `stepScreenshot.ts` | `shot(page, index, name)` pins a screenshot to a `test.step` in the report |
| `selfHeal.ts` | Types for self-healing locator results shown in the report |
| `CustomReporter.ts` | The custom TTA HTML reporter |
| `generateExcel.js` | Generates sample Excel data with Faker: `npm run generate:excel` |

### Data-driven tests

Sync readers (CSV, YAML) can create one test per row:

```ts
import { readYAML } from '../utils/yamlReader';

for (const row of readYAML('src/testdata/login.yaml')) {
  test(`login: ${row.description}`, async ({ page }) => {
    // ...
  });
}
```

Async readers (Excel, MySQL) only return data inside a hook or test, so load them in `test.beforeAll` or in the test body.

## Reports

Each run produces three reports:

| Report | Location | How to open |
|---|---|---|
| Line | Terminal | Shown while tests run |
| Playwright HTML | `playwright-report/` | `npm run report` |
| TTA custom report | `tta-report/index.html` | Open in a browser (always the latest run) |

The TTA report includes:

- Screenshots, videos and traces for every test
- Step-by-step results with pinned screenshots
- A **Self-Heal** tab
- A **Flaky** tab that compares this build with the previous one (run history is kept in `reports/runs/`)

Generated reports and test artifacts are ignored by Git.

## Continuous integration

[`.github/workflows/playwright.yml`](.github/workflows/playwright.yml) runs on every push and pull request to `main` / `master`:

1. Install dependencies with `npm ci`
2. Install Playwright browsers
3. Run `npx playwright test`
4. Upload `playwright-report/` as a build artifact (kept for 30 days)
