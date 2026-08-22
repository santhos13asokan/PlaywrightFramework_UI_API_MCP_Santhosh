import { test } from '../fixture/custom.fixture';
import { testData } from '../testdata';

test.describe('Login scenarios', () => {
    test.describe.configure({mode:'parallel'})
    test.beforeEach(async ({ page }) => {
        await page.context().clearCookies();
        await page.goto('/');
        await page.waitForLoadState('domcontentloaded');
    });

    test.afterEach(async ({ page }, testInfo) => {
        if (testInfo.status !== testInfo.expectedStatus) {
            await testInfo.attach('failure-screenshot', {
                body: await page.screenshot({ fullPage: true }),
                contentType: 'image/png',
            });
        }
    });

    test('login with admin credentials', async ({ poManager }) => {
        const loginPage = poManager.getLoginPage();

        await loginPage.login(testData.admin.username, testData.admin.password);
    });
});