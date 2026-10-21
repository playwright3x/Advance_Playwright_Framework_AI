Advance Playwright Framework 3x
A TypeScript-based Playwright test automation framework organized around the Page Object Model (POM), with a custom TTA HTML reporter.

Requirements
Node.js 20 or newer
npm
Playwright browser binaries
Getting started
Install the project dependencies:

npm install
npx playwright install
Create a local .env file in the project root for environment-specific settings. The .env file is ignored by Git; do not commit credentials or secrets.

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
BASE_URL, when set, takes precedence. Otherwise the Playwright configuration selects a URL using TTA_ENV (qa, stg, prod, dev, or api) and the corresponding environment-specific URL variable. Keep any usernames and passwords in your local .env; never add real credentials to this example or to source control.

Run tests
# Run the configured Playwright projects
npm test

# Run Chromium only
npm run test:chromium
The test suite is located in src/tests. Tests use page objects from src/pages.

Reports
The Playwright configuration runs the line, standard HTML, and custom TTA reporters. After a test run:

The standard Playwright report is written to playwright-report/.
The custom report is written to tta-report/; open tta-report/index.html for the latest report.
Screenshots, videos, and traces are captured for the custom report.
Generated reports and test artifacts are ignored by Git.

Project layout
src/
  api/        API clients
  config/     Environment and framework configuration
  fixtures/   Shared Playwright fixtures
  pages/      Page Object Model classes
  testdata/   Test data
  tests/      Playwright test cases
  utils/      Reusable helpers, data readers, and custom reporter
docs/         Project documentation
rules/        Framework rules
