import { Page } from '@playwright/test';
import { Logger } from '../utils/logger';

/**
 * PB_EmployeePage - Page Object for OrangeHRM Employee Management
 * Handles employee list and employee-related interactions
 */
export class PB_EmployeePage {
  private readonly employeeListTable = '.oxd-table';
  private readonly addEmployeeButton = 'a:has-text("Add")';
  private readonly employeeSearchInput = 'input[placeholder*="Type"]';
  private readonly searchButton = 'button:has-text("Search")';
  private readonly employeeFirstNameField = 'input[placeholder="First Name"]';
  private readonly employeeLastNameField = 'input[placeholder="Last Name"]';
  private readonly employeeIdField = 'input[placeholder="Employee Id"]';
  private readonly saveButton = 'button:has-text("Save")';
  private readonly successMessage = '.oxd-notify--success';
  private readonly tableRows = '.oxd-table-body .oxd-table-row';
  private readonly noRecordsText = '.orangehrm-empty-state';
  private readonly employeeNameCell = '.oxd-table-cell:first-child';

  constructor(private page: Page) {}

  /**
   * Verify employee list page is displayed
   */
  async verifyEmployeeListPageIsDisplayed(): Promise<boolean> {
    await this.page.waitForLoadState('domcontentloaded');
    const isVisible = await this.page.locator(this.employeeListTable).isVisible();
    if (isVisible) {
      Logger.step('Employee list page is displayed');
    }
    return isVisible;
  }

  /**
   * Click Add Employee button
   */
  async clickAddEmployeeButton(): Promise<void> {
    await this.page.locator(this.addEmployeeButton).click();
    Logger.step('Clicked Add Employee button');
  }

  /**
   * Enter employee first name
   */
  async enterEmployeeFirstName(firstName: string): Promise<void> {
    await this.page.locator(this.employeeFirstNameField).fill(firstName);
    Logger.step(`Entered first name: ${firstName}`);
  }

  /**
   * Enter employee last name
   */
  async enterEmployeeLastName(lastName: string): Promise<void> {
    await this.page.locator(this.employeeLastNameField).fill(lastName);
    Logger.step(`Entered last name: ${lastName}`);
  }

  /**
   * Get generated Employee ID
   */
  async getGeneratedEmployeeId(): Promise<string> {
    const employeeId = await this.page.locator(this.employeeIdField).inputValue();
    return employeeId;
  }

  /**
   * Save employee
   */
  async saveEmployee(): Promise<void> {
    await this.page.locator(this.saveButton).click();
    Logger.step('Clicked Save Employee button');
  }

  /**
   * Verify success message is displayed
   */
  async verifySuccessMessageIsDisplayed(): Promise<boolean> {
    const isVisible = await this.page.locator(this.successMessage).isVisible();
    if (isVisible) {
      const message = await this.page.locator(this.successMessage).textContent();
      Logger.step(`Success message displayed: ${message}`);
    }
    return isVisible;
  }

  /**
   * Search employee by name
   */
  async searchEmployeeByName(employeeName: string): Promise<void> {
    const searchField = this.page.locator(this.employeeSearchInput).first();
    await searchField.fill(employeeName);
    await this.page.waitForTimeout(500); // Wait for suggestions
    Logger.step(`Searching for employee: ${employeeName}`);
  }

  /**
   * Click search button
   */
  async clickSearchButton(): Promise<void> {
    await this.page.locator(this.searchButton).click();
    Logger.step('Clicked Search button');
  }

  /**
   * Get total employee records count
   */
  async getEmployeeRecordsCount(): Promise<number> {
    const rows = await this.page.locator(this.tableRows).count();
    Logger.step(`Total employee records: ${rows}`);
    return rows;
  }

  /**
   * Verify no records message is displayed
   */
  async verifyNoRecordsMessageIsDisplayed(): Promise<boolean> {
    const isVisible = await this.page.locator(this.noRecordsText).isVisible();
    if (isVisible) {
      Logger.step('No records found message is displayed');
    }
    return isVisible;
  }

  /**
   * Get first employee name from list
   */
  async getFirstEmployeeNameFromList(): Promise<string> {
    const firstName = await this.page.locator(this.tableRows).first().locator(this.employeeNameCell).textContent();
    return firstName?.trim() || '';
  }

  /**
   * Click on first employee in list
   */
  async clickFirstEmployeeInList(): Promise<void> {
    await this.page.locator(this.tableRows).first().click();
    Logger.step('Clicked on first employee in list');
  }

  /**
   * Verify employee table has data
   */
  async verifyEmployeeTableHasData(): Promise<boolean> {
    const rows = await this.page.locator(this.tableRows).count();
    const hasData = rows > 0;
    if (hasData) {
      Logger.step(`Employee table has ${rows} records`);
    }
    return hasData;
  }
}
