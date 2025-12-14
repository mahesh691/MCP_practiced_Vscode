import { Page } from '@playwright/test';
import { Logger } from '../utils/logger';

/**
 * PB_LoginPage - Page Object for OrangeHRM Login page
 * Handles all login-related interactions and validations
 */
export class PB_LoginPage {
  private readonly usernameField = 'input[placeholder="username"]';
  private readonly passwordField = 'input[placeholder="Password"]';
  private readonly loginButton = 'button:has-text("Login")';
  private readonly errorMessage = '.oxd-alert-content--error';
  private readonly pageTitle = 'h5';
  private readonly loginContainer = '.orangehrm-login-container';

  constructor(public page: Page) {}

  /**
   * Navigate to OrangeHRM login page
   */
  async navigateToLoginPage(): Promise<void> {
    await this.page.goto('/auth/login', { waitUntil: 'domcontentloaded' });
    Logger.step('Navigated to OrangeHRM login page');
  }

  /**
   * Verify login page is displayed
   */
  async verifyLoginPageIsDisplayed(): Promise<boolean> {
    const isVisible = await this.page.locator(this.loginContainer).isVisible();
    if (isVisible) {
      Logger.step('Login page is displayed');
    }
    return isVisible;
  }

  /**
   * Enter username in the username field
   */
  async enterUsername(username: string): Promise<void> {
    await this.page.locator(this.usernameField).fill(username);
    Logger.step(`Entered username: ${username}`);
  }

  /**
   * Enter password in the password field
   */
  async enterPassword(password: string): Promise<void> {
    await this.page.locator(this.passwordField).fill(password);
    Logger.step('Entered password');
  }

  /**
   * Click the login button
   */
  async clickLoginButton(): Promise<void> {
    await this.page.locator(this.loginButton).click();
    Logger.step('Clicked login button');
  }

  /**
   * Perform login with credentials
   */
  async login(username: string, password: string): Promise<void> {
    await this.enterUsername(username);
    await this.enterPassword(password);
    await this.clickLoginButton();
    Logger.step(`Logged in with username: ${username}`);
  }

  /**
   * Get error message text
   */
  async getErrorMessage(): Promise<string> {
    const errorText = await this.page.locator(this.errorMessage).textContent();
    return errorText?.trim() || '';
  }

  /**
   * Verify error message is displayed
   */
  async verifyErrorMessageIsDisplayed(): Promise<boolean> {
    const isVisible = await this.page.locator(this.errorMessage).isVisible();
    if (isVisible) {
      const errorText = await this.getErrorMessage();
      Logger.step(`Error message displayed: ${errorText}`);
    }
    return isVisible;
  }

  /**
   * Verify login page title
   */
  async verifyLoginPageTitle(): Promise<boolean> {
    const isTitleVisible = await this.page.locator(this.pageTitle).isVisible();
    return isTitleVisible;
  }

  /**
   * Clear username field
   */
  async clearUsernameField(): Promise<void> {
    await this.page.locator(this.usernameField).clear();
    Logger.step('Cleared username field');
  }

  /**
   * Clear password field
   */
  async clearPasswordField(): Promise<void> {
    await this.page.locator(this.passwordField).clear();
    Logger.step('Cleared password field');
  }

  // /**
  //  * Check if username field is focused
  //  */
  // async isUsernameFieldFocused(): Promise<boolean> {
  //   return await this.page.locator(this.usernameField).evaluate((el: Element) => el === document.activeElement);
  // }
}
