import { test as base } from '@playwright/test';
import { UIUtil } from '../utils/ui.utils';
import { APIUtil } from '../utils/api.utils';
import { TableUtil } from '../utils/table.utils';
import { ExcelUtil } from '../utils/excel.utils';
import { WaitsUtil } from '../utils/waits.utils';
import { POManager } from '../pages/po-manager';

type FrameworkFixtures = {
  uiUtil: UIUtil;
  apiUtil: APIUtil;
  tableUtil: TableUtil;
  excelUtil: ExcelUtil;
  waitsUtil: WaitsUtil;
  poManager: POManager;
};

export const test = base.extend<FrameworkFixtures>({
  uiUtil: async ({ page }, use) => {
    await use(new UIUtil(page));
  },
  apiUtil: async ({ request }, use) => {
    await use(new APIUtil(request));
  },
  tableUtil: async ({ page }, use) => {
    await use(new TableUtil(page));
  },
  excelUtil: async ({}, use) => {
    await use(new ExcelUtil());
  },
  waitsUtil: async ({ page }, use) => {
    await use(new WaitsUtil(page));
  },
  poManager: async ({ uiUtil, waitsUtil }, use) => {
    await use(new POManager(uiUtil, waitsUtil));
  },
});