import { Page } from '@playwright/test';

export interface TableRecord {
  firstName: string;
  lastName: string;
  email: string;
  age: string;
  salary: string;
  department: string;
}

export class WebTablesPage {
  constructor(private page: Page) {}

  // Locators
  private addNewRecordButton = '#addNewRecordButton';
  private firstNameInput = '#firstName';
  private lastNameInput = '#lastName';
  private emailInput = '#userEmail';
  private ageInput = '#age';
  private salaryInput = '#salary';
  private departmentInput = '#department';
  private submitButton = '#submit';
  private searchInput = '#searchBox';
  private tableBody = '.rt-tbody';
  private deleteButtonSelector = (firstName: string) => `//div[contains(text(), '${firstName}')]//..//span[@title='Delete']`;
  private editButtonSelector = (firstName: string) => `//div[contains(text(), '${firstName}')]//..//span[@title='Edit']`;
  private tableRowSelector = (firstName: string) => `//div[@class='rt-tr-group' and .//div[contains(text(), '${firstName}')]]`;
  private modalDialog = '.modal.fade.show';
  private closeModalButton = '.close';
  private noRecordsMessage = '.rt-noData';

  async navigateToWebTables(): Promise<void> {
    await this.page.goto('/webtables');
    await this.page.waitForLoadState('domcontentloaded');
  }

  async clickAddNewRecord(): Promise<void> {
    await this.page.click(this.addNewRecordButton);
    await this.page.waitForSelector(this.modalDialog);
  }

  async fillNewRecord(record: TableRecord): Promise<void> {
    await this.page.fill(this.firstNameInput, record.firstName);
    await this.page.fill(this.lastNameInput, record.lastName);
    await this.page.fill(this.emailInput, record.email);
    await this.page.fill(this.ageInput, record.age);
    await this.page.fill(this.salaryInput, record.salary);
    await this.page.fill(this.departmentInput, record.department);
  }

  async submitRecord(): Promise<void> {
    await this.page.click(this.submitButton);
    await this.page.waitForSelector(this.modalDialog, { state: 'hidden' });
  }

  async addRecord(record: TableRecord): Promise<void> {
    await this.clickAddNewRecord();
    await this.fillNewRecord(record);
    await this.submitRecord();
  }

  async searchRecord(firstName: string): Promise<void> {
    await this.page.fill(this.searchInput, firstName);
    await this.page.waitForTimeout(500); // Wait for search results to filter
  }

  async isRecordVisible(record: TableRecord): Promise<boolean> {
    const rowLocator = this.page.locator(this.tableRowSelector(record.firstName));
    return await rowLocator.isVisible();
  }

  async getRecordData(firstName: string): Promise<string[]> {
    const rowLocator = this.page.locator(this.tableRowSelector(firstName));
    const cells = rowLocator.locator('.rt-td');
    const count = await cells.count();
    const data: string[] = [];

    for (let i = 0; i < count; i++) {
      const text = await cells.nth(i).textContent();
      data.push(text?.trim() || '');
    }

    return data;
  }

  async editRecord(firstName: string, updatedRecord: TableRecord): Promise<void> {
    // Click edit button
    const editButton = this.page.locator(this.editButtonSelector(firstName));
    await editButton.click();
    await this.page.waitForSelector(this.modalDialog);

    // Clear and fill fields
    await this.page.fill(this.firstNameInput, '');
    await this.page.fill(this.firstNameInput, updatedRecord.firstName);

    await this.page.fill(this.lastNameInput, '');
    await this.page.fill(this.lastNameInput, updatedRecord.lastName);

    await this.page.fill(this.emailInput, '');
    await this.page.fill(this.emailInput, updatedRecord.email);

    await this.page.fill(this.ageInput, '');
    await this.page.fill(this.ageInput, updatedRecord.age);

    await this.page.fill(this.salaryInput, '');
    await this.page.fill(this.salaryInput, updatedRecord.salary);

    await this.page.fill(this.departmentInput, '');
    await this.page.fill(this.departmentInput, updatedRecord.department);

    // Submit changes
    await this.submitRecord();
  }

  async deleteRecord(firstName: string): Promise<void> {
    const deleteButton = this.page.locator(this.deleteButtonSelector(firstName));
    await deleteButton.click();
    await this.page.waitForTimeout(500); // Wait for deletion to complete
  }

  async clearSearch(): Promise<void> {
    const searchField = this.page.locator(this.searchInput);
    await searchField.click();
    await searchField.fill('');
  }

  async isRecordDeleted(firstName: string): Promise<boolean> {
    const rowLocator = this.page.locator(this.tableRowSelector(firstName));
    return await rowLocator.isHidden();
  }

  async getTableRows(): Promise<number> {
    const rows = this.page.locator('.rt-tr-group');
    return await rows.count();
  }
}
