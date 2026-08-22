import { test } from '../fixture/custom.fixture';
import { expect } from '@playwright/test';
import { testData } from '../testdata';
import { appRoutes, catalogData, expectedPatterns, navigationLabels, formData } from '../constants';

test.describe('Toolshop application smoke and regression scenarios', () => {
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

  test('home page displays searchable and filterable catalog', async ({ poManager, waitsUtil, tableUtil }) => {
    const homePage = poManager.getHomePage();

    await homePage.open();
    await expect(homePage.searchInput).toBeVisible();
    await expect(homePage.sortSelect).toBeVisible();
    await expect(homePage.ecoFriendlyFilter).toBeVisible();
    await homePage.searchFor(catalogData.searchTerm);
    await waitsUtil.forVisible(homePage.product(catalogData.searchResult));
    await expect(homePage.product(catalogData.searchResult)).toBeVisible();

    const productCards = homePage.page.locator(catalogData.productCardSelector);
    expect(await tableUtil.getRowCount(productCards, ':scope')).toBeGreaterThan(0);
  });

  test('invalid credentials display a login error', async ({ poManager }) => {
    const authPage = poManager.getAuthPage();

    await authPage.openLogin();
    await authPage.login(testData.invalid.username, testData.invalid.password);
    await expect(authPage.page.getByText(expectedPatterns.loginError).first()).toBeVisible();
  });

  test('customer can sign in using environment test data', async ({ poManager, waitsUtil }) => {
    const authPage = poManager.getAuthPage();

    await authPage.openLogin();
    await authPage.login(testData.user.username, testData.user.password);
    await waitsUtil.forUrl(expectedPatterns.authenticatedUrl);
    await expect(authPage.page).not.toHaveURL(appRoutes.login);
  });

  test('product details support quantity and cart actions', async ({ poManager, waitsUtil }) => {
    const homePage = poManager.getHomePage();
    const productPage = poManager.getProductPage();

    await homePage.open();
    await homePage.product(catalogData.productName).click();
    await waitsUtil.forUrl(expectedPatterns.productUrl);
    await expect(productPage.title).toHaveText(catalogData.productName);
    await expect(productPage.specifications).toBeVisible();
    await productPage.increaseQuantityBy(1);
    await expect(productPage.quantity).toHaveValue(catalogData.quantityAfterIncrease);
    await productPage.addToCart();
    await expect(productPage.page.getByRole('menuitem', { name: navigationLabels.cartMenuItem })).toBeVisible();
  });

  test('contact form validates required fields and accepts a text attachment', async ({ poManager }) => {
    const contactPage = poManager.getContactPage();

    await contactPage.open();
    await expect(contactPage.firstName).toBeVisible();
     await contactPage.sendButton.click();
    await expect(contactPage.page.getByText(expectedPatterns.validationError).first()).toBeVisible();
    await contactPage.fillForm(formData.firstName, formData.lastName, formData.email, formData.return, formData.message);
    await contactPage.uploadAttachment(formData.attachmentPath);
    await contactPage.sendButton.click();
    await expect(contactPage.page.getByText(/message|success|sent|thank/i).first()).toBeVisible();
  });

});
