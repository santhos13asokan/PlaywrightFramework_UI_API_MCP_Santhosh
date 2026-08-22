import type { Locator } from '@playwright/test';
import BasePage from './base.page';

export class HomePage extends BasePage {
  readonly searchInput = this.page.getByRole('textbox', { name: 'Search' });
  readonly searchButton = this.page.getByRole('button', { name: 'Search' });
  readonly clearSearchButton = this.page.getByRole('button', { name: 'X' });
  readonly sortSelect = this.page.getByRole('combobox', { name: 'sort' });
  readonly categoryFilters = this.page.getByRole('group', { name: 'Categories' });
  readonly brandFilters = this.page.getByRole('group', { name: 'Brands' });
  readonly ecoFriendlyFilter = this.page.getByRole('checkbox', { name: 'Show only eco-friendly products' });

  async open() {
    await this.navigateTo('/');
    await this.waitForPageLoad();
  }

  product(name: string): Locator {
    return this.page.getByRole('link', { name: new RegExp(name, 'i') }).first();
  }

  async searchFor(value: string) {
    await this.searchInput.fill(value);
    await this.searchButton.click();
  }

  async selectSort(value: string) {
    await this.sortSelect.selectOption({ label: value });
  }

  async selectCategory(name: string) {
    await this.page.getByRole('checkbox', { name, exact: true }).check();
  }
}