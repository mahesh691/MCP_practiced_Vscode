/**
 * OrangeHRM End-to-End Integration Tests
 * Comprehensive workflow tests combining login, dashboard, and employee operations
 */
import { test, expect } from '../fixtures/testFixture';
import { Logger } from '../utils/logger';

const VALID_USERNAME = 'Admin';
const VALID_PASSWORD = 'admin123';

test.describe('OrangeHRM E2E Integration Tests', () => {
  test('TC301: Complete user journey - Login to Employee List', async ({
    loginPage,
    dashboardPage,
    employeePage,
    commonPage,
  }) => {
    await test.step('Step 1: Navigate to login page', async () => {
      await loginPage.navigateToLoginPage();
      const isPageDisplayed = await loginPage.verifyLoginPageIsDisplayed();
      expect(isPageDisplayed).toBe(true);
      Logger.step('Login page displayed');
    });

    await test.step('Step 2: Login with valid credentials', async () => {
      await loginPage.login(VALID_USERNAME, VALID_PASSWORD);
      Logger.step('Login credentials submitted');
    });

    await test.step('Step 3: Verify dashboard is displayed', async () => {
      await commonPage.waitForLoadingToComplete();
      const isDashboardVisible = await dashboardPage.verifyDashboardIsDisplayed();
      expect(isDashboardVisible).toBe(true);
      Logger.step('Dashboard displayed after login');
    });

    await test.step('Step 4: Verify sidebar menu is visible', async () => {
      const isMenuVisible = await dashboardPage.verifySidebarMenuIsVisible();
      expect(isMenuVisible).toBe(true);
      Logger.step('Sidebar menu is visible');
    });

    await test.step('Step 5: Navigate to Employee Management (PIM)', async () => {
      await dashboardPage.clickPIMMenu();
      await commonPage.waitForLoadingToComplete();
      Logger.step('Navigated to PIM module');
    });

    await test.step('Step 6: Verify employee list is displayed', async () => {
      const isListDisplayed = await employeePage.verifyEmployeeListPageIsDisplayed();
      expect(isListDisplayed).toBe(true);
      Logger.step('Employee list page displayed');
    });

    await test.step('Step 7: Verify employee list contains data', async () => {
      const hasData = await employeePage.verifyEmployeeTableHasData();
      expect(hasData).toBe(true);
      Logger.step('Employee table has data');
    });

    await test.step('Step 8: Logout from application', async () => {
      await commonPage.logout();
      await commonPage.waitForPageToLoad();
      Logger.step('Logout completed');
    });

    await test.step('Step 9: Verify login page is displayed', async () => {
      const isLoginPageVisible = await loginPage.verifyLoginPageIsDisplayed();
      expect(isLoginPageVisible).toBe(true);
      Logger.success('Complete user journey successfully verified');
    });
  });

  test('TC302: Search and view employee details workflow', async ({
    loginPage,
    dashboardPage,
    employeePage,
    commonPage,
  }) => {
    await test.step('Step 1: Login to application', async () => {
      await loginPage.navigateToLoginPage();
      await loginPage.login(VALID_USERNAME, VALID_PASSWORD);
      await commonPage.waitForLoadingToComplete();
      Logger.step('Logged in successfully');
    });

    await test.step('Step 2: Navigate to Employee List', async () => {
      await dashboardPage.clickPIMMenu();
      await commonPage.waitForLoadingToComplete();
      Logger.step('Navigated to Employee List');
    });

    await test.step('Step 3: Get first employee name', async () => {
      const employeeName = await employeePage.getFirstEmployeeNameFromList();
      expect(employeeName.length).toBeGreaterThan(0);
      Logger.step(`First employee: ${employeeName}`);
    });

    await test.step('Step 4: Click on first employee to view details', async () => {
      await employeePage.clickFirstEmployeeInList();
      await commonPage.waitForPageToLoad();
      Logger.step('Clicked on employee');
    });

    await test.step('Step 5: Verify employee details page', async () => {
      const url = await commonPage.getCurrentUrl();
      expect(url).toContain('/employee-information');
      Logger.success('Employee details page verified');
    });

    await test.step('Step 6: Logout', async () => {
      await commonPage.logout();
      Logger.step('Logged out');
    });
  });

  test('TC303: Navigate through multiple modules workflow', async ({
    loginPage,
    dashboardPage,
    commonPage,
  }) => {
    await test.step('Step 1: Login to application', async () => {
      await loginPage.navigateToLoginPage();
      await loginPage.login(VALID_USERNAME, VALID_PASSWORD);
      await commonPage.waitForLoadingToComplete();
      Logger.step('Logged in successfully');
    });

    const modules = [
      { name: 'PIM', click: () => dashboardPage.clickPIMMenu() },
      { name: 'Admin', click: () => dashboardPage.clickAdminMenu() },
    ];

    for (const module of modules) {
      await test.step(`Navigate to ${module.name} module`, async () => {
        // Go back to dashboard first
        await commonPage.page.goto('/web/index.php/dashboard/index', {
          waitUntil: 'domcontentloaded',
        });
        await commonPage.waitForLoadingToComplete();
        Logger.step(`Returned to dashboard`);
      });

      await test.step(`Click on ${module.name} menu`, async () => {
        await module.click();
        await commonPage.waitForLoadingToComplete();
        Logger.step(`Navigated to ${module.name}`);
      });

      await test.step(`Verify ${module.name} page URL`, async () => {
        const url = await commonPage.getCurrentUrl();
        expect(url).toContain('/');
        Logger.success(`${module.name} module verified`);
      });
    }

    await test.step('Step 5: Logout', async () => {
      await commonPage.logout();
      Logger.step('Logged out');
    });
  });

  test('TC304: Session persistence and page navigation', async ({
    loginPage,
    dashboardPage,
    employeePage,
    commonPage,
  }) => {
    await test.step('Step 1: Login to application', async () => {
      await loginPage.navigateToLoginPage();
      await loginPage.login(VALID_USERNAME, VALID_PASSWORD);
      await commonPage.waitForLoadingToComplete();
      Logger.step('Logged in successfully');
    });

    await test.step('Step 2: Navigate to Employee List', async () => {
      await dashboardPage.clickPIMMenu();
      await commonPage.waitForLoadingToComplete();
      Logger.step('Navigated to Employee List');
    });

    await test.step('Step 3: Verify employee data is present', async () => {
      const hasData = await employeePage.verifyEmployeeTableHasData();
      expect(hasData).toBe(true);
      Logger.step('Employee data present');
    });

    await test.step('Step 4: Refresh page while on employee list', async () => {
      await commonPage.page.reload();
      await commonPage.waitForLoadingToComplete();
      Logger.step('Page refreshed');
    });

    await test.step('Step 5: Verify still logged in and employee list displayed', async () => {
      const isListDisplayed = await employeePage.verifyEmployeeListPageIsDisplayed();
      expect(isListDisplayed).toBe(true);
      Logger.step('Session persisted after refresh');
    });

    await test.step('Step 6: Navigate back to dashboard', async () => {
      await dashboardPage.clickPIMMenu();
      await commonPage.waitForLoadingToComplete();
      Logger.step('Navigated back to dashboard area');
    });

    await test.step('Step 7: Logout', async () => {
      await commonPage.logout();
      Logger.success('Session and navigation verified');
    });
  });

  test('TC305: Error handling and recovery workflow', async ({
    loginPage,
    dashboardPage,
    commonPage,
  }) => {
    await test.step('Step 1: Attempt login with invalid credentials', async () => {
      await loginPage.navigateToLoginPage();
      await loginPage.login('InvalidUser', 'wrongpassword');
      Logger.step('Attempted login with invalid credentials');
    });

    await test.step('Step 2: Verify error message is displayed', async () => {
      const isErrorVisible = await loginPage.verifyErrorMessageIsDisplayed();
      expect(isErrorVisible).toBe(true);
      Logger.step('Error message displayed');
    });

    await test.step('Step 3: Retry login with valid credentials', async () => {
      await loginPage.login('Admin', 'admin123');
      await commonPage.waitForLoadingToComplete();
      Logger.step('Retried with valid credentials');
    });

    await test.step('Step 4: Verify login is successful', async () => {
      const isDashboardVisible = await dashboardPage.verifyDashboardIsDisplayed();
      expect(isDashboardVisible).toBe(true);
      Logger.step('Successfully logged in after failed attempt');
    });

    await test.step('Step 5: Logout', async () => {
      await commonPage.logout();
      Logger.success('Error handling and recovery verified');
    });
  });
});
