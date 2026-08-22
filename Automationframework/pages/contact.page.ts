import type { Locator } from '@playwright/test';
import BasePage from './base.page';

export class ContactPage extends BasePage {
  readonly firstName = this.page.getByLabel('First name');
  readonly lastName = this.page.getByLabel('Last name');
  readonly email = this.page.getByLabel('Email address');
  readonly subject = this.page.getByLabel('Subject');
  readonly message = this.page.getByLabel('Message');
  readonly attachment: Locator = this.page.locator('input[type="file"]');
  readonly sendButton = this.page.getByRole('button', { name: 'Send' });

  async open() {
    await this.navigateTo('/contact');
    await this.waitForPageLoad();
  }

  async fillForm(
    firstName: string,
    lastName: string,
    email: string,
    subject: string,
    message: string,
  ) {
    await this.firstName.fill(firstName);
    await this.lastName.fill(lastName);
    await this.email.fill(email);
    await this.subject.selectOption(subject);
    await this.message.fill(message);
  }

  async uploadAttachment(filePath: string | string[]) {
    await this.uploadFile(this.attachment, filePath);
  }
}
