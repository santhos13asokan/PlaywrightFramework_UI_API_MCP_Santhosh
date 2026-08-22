import type {
  Dialog,
  Download,
  Frame,
  FrameLocator,
  Locator,
  Page,
} from '@playwright/test';
import { UIUtil } from '../utils/ui.utils';
import { WaitsUtil } from '../utils/waits.utils';

export default class BasePage {
  constructor(public uiUtil: UIUtil, public waitsUtil: WaitsUtil) {}

  get page(): Page {
    return this.uiUtil.page;
  }

  async navigateTo(path: string = '/') {
    await this.uiUtil.goto(path);
  }

  async waitForPageLoad() {
    await this.waitsUtil.forLoadState();
  }

  async getUrl(): Promise<string> {
    return this.page.url();
  }

  async getTitle(): Promise<string> {
    return await this.page.title();
  }


  async scrollToElement(target: string | Locator) {
    await this.uiUtil.scroll(target);
  }

  
  async takeScreenshot(fileName: string) {
    await this.page.screenshot({ path: `./screenshots/${fileName}.png`, fullPage: true });
  }

  getFrame(selector: string): FrameLocator {
    return this.uiUtil.getFrame(selector);
  }

  getFrameByUrl(urlOrPattern: string | RegExp): Frame | null {
    return this.uiUtil.getFrameByUrl(urlOrPattern);
  }

  async waitForPopup(action: () => Promise<void>): Promise<Page> {
    return this.uiUtil.waitForPopup(action);
  }

  async waitForNewPage(action: () => Promise<void>): Promise<Page> {
    return this.uiUtil.waitForNewPage(action);
  }

  async bringPageToFront(page: Page = this.page) {
    await this.uiUtil.bringPageToFront(page);
  }

  async handleDialog(
    action: () => Promise<void>,
    response?: string | null,
  ): Promise<Dialog> {
    return this.uiUtil.handleDialog(action, response);
  }

  async downloadFile(action: () => Promise<void>, filePath?: string): Promise<Download> {
    return this.uiUtil.downloadFile(action, filePath);
  }

  async uploadFile(target: string | Locator, filePath: string | string[]) {
    await this.uiUtil.uploadFile(target, filePath);
  }
}