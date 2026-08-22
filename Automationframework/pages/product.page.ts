import type { Locator } from '@playwright/test';
import BasePage from './base.page';

export class ProductPage extends BasePage {
  readonly title = this.page.getByRole('heading', { level: 1 });
  readonly price = this.page.locator('[data-test="unit-price"]');
  readonly quantity = this.page.getByRole('spinbutton', { name: 'Quantity' });
  readonly decreaseQuantity = this.page.getByRole('button', { name: 'Decrease quantity' });
  readonly increaseQuantity = this.page.getByRole('button', { name: 'Increase quantity' });
  readonly addToCartButton = this.page.getByTestId('add-to-cart');
  readonly addToFavoritesButton = this.page.getByTestId('add-to-favorites');
  readonly addToCompareButton = this.page.getByTestId('add-to-compare');
  readonly specifications = this.page.getByRole('table');

  async open(productPath: string) {
    await this.navigateTo(productPath);
    await this.waitForPageLoad();
  }

  async setQuantity(value: number) {
    await this.quantity.fill(String(value));
  }

  async increaseQuantityBy(count: number) {
    for (let index = 0; index < count; index++) {
      await this.increaseQuantity.click();
    }
  }

  async addToCart() {
    await this.addToCartButton.click();
  }

  async relatedProduct(name: string): Promise<Locator> {
    return this.page.getByRole('link', { name: new RegExp(`${name}.*More information`, 'i') }).first();
  }
}