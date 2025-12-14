import { test, expect } from '@playwright/test';
import { WebTablesPage, TableRecord } from '../../pages/WebTablesPage';

test.describe('DemoQA Web Tables Tests', () => {
  let webTablesPage: WebTablesPage;

  test.beforeEach(async ({ page }) => {
    webTablesPage = new WebTablesPage(page);
    await webTablesPage.navigateToWebTables();
  });

  test('Add a new record to the table', async ({ page }) => {
    const newRecord: TableRecord = {
      firstName: 'John',
      lastName: 'Anderson',
      email: 'john.anderson@example.com',
      age: '32',
      salary: '75000',
      department: 'IT',
    };

    await test.step('Add new record', async () => {
      await webTablesPage.addRecord(newRecord);
    });

    await test.step('Verify record is added to table', async () => {
      const isVisible = await webTablesPage.isRecordVisible(newRecord);
      expect(isVisible).toBe(true);
    });

    await test.step('Verify record contains all data', async () => {
      const recordData = await webTablesPage.getRecordData(newRecord.firstName);
      expect(recordData.join(' ')).toContain(newRecord.firstName);
      expect(recordData.join(' ')).toContain(newRecord.lastName);
      expect(recordData.join(' ')).toContain(newRecord.email);
    });
  });

  test('Search for a specific record', async ({ page }) => {
    const newRecord: TableRecord = {
      firstName: 'Sarah',
      lastName: 'Mitchell',
      email: 'sarah.mitchell@example.com',
      age: '28',
      salary: '65000',
      department: 'Marketing',
    };

    await test.step('Add a new record', async () => {
      await webTablesPage.addRecord(newRecord);
    });

    await test.step('Search for the record by first name', async () => {
      await webTablesPage.searchRecord(newRecord.firstName);
    });

    await test.step('Verify search results show the record', async () => {
      const isVisible = await webTablesPage.isRecordVisible(newRecord);
      expect(isVisible).toBe(true);
    });

    await test.step('Verify record data matches search result', async () => {
      const recordData = await webTablesPage.getRecordData(newRecord.firstName);
      expect(recordData.join(' ')).toContain(newRecord.firstName);
      expect(recordData.join(' ')).toContain(newRecord.email);
    });

    await test.step('Clear search to show all records', async () => {
      await webTablesPage.clearSearch();
      await page.waitForTimeout(500);
    });
  });

  test('Edit an existing record', async ({ page }) => {
    const originalRecord: TableRecord = {
      firstName: 'Michael',
      lastName: 'Johnson',
      email: 'michael.johnson@example.com',
      age: '35',
      salary: '85000',
      department: 'Finance',
    };

    const updatedRecord: TableRecord = {
      firstName: 'Michael',
      lastName: 'Jackson',
      email: 'michael.jackson@example.com',
      age: '36',
      salary: '90000',
      department: 'HR',
    };

    await test.step('Add initial record', async () => {
      await webTablesPage.addRecord(originalRecord);
    });

    await test.step('Verify record is added', async () => {
      const isVisible = await webTablesPage.isRecordVisible(originalRecord);
      expect(isVisible).toBe(true);
    });

    await test.step('Edit the record', async () => {
      await webTablesPage.editRecord(originalRecord.firstName, updatedRecord);
    });

    await test.step('Verify record is updated', async () => {
      const recordData = await webTablesPage.getRecordData(updatedRecord.firstName);
      const dataString = recordData.join(' ');
      expect(dataString).toContain(updatedRecord.lastName);
      expect(dataString).toContain(updatedRecord.email);
      expect(dataString).toContain(updatedRecord.age);
    });
  });

  test('Delete a record from the table', async ({ page }) => {
    const recordToDelete: TableRecord = {
      firstName: 'Emma',
      lastName: 'Wilson',
      email: 'emma.wilson@example.com',
      age: '29',
      salary: '70000',
      department: 'Operations',
    };

    await test.step('Add a record', async () => {
      await webTablesPage.addRecord(recordToDelete);
    });

    await test.step('Verify record is added', async () => {
      const isVisible = await webTablesPage.isRecordVisible(recordToDelete);
      expect(isVisible).toBe(true);
    });

    await test.step('Delete the record', async () => {
      await webTablesPage.deleteRecord(recordToDelete.firstName);
    });

    await test.step('Verify record is deleted', async () => {
      const isDeleted = await webTablesPage.isRecordDeleted(recordToDelete.firstName);
      expect(isDeleted).toBe(true);
    });
  });

  test('Complete CRUD workflow: Add, Search, Edit, and Delete', async ({ page }) => {
    const record: TableRecord = {
      firstName: 'David',
      lastName: 'Brown',
      email: 'david.brown@example.com',
      age: '40',
      salary: '95000',
      department: 'Management',
    };

    const updatedRecord: TableRecord = {
      firstName: 'David',
      lastName: 'Smith',
      email: 'david.smith@example.com',
      age: '41',
      salary: '100000',
      department: 'Executive',
    };

    await test.step('Create: Add new record', async () => {
      await webTablesPage.addRecord(record);
      const isVisible = await webTablesPage.isRecordVisible(record);
      expect(isVisible).toBe(true);
    });

    await test.step('Read: Search for the record', async () => {
      await webTablesPage.searchRecord(record.firstName);
      const recordData = await webTablesPage.getRecordData(record.firstName);
      expect(recordData.join(' ')).toContain(record.email);
    });

    await test.step('Clear search for edit operation', async () => {
      await webTablesPage.clearSearch();
      await page.waitForTimeout(500);
    });

    await test.step('Update: Edit the record', async () => {
      await webTablesPage.editRecord(record.firstName, updatedRecord);
      const recordData = await webTablesPage.getRecordData(updatedRecord.firstName);
      expect(recordData.join(' ')).toContain(updatedRecord.lastName);
      expect(recordData.join(' ')).toContain(updatedRecord.email);
    });

    await test.step('Delete: Remove the record', async () => {
      await webTablesPage.deleteRecord(updatedRecord.firstName);
      const isDeleted = await webTablesPage.isRecordDeleted(updatedRecord.firstName);
      expect(isDeleted).toBe(true);
    });
  });

  test('Add multiple records and verify table contains them', async ({ page }) => {
    const records: TableRecord[] = [
      {
        firstName: 'Alice',
        lastName: 'Cooper',
        email: 'alice.cooper@example.com',
        age: '30',
        salary: '72000',
        department: 'Design',
      },
      {
        firstName: 'Bob',
        lastName: 'Dylan',
        email: 'bob.dylan@example.com',
        age: '33',
        salary: '80000',
        department: 'Development',
      },
      {
        firstName: 'Carol',
        lastName: 'White',
        email: 'carol.white@example.com',
        age: '27',
        salary: '60000',
        department: 'Support',
      },
    ];

    await test.step('Add multiple records', async () => {
      for (const record of records) {
        await webTablesPage.addRecord(record);
      }
    });

    await test.step('Verify all records are visible in table', async () => {
      for (const record of records) {
        const isVisible = await webTablesPage.isRecordVisible(record);
        expect(isVisible).toBe(true);
      }
    });

    await test.step('Verify table row count', async () => {
      const rowCount = await webTablesPage.getTableRows();
      expect(rowCount).toBeGreaterThanOrEqual(records.length);
    });
  });
});
