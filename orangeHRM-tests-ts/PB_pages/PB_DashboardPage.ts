import { Page } from '@playwright/test';
import { Logger } from '../utils/logger';

/**
 * PB_DashboardPage - Page Object for OrangeHRM Dashboard
 * Handles dashboard-related interactions and validations
 */
export class PB_DashboardPage {
  private readonly dashboardContainer = '.orangehrm-container';
  private readonly sidebarMenu = '.oxd-sidepanel';
  private readonly menuItems = 'a[href*="/web/index.php"]';
  private readonly dashboardHeading = 'h6:has-text("Dashboard")';
  private readonly dashboardCard = '.orangehrm-dashboard-container';
  private readonly employeeButton = 'a[href*="/pim/viewEmployeeList"]';
  private readonly timeButton = 'a[href*="/time"]';
  private readonly reportsButton = 'a[href*="/reports"]';
  private readonly welcomeText = 'h6, .orangehrm-welcome-heading';
  private readonly assigneeQuickLinks = '.orangehrm-quick-launch';

  constructor(private page: Page) {}

  /**
   * Verify dashboard is displayed after login
   */
  async verifyDashboardIsDisplayed(): Promise<boolean> {
    await this.page.waitForLoadState('domcontentloaded');
    const isDashboardVisible = await this.page.locator(this.dashboardContainer).isVisible();
    if (isDashboardVisible) {
      Logger.step('Dashboard is displayed');
    }
    return isDashboardVisible;
  }

  /**
   * Verify sidebar menu is visible
   */
  async verifySidebarMenuIsVisible(): Promise<boolean> {
    const isVisible = await this.page.locator(this.sidebarMenu).isVisible();
    if (isVisible) {
      Logger.step('Sidebar menu is visible');
    }
    return isVisible;
  }

  /**
   * Click on PIM (Employee Management) menu
   */
  async clickPIMMenu(): Promise<void> {
    await this.page.locator('a:has-text("PIM")').click();
    Logger.step('Clicked on PIM/Employee menu');
  }

  /**
   * Click on Admin menu
   */
  async clickAdminMenu(): Promise<void> {
    await this.page.locator('a:has-text("Admin")').click();
    Logger.step('Clicked on Admin menu');
  }

  /**
   * Click on Time & Attendance menu
   */
  async clickTimeAttendanceMenu(): Promise<void> {
    await this.page.locator('a:has-text("Time")').click();
    Logger.step('Clicked on Time & Attendance menu');
  }

  /**
   * Click on Reports menu
   */
  async clickReportsMenu(): Promise<void> {
    await this.page.locator('a:has-text("Reports")').click();
    Logger.step('Clicked on Reports menu');
  }

  /**
   * Get dashboard greeting text
   */
  async getGreetingText(): Promise<string> {
    const greeting = await this.page.locator(this.welcomeText).textContent();
    return greeting?.trim() || '';
  }

  /**
   * Verify dashboard metrics are displayed
   */
  async verifyDashboardMetricsAreDisplayed(): Promise<boolean> {
    const metricsVisible = await this.page.locator(this.dashboardCard).isVisible();
    if (metricsVisible) {
      Logger.step('Dashboard metrics are displayed');
    }
    return metricsVisible;
  }

  /**
   * Verify quick launch section is visible
   */
  async verifyQuickLaunchIsVisible(): Promise<boolean> {
    const isVisible = await this.page.locator(this.assigneeQuickLinks).isVisible();
    if (isVisible) {
      Logger.step('Quick launch section is visible');
    }
    return isVisible;
  }

  /**
   * Get all menu items text
   */
  async getAllMenuItems(): Promise<string[]> {
    const menuItems = await this.page.locator(this.menuItems).allTextContents();
    Logger.step(`Found ${menuItems.length} menu items`);
    return menuItems;
  }

  /**
   * Click menu item by name
   */
  async clickMenuItemByName(menuName: string): Promise<void> {
    await this.page.locator(`button:has-text("${menuName}"), a:has-text("${menuName}")`).first().click();
    Logger.step(`Clicked menu item: ${menuName}`);
  }

  /**
   * Verify current page URL contains dashboard
   */
  async verifyDashboardUrl(): Promise<boolean> {
    const url = this.page.url();
    const isDashboard = url.includes('/dashboard');
    if (isDashboard) {
      Logger.step('Current URL is dashboard page');
    }
    return isDashboard;
  }
}
