import type { Locator } from '@playwright/test';
import { UIUtil } from '../utils/ui.utils';
import { WaitsUtil } from '../utils/waits.utils';
import BasePage from './base.page';

export class LoginPage extends BasePage {
  readonly signInButton: Locator;
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;

  constructor(uiUtil: UIUtil, waitsUtil: WaitsUtil) {
    super(uiUtil, waitsUtil);
    this.signInButton = this.page.getByRole('link', { name: 'Sign In' });
    this.usernameInput = this.page.getByTestId('email');
    this.passwordInput = this.page.getByTestId('password');
    this.loginButton = this.page.getByTestId('login-submit');
  }

  async gotoLoginPage() {
    await this.navigateTo('/');
    await this.waitForPageLoad();
  }

  async login(username: string, password: string) {
    await this.navigateTo('/');
    await this.waitForPageLoad();
    await this.signInButton.click();
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
    await this.waitForPageLoad();
  }
}