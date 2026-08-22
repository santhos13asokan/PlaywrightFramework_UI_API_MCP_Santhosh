# Playwright Automation Framework

A TypeScript Playwright automation framework using Page Object Model, custom fixtures, reusable utilities, environment configuration, and HTML/Allure reports.

## Prerequisites

- Node.js 18 or later
- npm
- Git
- Java JDK for Allure report generation

Verify the tools:

```powershell
node --version
npm --version
git --version
java -version
```

## Clone and Setup

Replace `<repository-url>` with your Git repository URL:

```powershell
git clone <repository-url>
cd <repository-folder>\Automationframework
npm install
npx playwright install
```

Run all commands from the `Automationframework` directory because it contains `package.json` and `playwright.config.ts`.

## Environment Setup

Create a local `.env` file in the project root:

```env
ENV=dev
BROWSER=chromium

DEV_BASE_URL=https://practicesoftwaretesting.com/
DEV_API_URL=https://api.practicesoftwaretesting.com

TEST_BASE_URL=https://test-app.example.com
TEST_API_URL=https://test-api.example.com
```

The `.env` file is ignored by Git. Do not commit credentials or secrets.

Supported `BROWSER` values are `chromium`, `firefox`, `webkit`, and `all`.

## Run Tests

```powershell
npm test
npm run test:headed
```

Run a specific file:

```powershell
npx playwright test tests/login.spec.ts
npx playwright test tests/seed.spec.ts
```

Select a browser for a run:

```powershell
$env:BROWSER="firefox"; npm test
$env:BROWSER="webkit"; npm test
$env:BROWSER="all"; npm test
```

## Reports

Open the Playwright HTML report:

```powershell
npx playwright show-report
```

Generate and open the Allure report:

```powershell
npm run allure:generate
npm run allure:open
```

Or serve it directly:

```powershell
npm run allure:serve
```

Java must be available through `PATH` or `JAVA_HOME` for Allure commands.

## Project Structure

```text
Automationframework/
├── config/       Environment configuration
├── constants/    Routes and test data
├── fixture/      Custom Playwright fixtures
├── pages/        Page Object Model classes
├── testdata/     Environment-specific JSON data
├── tests/        Test specifications
├── testFiles/    Files used by upload tests
├── utils/        UI, API, wait, table, and Excel utilities
├── .env          Local environment settings
├── package.json
└── playwright.config.ts
```

## Test Example

```ts
import { test } from '../fixture/custom.fixture';
import { testData } from '../testdata';

test('login with admin credentials', async ({ poManager }) => {
  const loginPage = poManager.getLoginPage();
  await loginPage.login(testData.admin.username, testData.admin.password);
});
```

Generated folders such as `node_modules`, `test-results`, `playwright-report`, `allure-results`, and `allure-report` are ignored by Git.
