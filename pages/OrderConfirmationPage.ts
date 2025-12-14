import { Page } from '@playwright/test';

export class OrderConfirmationPage {
  constructor(private page: Page) {}

  async isOrderComplete(): Promise<boolean> {
    return this.page.isVisible('text=THANK YOU FOR YOUR ORDER');
  }
}
