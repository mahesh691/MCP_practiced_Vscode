import { Page } from '@playwright/test';

export class PB_AccountPage {
  constructor(private page: Page) {}

  async openNewAccount(accountType: string = 'CHECKING') {
    await this.page.click('text=Open New Account');
    await this.page.selectOption('#type', accountType);
    await this.page.click('input[value="Open New Account"]');
  }

  async validateAccountCreation() {
    await this.page.locator('text=Account Opened!').isVisible();
  }
}
