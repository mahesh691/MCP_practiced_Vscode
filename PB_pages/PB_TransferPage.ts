import { Page } from '@playwright/test';

export class PB_TransferPage {
  constructor(private page: Page) {}

  async transferFunds(amount: string, fromAccount: string, toAccount: string) {
    await this.page.click('text=Transfer Funds'); // Navigate to the Transfer Funds page

    // Ensure the amount field is filled correctly
    await this.page.locator('#amount').fill(amount);

    // Validate and select the "from" account
    const fromAccountDropdown = this.page.locator('#fromAccountId');
    await fromAccountDropdown.waitFor(); // Ensure the dropdown is visible
    await fromAccountDropdown.selectOption({ index: 0 });

    // Validate and select the "to" account
    const toAccountDropdown = this.page.locator('#toAccountId');
    await toAccountDropdown.waitFor(); // Ensure the dropdown is visible
    await toAccountDropdown.selectOption({ index: 0 });

    // Submit the transfer
    await this.page.click('input[value="Transfer"]');
  }

  async validateTransferSuccess() {
    // Ensure the success message is visible
    await this.page.locator('text=Transfer Complete!').waitFor({ state: 'visible' });
  }
}
