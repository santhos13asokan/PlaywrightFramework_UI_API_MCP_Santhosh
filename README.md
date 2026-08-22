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

The framework uses `Automationframework/.env` for environment selection and application URLs. This project keeps that file visible because it contains configuration values only. 

```env
ENV=dev
BROWSER=chromium

DEV_BASE_URL=https://practicesoftwaretesting.com/
DEV_API_URL=https://api.practicesoftwaretesting.com

TEST_BASE_URL=https://test-app.example.com
TEST_API_URL=https://test-api.example.com
```

The `.env` file is included in the repository so the expected framework configuration is visible. Environment-specific override files such as `.env.local` remain ignored.

Supported browser values are `chromium`, `firefox`, `webkit`, and `all`.

### Configuration Flow

1. `config/env.config.ts` loads `.env` with `dotenv`.
2. `ENV=dev` selects the `DEV_BASE_URL` and `DEV_API_URL` values.
3. `ENV=test` selects the `TEST_BASE_URL` and `TEST_API_URL` values.
4. `playwright.config.ts` uses `Config.baseUrl` as Playwright's `baseURL`.
5. Tests can navigate with relative paths such as `page.goto('/')` or page-object methods such as `navigateTo('/auth/login')`.

The browser is selected from `BROWSER`:

```text
BROWSER=chromium  -> Chromium only
BROWSER=firefox   -> Firefox only
BROWSER=webkit    -> WebKit only
BROWSER=all       -> Chromium, Firefox, and WebKit
```

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

Playwright writes test artifacts to `test-results` and `playwright-report`. The Allure adapter writes raw results to `allure-results`; the Allure CLI converts them into `allure-report`. These generated directories are ignored by Git.

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

## Fixture and Page Object Flow

The custom fixture creates shared objects once for each test:

```text
Playwright page and request
  |
  +-- UIUtil, APIUtil, TableUtil, ExcelUtil
  |
  +-- UIUtil + WaitsUtil
    |
    +-- POManager
      |
      +-- LoginPage, HomePage, ProductPage,
          AuthPage, ContactPage, and CartPage
```

Tests use `poManager` for page objects and request utility fixtures directly when needed:

```ts
test('API request', async ({ apiUtil }) => {
  const response = await apiUtil.get('/products');
});
```

Page objects contain application workflows. Utilities contain reusable technical actions such as navigation, waiting, API calls, table operations, and Excel operations.

Generated folders such as `node_modules`, `test-results`, `playwright-report`, `allure-results`, and `allure-report` are ignored by Git.
