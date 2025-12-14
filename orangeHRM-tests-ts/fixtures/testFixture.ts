import { test as base, Page } from '@playwright/test';
import { PB_LoginPage } from '../PB_pages/PB_LoginPage';
import { PB_DashboardPage } from '../PB_pages/PB_DashboardPage';
import { PB_EmployeePage } from '../PB_pages/PB_EmployeePage';
import { PB_CommonPage } from '../PB_pages/PB_CommonPage';

/**
 * Define custom fixtures for OrangeHRM tests
 * These fixtures provide page objects with dependency injection
 */
type CustomFixtures = {
  loginPage: PB_LoginPage;
  dashboardPage: PB_DashboardPage;
  employeePage: PB_EmployeePage;
  commonPage: PB_CommonPage;
};

/**
 * Extend base test with custom fixtures
 */
export const test = base.extend<CustomFixtures>({
  loginPage: async ({ page }, use) => {
    const loginPage = new PB_LoginPage(page);
    await use(loginPage);
  },

  dashboardPage: async ({ page }, use) => {
    const dashboardPage = new PB_DashboardPage(page);
    await use(dashboardPage);
  },

  employeePage: async ({ page }, use) => {
    const employeePage = new PB_EmployeePage(page);
    await use(employeePage);
  },

  commonPage: async ({ page }, use) => {
    const commonPage = new PB_CommonPage(page);
    await use(commonPage);
  },
});

export { expect } from '@playwright/test';
