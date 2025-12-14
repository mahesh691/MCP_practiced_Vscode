import { test as base } from '@playwright/test';
import { PB_LaunchPage } from '../PB_pages/PB_LaunchPage';
import { PB_AuthPage } from '../PB_pages/PB_AuthPage';
import { PB_AccountPage } from '../PB_pages/PB_AccountPage';
import { PB_TransferPage } from '../PB_pages/PB_TransferPage';
import { PB_CommonPage } from '../PB_pages/PB_CommonPage';

type Pages = {
  launchPage: PB_LaunchPage;
  authPage: PB_AuthPage;
  accountPage: PB_AccountPage;
  transferPage: PB_TransferPage;
  commonPage: PB_CommonPage;
};

export const test = base.extend<Pages>({
  launchPage: async ({ page }, use) => {
    await use(new PB_LaunchPage(page));
  },
  authPage: async ({ page }, use) => {
    await use(new PB_AuthPage(page));
  },
  accountPage: async ({ page }, use) => {
    await use(new PB_AccountPage(page));
  },  
  transferPage: async ({ page }, use) => {
    await use(new PB_TransferPage(page));
  },
  commonPage: async ({ page }, use) => {
    await use(new PB_CommonPage(page));
  },
});
