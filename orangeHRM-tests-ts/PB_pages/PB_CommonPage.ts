import { Page } from '@playwright/test';
import { Logger } from '../utils/logger';

/**
 * PB_CommonPage - Common page object for shared functionality
 * Contains common elements and actions used across multiple pages
 */
export class PB_CommonPage {
  private readonly userProfileButton = '.oxd-topbar-header-userarea';
  private readonly logoutButton = 'a:has-text("Logout")';
  private readonly userMenu = '.oxd-dropdown-menu';
  private readonly mainContent = '.orangehrm-container';
  private readonly pageTitle = 'h6, .page-title';
  private readonly loadingSpinner = '.oxd-loading-spinner';

  constructor(public page: Page) {}

  /**
   * Wait for page to load completely
   */
  async waitForPageToLoad(): Promise<void> {
    await this.page.waitForLoadState('domcontentloaded');
    Logger.step('Page loaded');
  }

  /**
   * Wait for loading spinner to disappear
   */
  async waitForLoadingToComplete(): Promise<void> {
    const spinner = this.page.locator(this.loadingSpinner).first();
    try {
      await spinner.waitFor({ state: 'hidden', timeout: 5000 });
      Logger.step('Loading completed');
    } catch (e) {
      Logger.warn('Loading spinner timeout or not found');
    }
  }

  /**
   * Click on user profile button to open menu
   */
  async clickUserProfileButton(): Promise<void> {
    await this.page.locator(this.userProfileButton).click();
    Logger.step('Clicked user profile button');
  }

  /**
   * Click logout button
   */
  async clickLogoutButton(): Promise<void> {
    await this.page.locator(this.logoutButton).click();
    Logger.step('Clicked logout button');
  }

  /**
   * Logout from application
   */
  async logout(): Promise<void> {
    await this.clickUserProfileButton();
    await this.page.waitForTimeout(500); // Wait for menu to appear
    await this.clickLogoutButton();
    Logger.step('Logged out successfully');
  }

  /**
   * Get page title
   */
  async getPageTitle(): Promise<string> {
    const titleText = await this.page.locator(this.pageTitle).textContent();
    return titleText?.trim() || '';
  }

  /**
   * Verify main content is visible
   */
  async isMainContentVisible(): Promise<boolean> {
    return await this.page.locator(this.mainContent).isVisible();
  }

  /**
   * Get current page URL
   */
  async getCurrentUrl(): Promise<string> {
    return this.page.url();
  }

  /**
   * Wait for specific timeout in milliseconds
   */
  async waitForTimeout(ms: number): Promise<void> {
    await this.page.waitForTimeout(ms);
  }

  /**
   * Take screenshot
   */
  async takeScreenshot(name: string): Promise<Buffer> {
    const screenshot = await this.page.screenshot({ path: `screenshots/${name}.png` });
    Logger.info(`Screenshot taken: ${name}`);
    return screenshot;
  }

  /**
   * Get page by text - useful for finding elements dynamically
   */
  async getElementByText(text: string, tag: string = 'button'): Promise<any> {
    return this.page.locator(`${tag}:has-text("${text}")`);
  }
}
