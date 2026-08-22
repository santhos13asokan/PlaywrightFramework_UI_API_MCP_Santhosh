import BasePage from './base.page';

export class CartPage extends BasePage {
  readonly cartItems = this.page.locator('[data-test="cart-item"]');
  readonly proceedToCheckout = this.page.getByRole('button', { name: /Proceed to checkout|Checkout/i });

  async open() {
    await this.navigateTo('/cart');
    await this.waitForPageLoad();
  }

  item(name: string) {
    return this.page.getByText(name, { exact: true }).first();
  }
}