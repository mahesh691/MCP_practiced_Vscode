import { Page } from '@playwright/test';

export class PB_AuthPage {
  constructor(private page: Page) {}

  async registerUser(username: string, password: string) {
    await this.page.click('text=Register'); // Navigate to the registration page
    const form = this.page.locator('form[action*="register.htm"]'); // Ensure the form is targeted correctly

    await form.locator('#customer\\.firstName').fill('Test'); // Escape special characters in IDs
    await form.locator('#customer\\.lastName').fill('Userds');
    await form.locator('#customer\\.address\\.street').fill('123 Test St');
    await form.locator('#customer\\.address\\.city').fill('TestCity');
    await form.locator('#customer\\.address\\.state').fill('TestState');
    await form.locator('#customer\\.address\\.zipCode').fill('12345');
    await form.locator('#customer\\.phoneNumber').fill('1234567890');
    await form.locator('#customer\\.ssn').fill('123-45-6789');
    await form.locator('#customer\\.username').fill(username);
    await form.locator('#customer\\.password').fill(password);
    await form.locator('#repeatedPassword').fill(password);

    await form.locator('input[value="Register"]').click(); // Submit the form
  }

  async login(username: string, password: string) {
    await this.page.fill('input[name="username"]', username);
    await this.page.fill('input[name="password"]', password);
    await this.page.click('input[value="Log In"]');
  }
}
