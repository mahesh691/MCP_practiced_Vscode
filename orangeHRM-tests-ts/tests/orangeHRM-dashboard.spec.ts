/**
 * OrangeHRM Dashboard Tests
 * Test coverage for dashboard functionality and navigation
 */
import { test, expect } from '../fixtures/testFixture';
import { Logger } from '../utils/logger';

const VALID_USERNAME = 'Admin';
const VALID_PASSWORD = 'admin123';

test.describe('OrangeHRM Dashboard Tests', () => {
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
  });

  test('TC101: Verify dashboard is displayed after successful login', async ({ dashboardPage, commonPage }) => {
    await test.step('Verify dashboard container is visible', async () => {
      const isDashboardVisible = await dashboardPage.verifyDashboardIsDisplayed();
      expect(isDashboardVisible).toBe(true);
      Logger.success('Dashboard is displayed');
    });

    await test.step('Verify main content is visible', async () => {
      const isContentVisible = await commonPage.isMainContentVisible();
      expect(isContentVisible).toBe(true);
      Logger.success('Main content is visible');
    });
  });

  test('TC102: Verify sidebar menu is visible', async ({ dashboardPage }) => {
    await test.step('Check if sidebar menu is visible', async () => {
      const isMenuVisible = await dashboardPage.verifySidebarMenuIsVisible();
      expect(isMenuVisible).toBe(true);
      Logger.success('Sidebar menu is visible');
    });

    await test.step('Verify multiple menu items exist', async () => {
      const menuItems = await dashboardPage.getAllMenuItems();
      expect(menuItems.length).toBeGreaterThan(0);
      Logger.success(`Found ${menuItems.length} menu items`);
    });
  });

  test('TC103: Verify dashboard URL is correct', async ({ dashboardPage, commonPage }) => {
    await test.step('Get current URL', async () => {
      const url = await commonPage.getCurrentUrl();
      Logger.step(`Current URL: ${url}`);
    });

    await test.step('Verify dashboard in URL or homepage', async () => {
      const url = await commonPage.getCurrentUrl();
      const isValidUrl = url.includes('/dashboard') || url.includes('/index.php');
      expect(isValidUrl).toBe(true);
      Logger.success('URL is correct');
    });
  });

  test('TC104: Verify dashboard metrics section is visible', async ({ dashboardPage }) => {
    await test.step('Check if dashboard metrics are displayed', async () => {
      const metricsVisible = await dashboardPage.verifyDashboardMetricsAreDisplayed();
      expect(metricsVisible).toBe(true);
      Logger.success('Dashboard metrics are displayed');
    });
  });

  test('TC105: Verify quick launch section is visible', async ({ dashboardPage }) => {
    await test.step('Check if quick launch section exists', async () => {
      const isQuickLaunchVisible = await dashboardPage.verifyQuickLaunchIsVisible();
      expect(isQuickLaunchVisible).toBe(true);
      Logger.success('Quick launch section is visible');
    });
  });

  test('TC106: Navigate to PIM menu', async ({ dashboardPage, commonPage }) => {
    await test.step('Click on PIM menu', async () => {
      await dashboardPage.clickPIMMenu();
      Logger.step('Clicked PIM menu');
    });

    await test.step('Wait for page to load', async () => {
      await commonPage.waitForPageToLoad();
      Logger.step('Page loaded');
    });

    await test.step('Verify navigation was successful', async () => {
      const url = await commonPage.getCurrentUrl();
      expect(url).toContain('/pim');
      Logger.success('Successfully navigated to PIM module');
    });
  });

  test('TC107: Navigate to Admin menu', async ({ dashboardPage, commonPage }) => {
    await test.step('Click on Admin menu', async () => {
      await dashboardPage.clickAdminMenu();
      Logger.step('Clicked Admin menu');
    });

    await test.step('Wait for page to load', async () => {
      await commonPage.waitForPageToLoad();
      Logger.step('Page loaded');
    });

    await test.step('Verify navigation was successful', async () => {
      const url = await commonPage.getCurrentUrl();
      expect(url).toContain('/admin');
      Logger.success('Successfully navigated to Admin module');
    });
  });

  test('TC108: Navigate to Time & Attendance menu', async ({ dashboardPage, commonPage }) => {
    await test.step('Click on Time & Attendance menu', async () => {
      await dashboardPage.clickTimeAttendanceMenu();
      Logger.step('Clicked Time & Attendance menu');
    });

    await test.step('Wait for page to load', async () => {
      await commonPage.waitForPageToLoad();
      Logger.step('Page loaded');
    });

    await test.step('Verify navigation was successful', async () => {
      const url = await commonPage.getCurrentUrl();
      expect(url).toContain('time');
      Logger.success('Successfully navigated to Time & Attendance module');
    });
  });

  test('TC109: Verify greeting/welcome message', async ({ dashboardPage }) => {
    await test.step('Get dashboard greeting text', async () => {
      const greeting = await dashboardPage.getGreetingText();
      Logger.step(`Greeting text: ${greeting}`);
    });

    await test.step('Verify greeting is not empty', async () => {
      const greeting = await dashboardPage.getGreetingText();
      expect(greeting.length).toBeGreaterThan(0);
      Logger.success('Welcome/greeting message is displayed');
    });
  });

  test('TC110: Verify user can logout from dashboard', async ({ dashboardPage, commonPage, loginPage }) => {
    await test.step('Logout from dashboard', async () => {
      await commonPage.logout();
      Logger.step('Logout initiated');
    });

    await test.step('Verify login page is displayed', async () => {
      await commonPage.waitForPageToLoad();
      const isLoginPageVisible = await loginPage.verifyLoginPageIsDisplayed();
      expect(isLoginPageVisible).toBe(true);
      Logger.success('Successfully logged out - login page displayed');
    });
  });

  test('TC111: Verify page title is present', async ({ commonPage }) => {
    await test.step('Get page title', async () => {
      const title = await commonPage.getPageTitle();
      Logger.step(`Page title: ${title}`);
    });

    await test.step('Verify title is not empty', async () => {
      const title = await commonPage.getPageTitle();
      expect(title.length).toBeGreaterThan(0);
      Logger.success('Page title is displayed');
    });
  });

  // test('TC112: Verify dashboard loads without errors', async ({ dashboardPage, commonPage }) => {
  //   await test.step('Check for console errors', async () => {
  //     const errorMessages = await commonPage.page.evaluate(() => {
  //       return ((window as unknown) as Record<string, unknown>).__errors || [];
  //     });
  //     Logger.step('Checked for JavaScript errors');
  //   });
  //   await test.step('Verify no console errors occurred', async () => {
  //       const hasErrors = errorMessages.length > 0;
  //       expect(hasErrors).toBe(false);
  //       Logger.success('No console errors detected');
  //   });
  //   await test.step('Verify dashboard is still displayed', async () => {
  //     const isDashboardVisible = await dashboardPage.verifyDashboardIsDisplayed();
  //     expect(isDashboardVisible).toBe(true);
  //     Logger.success('Dashboard displayed without errors');
  //   });
  // });
});
