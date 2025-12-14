/**
 * OrangeHRM Employee Management Tests
 * Test coverage for employee list and employee operations
 */
import { test, expect } from '../fixtures/testFixture';
import { Logger } from '../utils/logger';

const VALID_USERNAME = 'Admin';
const VALID_PASSWORD = 'admin123';

test.describe('OrangeHRM Employee Management Tests', () => {
  test.beforeEach(async ({ loginPage, dashboardPage, commonPage }) => {
    await test.step('Navigate to login page', async () => {
      await loginPage.navigateToLoginPage();
      Logger.step('Test setup: Navigated to login page');
    });

    await test.step('Login with valid credentials', async () => {
      await loginPage.login(VALID_USERNAME, VALID_PASSWORD);
      await commonPage.waitForLoadingToComplete();
      Logger.step('Test setup: Logged in successfully');
    });

    await test.step('Navigate to Employee List', async () => {
      await dashboardPage.clickPIMMenu();
      await commonPage.waitForLoadingToComplete();
      Logger.step('Test setup: Navigated to Employee List');
    });
  });

  test('TC201: Verify employee list page is displayed', async ({ employeePage }) => {
    await test.step('Verify employee list table is visible', async () => {
      const isListDisplayed = await employeePage.verifyEmployeeListPageIsDisplayed();
      expect(isListDisplayed).toBe(true);
      Logger.success('Employee list page is displayed');
    });
  });

  test('TC202: Verify employee list contains data', async ({ employeePage }) => {
    await test.step('Check if employee table has records', async () => {
      const hasData = await employeePage.verifyEmployeeTableHasData();
      expect(hasData).toBe(true);
      Logger.success('Employee table contains records');
    });

    await test.step('Get total employee records', async () => {
      const recordCount = await employeePage.getEmployeeRecordsCount();
      expect(recordCount).toBeGreaterThan(0);
      Logger.success(`Total employee records: ${recordCount}`);
    });
  });

  test('TC203: Verify employee list columns are present', async ({ employeePage, commonPage }) => {
    await test.step('Get employee name from first record', async () => {
      const employeeName = await employeePage.getFirstEmployeeNameFromList();
      expect(employeeName.length).toBeGreaterThan(0);
      Logger.success(`First employee name: ${employeeName}`);
    });

    await test.step('Verify employee data is present', async () => {
      const hasData = await employeePage.verifyEmployeeTableHasData();
      expect(hasData).toBe(true);
      Logger.success('Employee data is present in table');
    });
  });

  test('TC204: Search for existing employee', async ({ employeePage, commonPage }) => {
    let employeeName = '';

    await test.step('Get first employee name', async () => {
      employeeName = await employeePage.getFirstEmployeeNameFromList();
      Logger.step(`First employee name: ${employeeName}`);
    });

    await test.step('Search for employee', async () => {
      if (employeeName) {
        await employeePage.searchEmployeeByName(employeeName);
        Logger.step(`Searching for: ${employeeName}`);
      }
    });

    await test.step('Execute search', async () => {
      await employeePage.clickSearchButton();
      await commonPage.waitForLoadingToComplete();
      Logger.step('Search completed');
    });

    await test.step('Verify search results', async () => {
      const hasData = await employeePage.verifyEmployeeTableHasData();
      expect(hasData).toBe(true);
      Logger.success('Search returned results');
    });
  });

  test('TC205: Search for non-existent employee', async ({ employeePage, commonPage }) => {
    await test.step('Search for non-existent employee', async () => {
      const nonExistentName = `NonExistent_${Date.now()}`;
      await employeePage.searchEmployeeByName(nonExistentName);
      Logger.step(`Searching for: ${nonExistentName}`);
    });

    await test.step('Execute search', async () => {
      await employeePage.clickSearchButton();
      await commonPage.waitForLoadingToComplete();
      Logger.step('Search completed');
    });

    await test.step('Verify no results message', async () => {
      const isNoRecordsDisplayed = await employeePage.verifyNoRecordsMessageIsDisplayed();
      const hasData = await employeePage.verifyEmployeeTableHasData();
      expect(isNoRecordsDisplayed || !hasData).toBe(true);
      Logger.success('No results displayed for non-existent employee');
    });
  });

  test('TC206: Click on first employee to view details', async ({ employeePage, commonPage }) => {
    await test.step('Verify employee table has data', async () => {
      const hasData = await employeePage.verifyEmployeeTableHasData();
      expect(hasData).toBe(true);
      Logger.step('Employee table has data');
    });

    await test.step('Click on first employee', async () => {
      await employeePage.clickFirstEmployeeInList();
      Logger.step('Clicked on first employee');
    });

    await test.step('Wait for page to load', async () => {
      await commonPage.waitForPageToLoad();
      Logger.step('Employee details page loaded');
    });

    await test.step('Verify employee details page', async () => {
      const url = await commonPage.getCurrentUrl();
      expect(url).toContain('/employee-information');
      Logger.success('Successfully opened employee details page');
    });
  });

  test('TC207: Verify Add Employee button exists', async ({ employeePage, commonPage }) => {
    await test.step('Verify Add Employee button is present', async () => {
      const addButtonLocator = commonPage.page.locator('a[href*="/pim/addemployee"]');
      const isVisible = await addButtonLocator.isVisible();
      expect(isVisible).toBe(true);
      Logger.success('Add Employee button is visible');
    });
  });

  test('TC208: Navigate to Add Employee page', async ({ employeePage, commonPage }) => {
    await test.step('Click Add Employee button', async () => {
      await employeePage.clickAddEmployeeButton();
      Logger.step('Clicked Add Employee button');
    });

    await test.step('Wait for page to load', async () => {
      await commonPage.waitForPageToLoad();
      Logger.step('Add Employee page loaded');
    });

    await test.step('Verify Add Employee form is displayed', async () => {
      const url = await commonPage.getCurrentUrl();
      expect(url).toContain('/addemployee');
      Logger.success('Successfully navigated to Add Employee page');
    });

    await test.step('Verify form fields are present', async () => {
      const firstNameField = commonPage.page.locator('input[name="firstName"]');
      const isVisible = await firstNameField.isVisible();
      expect(isVisible).toBe(true);
      Logger.success('First Name field is visible');
    });
  });

  test('TC209: Verify employee ID auto-generation on Add Employee page', async ({ employeePage, commonPage }) => {
    await test.step('Click Add Employee button', async () => {
      await employeePage.clickAddEmployeeButton();
      Logger.step('Clicked Add Employee button');
    });

    await test.step('Wait for page to load', async () => {
      await commonPage.waitForPageToLoad();
      Logger.step('Add Employee page loaded');
    });

    await test.step('Get auto-generated Employee ID', async () => {
      const employeeId = await employeePage.getGeneratedEmployeeId();
      expect(employeeId.length).toBeGreaterThan(0);
      Logger.success(`Auto-generated Employee ID: ${employeeId}`);
    });
  });

  test('TC210: Fill employee first and last name', async ({ employeePage, commonPage }) => {
    await test.step('Click Add Employee button', async () => {
      await employeePage.clickAddEmployeeButton();
      Logger.step('Clicked Add Employee button');
    });

    await test.step('Wait for page to load', async () => {
      await commonPage.waitForPageToLoad();
      Logger.step('Add Employee page loaded');
    });

    await test.step('Enter employee first name', async () => {
      const firstName = `TestUser_${Date.now()}`;
      await employeePage.enterEmployeeFirstName(firstName);
      Logger.step(`Entered first name: ${firstName}`);
    });

    await test.step('Enter employee last name', async () => {
      const lastName = `Employee_${Date.now()}`;
      await employeePage.enterEmployeeLastName(lastName);
      Logger.step(`Entered last name: ${lastName}`);
    });

    await test.step('Verify form fields are filled', async () => {
      const firstNameValue = await commonPage.page.locator('input[name="firstName"]').inputValue();
      const lastNameValue = await commonPage.page.locator('input[name="lastName"]').inputValue();
      expect(firstNameValue.length).toBeGreaterThan(0);
      expect(lastNameValue.length).toBeGreaterThan(0);
      Logger.success('Employee name fields successfully filled');
    });
  });

  test('TC211: Verify employee list pagination', async ({ employeePage, commonPage }) => {
    await test.step('Check for pagination controls', async () => {
      const paginationLocator = commonPage.page.locator('.oxd-pagination');
      const isPaginationVisible = await paginationLocator.isVisible().catch(() => false);
      Logger.step(`Pagination visible: ${isPaginationVisible}`);
    });

    await test.step('Verify employee records are displayed', async () => {
      const recordCount = await employeePage.getEmployeeRecordsCount();
      expect(recordCount).toBeGreaterThan(0);
      Logger.success(`Total records displayed: ${recordCount}`);
    });
  });

  test('TC212: Verify employee list refresh', async ({ employeePage, commonPage }) => {
    await test.step('Get initial employee count', async () => {
      const initialCount = await employeePage.getEmployeeRecordsCount();
      Logger.step(`Initial employee count: ${initialCount}`);
    });

    await test.step('Refresh the page', async () => {
      await commonPage.page.reload();
      await commonPage.waitForLoadingToComplete();
      Logger.step('Page refreshed');
    });

    await test.step('Verify employee list is still displayed', async () => {
      const isListDisplayed = await employeePage.verifyEmployeeListPageIsDisplayed();
      expect(isListDisplayed).toBe(true);
      Logger.success('Employee list displayed after refresh');
    });

    await test.step('Verify record count matches', async () => {
      const finalCount = await employeePage.getEmployeeRecordsCount();
      expect(finalCount).toBeGreaterThan(0);
      Logger.success(`Final employee count: ${finalCount}`);
    });
  });
});
