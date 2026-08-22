import BasePage from './base.page';

export class AuthPage extends BasePage {
  readonly emailInput = this.page.getByRole('textbox', { name: /Email address/ });
  readonly passwordInput = this.page.getByRole('textbox', { name: /Password/ });
  readonly loginButton = this.page.getByRole('button', { name: 'Login' });
  readonly registerLink = this.page.getByRole('link', { name: 'Register your account' });
  readonly forgotPasswordLink = this.page.getByRole('link', { name: 'Forgot your Password?' });

  async openLogin() {
    await this.navigateTo('/auth/login');
    await this.waitForPageLoad();
  }

  async login(username: string, password: string) {
    await this.emailInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
    await this.waitForPageLoad();
  }
}