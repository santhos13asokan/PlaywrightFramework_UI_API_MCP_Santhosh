import { expect } from '@playwright/test';
import type { Page, Locator } from '@playwright/test';

export class TableUtil {
  constructor(public page: Page) {}

  private loc(target: string | Locator): Locator {
    return typeof target === 'string' ? this.page.locator(target) : target;
  }

  // Get total rows (excludes header by default)
  async getRowCount(tableTarget: string | Locator, rowSelector = 'tbody tr'): Promise<number> {
    return await this.loc(tableTarget).locator(rowSelector).count();
  }

  // Get column header names as an array
  async getHeaders(tableTarget: string | Locator, headerSelector = 'th'): Promise<string[]> {
    const headers = this.loc(tableTarget).locator(headerSelector);
    const count = await headers.count();
    const names: string[] = [];

    for (let i = 0; i < count; i++) {
      names.push((await headers.nth(i).textContent())?.trim() || '');
    }
    return names;
  }

  // Scrape table into JSON: [{ "Name": "John", "Role": "Admin" }]
  async getTableData(
    tableTarget: string | Locator,
    headerSelector = 'th',
    rowSelector = 'tbody tr'
  ): Promise<Record<string, string>[]> {
    const table = this.loc(tableTarget);
    const headers = await this.getHeaders(table, headerSelector);
    const rows = table.locator(rowSelector);
    const rowCount = await rows.count();
    const data: Record<string, string>[] = [];

    for (let i = 0; i < rowCount; i++) {
      const cells = rows.nth(i).locator('td');
      const cellCount = await cells.count();
      const rowData: Record<string, string> = {};

      for (let j = 0; j < cellCount; j++) {
        const key = headers[j] || `col_${j}`;
        rowData[key] = (await cells.nth(j).textContent())?.trim() || '';
      }
      data.push(rowData);
    }
    return data;
  }

  // Find row Locator containing target text
  getRowByText(tableTarget: string | Locator, text: string, rowSelector = 'tbody tr'): Locator {
    return this.loc(tableTarget).locator(rowSelector).filter({ hasText: text });
  }

  // Click action inside a row matching text (e.g., Edit/Delete button)
  async clickRowAction(tableTarget: string | Locator, text: string, actionBtnSelector: string) {
    const row = this.getRowByText(tableTarget, text);
    await row.waitFor({ state: 'visible' });
    await row.locator(actionBtnSelector).click();
  }

  // Assert row exists
  async assertRowExists(tableTarget: string | Locator, text: string) {
    await expect(this.getRowByText(tableTarget, text).first()).toBeVisible();
  }
}