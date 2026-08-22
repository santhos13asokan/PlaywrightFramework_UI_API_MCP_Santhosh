# Playwright Automation Framework

This repository contains a TypeScript Playwright automation framework inside the `Automationframework` folder.

## Prerequisites

- Node.js 18 or later
- npm
- Git
- Java JDK for Allure reports

Verify the tools:

```powershell
node --version
npm --version
git --version
java -version
```

## Clone and Setup

```powershell
git clone <repository-url>
cd <repository-folder>\Automationframework
npm install
npx playwright install
```

Run npm and Playwright commands from the `Automationframework` directory because it contains `package.json` and `playwright.config.ts`.

## Environment Setup

Create `Automationframework/.env` locally:

```env
ENV=dev
BROWSER=chromium

DEV_BASE_URL=https://practicesoftwaretesting.com/
DEV_API_URL=https://api.practicesoftwaretesting.com

TEST_BASE_URL=https://test-app.example.com
TEST_API_URL=https://test-api.example.com
```

The `.env` file is ignored by Git. Do not commit passwords, tokens, or other secrets.

Supported browser values are `chromium`, `firefox`, `webkit`, and `all`.

## Run Tests

```powershell
cd Automationframework
npm test
npm run test:headed
```

Run a specific test file:

```powershell
npx playwright test tests/login.spec.ts
npx playwright test tests/seed.spec.ts
```

Select a browser:

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

Or serve the report directly:

```powershell
npm run allure:serve
```

Java must be available through `PATH` or `JAVA_HOME` for Allure commands.

## Framework Structure

```text
PlaywrightFramework/
├── Automationframework/
│   ├── config/       Environment configuration
│   ├── constants/    Routes and test data
│   ├── fixture/      Custom Playwright fixtures
│   ├── pages/        Page Object Model classes
│   ├── testdata/     Environment-specific JSON data
│   ├── tests/        Test specifications
│   ├── testFiles/    Upload-test files
│   ├── utils/        UI, API, wait, table, and Excel utilities
│   ├── package.json
│   └── playwright.config.ts
└── README.md
```

## Test Pattern

Tests use the custom fixture and Page Object Manager:

```ts
import { test } from '../fixture/custom.fixture';
import { testData } from '../testdata';

test('login with admin credentials', async ({ poManager }) => {
  const loginPage = poManager.getLoginPage();
  await loginPage.login(testData.admin.username, testData.admin.password);
});
```

Generated folders such as `node_modules`, `test-results`, `playwright-report`, `allure-results`, and `allure-report` are ignored by Git.
