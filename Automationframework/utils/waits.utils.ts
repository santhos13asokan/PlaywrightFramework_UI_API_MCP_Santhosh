import type {
  Locator,
  Page,
  Response }
   from '@playwright/test';

export class WaitsUtil {
  constructor(public page: Page) {}

  async forTimeout(milliseconds: number) {
    await this.page.waitForTimeout(milliseconds);
  }

  async forLoadState(
    state: 'domcontentloaded' | 'load' | 'networkidle' = 'domcontentloaded',
  ) {
    await this.page.waitForLoadState(state);
  }

  async forUrl(urlOrPattern: string | RegExp, timeout?: number) {
    await this.page.waitForURL(urlOrPattern, { timeout });
  }

  async forVisible(target: string | Locator, timeout?: number) {
    await this.getLocator(target).waitFor({ state: 'visible', timeout });
  }

  async forHidden(target: string | Locator, timeout?: number) {
    await this.getLocator(target).waitFor({ state: 'hidden', timeout });
  }

  async forAttached(target: string | Locator, timeout?: number) {
    await this.getLocator(target).waitFor({ state: 'attached', timeout });
  }

  async forDetached(target: string | Locator, timeout?: number) {
    await this.getLocator(target).waitFor({ state: 'detached', timeout });
  }

  async forEnabled(target: string | Locator, timeout?: number) {
    await this.getLocator(target).waitFor({ state: 'visible', timeout });
    await this.page.waitForFunction(
      (element) => !(element as HTMLButtonElement).disabled,
      await this.getLocator(target).elementHandle(),
      { timeout },
    );
  }

  async forResponse(
    urlOrPredicate: string | RegExp | ((response: Response) => boolean),
    action: () => Promise<void>,
    timeout?: number,
  ): Promise<Response> {
    const responsePromise = this.page.waitForResponse(urlOrPredicate, { timeout });
    await action();
    return responsePromise;
  }

  async forRequest(
    urlOrPredicate: string | RegExp | ((request: { url(): string }) => boolean),
    action: () => Promise<void>,
    timeout?: number,
  ) {
    const requestPromise = this.page.waitForRequest(urlOrPredicate, { timeout });
    await action();
    return requestPromise;
  }

  private getLocator(target: string | Locator): Locator {
    return typeof target === 'string' ? this.page.locator(target) : target;
  }
}