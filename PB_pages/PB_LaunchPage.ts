import { Page } from '@playwright/test';

export class PB_LaunchPage {
  constructor(private page: Page) {}

  async navigateToHomePage() {
    await this.page.goto('https://parabank.parasoft.com/parabank/index.htm');
    await this.page.waitForLoadState('domcontentloaded');
  }

  async validateHomePage() {
    await this.page.locator('text=Experience the difference').isVisible();
  }
}
