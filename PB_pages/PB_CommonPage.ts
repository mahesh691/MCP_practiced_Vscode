import { Page } from '@playwright/test';

export class PB_CommonPage {
  constructor(private page: Page) {}

  async logout() {
    await this.page.click('text=Log Out');
  }
}
