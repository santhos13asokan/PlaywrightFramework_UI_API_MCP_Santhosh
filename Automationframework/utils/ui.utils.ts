import { expect } from '@playwright/test';
import type {
  Dialog,
  Download,
  Frame,
  FrameLocator,
  Locator,
  Page,
} from '@playwright/test';

type PageAction = () => Promise<void>;

export class UIUtil {
  

  constructor( public page: Page) {
    this.page = page;
  }

 
  private loc(target: string | Locator): Locator {
    return typeof target === 'string' ? this.page.locator(target) : target;
  }

  
  async goto(path: string ) {
    await this.page.goto(path);
  }

  async click(target: string | Locator) {
    const element = this.loc(target);
    await element.waitFor({ state: 'visible' });
    await element.click();
  }

  async fill(target: string | Locator, value: string) {
    const element = this.loc(target);
    await element.waitFor({ state: 'visible' });
    await element.fill(value);
  }

  async select(target: string | Locator, value: string) {
    const element = this.loc(target);
    await element.waitFor({ state: 'visible' });
    await element.selectOption(value);
  }

  async getText(target: string | Locator): Promise<string> {
    const element = this.loc(target);
    await element.waitFor({ state: 'visible' });
    return (await element.textContent())?.trim() || '';
  }

  async scroll(target: string | Locator) {
    await this.loc(target).scrollIntoViewIfNeeded();
  }

  // Assertions
  async assertVisible(target: string | Locator, timeout = 5000) {
    await expect(this.loc(target)).toBeVisible({ timeout });
  }

  async assertText(target: string | Locator, text: string) {
    await expect(this.loc(target)).toContainText(text);
  }

  async assertURL(urlOrPattern: string | RegExp) {
    await expect(this.page).toHaveURL(urlOrPattern);
  }

  getFrame(selector: string): FrameLocator {
    return this.page.frameLocator(selector);
  }

  getFrameByUrl(urlOrPattern: string | RegExp): Frame | null {
    return this.page.frames().find((frame) =>
      typeof urlOrPattern === 'string'
        ? frame.url() === urlOrPattern
        : urlOrPattern.test(frame.url()),
    ) || null;
  }

  async waitForPopup(action: PageAction): Promise<Page> {
    const popupPromise = this.page.waitForEvent('popup');
    await action();
    return popupPromise;
  }

  async waitForNewPage(action: PageAction): Promise<Page> {
    const pagePromise = this.page.context().waitForEvent('page');
    await action();
    return pagePromise;
  }

  async bringPageToFront(page: Page = this.page) {
    await page.bringToFront();
  }

  async handleDialog(action: PageAction, response?: string | null): Promise<Dialog> {
    const dialogPromise = this.page.waitForEvent('dialog');
    await action();
    const dialog = await dialogPromise;
    if (response === null) {
      await dialog.dismiss();
    } else if (dialog.type() === 'prompt' && response !== undefined) {
      await dialog.accept(response);
    } else {
      await dialog.accept();
    }
    return dialog;
  }

  async downloadFile(action: PageAction, filePath?: string): Promise<Download> {
    const downloadPromise = this.page.waitForEvent('download');
    await action();
    const download = await downloadPromise;
    if (filePath) {
      await download.saveAs(filePath);
    }
    return download;
  }

  async uploadFile(
    target: string | Locator,
    filePath: string | string[],
  ) {
    await this.loc(target).setInputFiles(filePath);
  }
}