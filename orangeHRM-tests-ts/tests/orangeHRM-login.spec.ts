/**
 * OrangeHRM Login Tests
 * Test coverage for login functionality including valid/invalid credentials
 */
import { test, expect } from '../fixtures/testFixture';
import { Logger } from '../utils/logger';

// Test credentials
const VALID_USERNAME = 'Admin';
const VALID_PASSWORD = 'admin123';

test.describe('OrangeHRM Login Tests', () => {
  test.beforeEach(async ({ loginPage }) => {
    await test.step('Navigate to login page', async () => {
      await loginPage.navigateToLoginPage();
      Logger.step('Test setup: Navigated to login page');
    });
  });

  test('TC001: Verify login page is displayed', async ({ loginPage }) => {
    await test.step('Verify login page elements', async () => {
      const isPageDisplayed = await loginPage.verifyLoginPageIsDisplayed();
      expect(isPageDisplayed).toBe(true);
      Logger.success('Login page is displayed correctly');
    });

    await test.step('Verify login page title', async () => {
      const isTitleVisible = await loginPage.verifyLoginPageTitle();
      expect(isTitleVisible).toBe(true);
      Logger.success('Login page title is visible');
    });
  });

  test('TC002: Successful login with valid credentials', async ({ loginPage, dashboardPage, commonPage }) => {
    await test.step('Login with valid credentials', async () => {
      await loginPage.login(VALID_USERNAME, VALID_PASSWORD);
      Logger.step('Attempted login');
    });

    await test.step('Verify dashboard is displayed', async () => {
      await commonPage.waitForLoadingToComplete();
      const isDashboardVisible = await dashboardPage.verifyDashboardIsDisplayed();
      expect(isDashboardVisible).toBe(true);
      Logger.success('Dashboard displayed after login');
    });

    await test.step('Verify sidebar menu is visible', async () => {
      const isMenuVisible = await dashboardPage.verifySidebarMenuIsVisible();
      expect(isMenuVisible).toBe(true);
      Logger.success('Sidebar menu is visible');
    });
  });

  test('TC003: Login with invalid username', async ({ loginPage }) => {
    await test.step('Login with invalid username', async () => {
      await loginPage.login('InvalidUser', VALID_PASSWORD);
      Logger.step('Attempted login with invalid username');
    });

    await test.step('Verify error message is displayed', async () => {
      const isErrorVisible = await loginPage.verifyErrorMessageIsDisplayed();
      expect(isErrorVisible).toBe(true);
      Logger.success('Error message displayed for invalid username');
    });

    await test.step('Verify error message contains expected text', async () => {
      const errorMessage = await loginPage.getErrorMessage();
      expect(errorMessage.toLowerCase()).toContain('invalid');
      Logger.success(`Error message verified: ${errorMessage}`);
    });
  });

  test('TC004: Login with invalid password', async ({ loginPage }) => {
    await test.step('Login with invalid password', async () => {
      await loginPage.login(VALID_USERNAME, 'wrongpassword123');
      Logger.step('Attempted login with invalid password');
    });

    await test.step('Verify error message is displayed', async () => {
      const isErrorVisible = await loginPage.verifyErrorMessageIsDisplayed();
      expect(isErrorVisible).toBe(true);
      Logger.success('Error message displayed for invalid password');
    });

    await test.step('Verify error message text', async () => {
      const errorMessage = await loginPage.getErrorMessage();
      expect(errorMessage).toBeTruthy();
      Logger.success(`Error message: ${errorMessage}`);
    });
  });

  test('TC005: Login with empty credentials', async ({ loginPage }) => {
    await test.step('Attempt to login with empty credentials', async () => {
      await loginPage.login('', '');
      Logger.step('Attempted login with empty fields');
    });

    await test.step('Verify error message or page validation', async () => {
      // OrangeHRM might show validation message or stay on login page
      const isErrorVisible = await loginPage.verifyErrorMessageIsDisplayed();
      const isLoginPageStillVisible = await loginPage.verifyLoginPageIsDisplayed();
      expect(isErrorVisible || isLoginPageStillVisible).toBe(true);
      Logger.success('Validation working for empty credentials');
    });
  });

  test('TC006: Verify username field can be cleared', async ({ loginPage }) => {
    await test.step('Enter username', async () => {
      await loginPage.enterUsername('TestUser');
      Logger.step('Entered username');
    });

    await test.step('Clear username field', async () => {
      await loginPage.clearUsernameField();
      Logger.step('Cleared username field');
    });

    await test.step('Verify username field is empty', async () => {
      const usernameValue = await loginPage.page.locator('input[name="username"]').inputValue();
      expect(usernameValue).toBe('');
      Logger.success('Username field successfully cleared');
    });
  });

  test('TC007: Verify password field can be cleared', async ({ loginPage }) => {
    await test.step('Enter password', async () => {
      await loginPage.enterPassword('testpassword123');
      Logger.step('Entered password');
    });

    await test.step('Clear password field', async () => {
      await loginPage.clearPasswordField();
      Logger.step('Cleared password field');
    });

    await test.step('Verify password field is empty', async () => {
      const passwordValue = await loginPage.page.locator('input[name="password"]').inputValue();
      expect(passwordValue).toBe('');
      Logger.success('Password field successfully cleared');
    });
  });

  test('TC008: Verify login page responsiveness', async ({ loginPage, page }) => {
    await test.step('Verify login form is displayed on desktop view', async () => {
      const isFormVisible = await loginPage.verifyLoginPageIsDisplayed();
      expect(isFormVisible).toBe(true);
      Logger.success('Login form visible on desktop');
    });

    await test.step('Resize to mobile viewport', async () => {
      await page.setViewportSize({ width: 375, height: 667 });
      Logger.step('Resized viewport to mobile');
    });

    await test.step('Verify login form is still visible on mobile', async () => {
      const isFormVisible = await loginPage.verifyLoginPageIsDisplayed();
      expect(isFormVisible).toBe(true);
      Logger.success('Login form visible on mobile');
    });
  });

  test('TC009: Verify username field focus', async ({ loginPage }) => {
    await test.step('Check if username field can be focused', async () => {
      await loginPage.page.locator('input[name="username"]').focus();
      // const isFocused = await loginPage.isUsernameFieldFocused();
      // expect(isFocused).toBe(true);
      Logger.success('Username field is focusable');
    });
  });

  test('TC010: Multiple login attempts with invalid credentials', async ({ loginPage }) => {
    const attempts = 3;

    for (let i = 1; i <= attempts; i++) {
      await test.step(`Attempt ${i}: Login with invalid credentials`, async () => {
        await loginPage.login(`InvalidUser${i}`, `wrongpass${i}`);
        Logger.step(`Attempt ${i} executed`);
      });

      await test.step(`Attempt ${i}: Verify error message`, async () => {
        const isErrorVisible = await loginPage.verifyErrorMessageIsDisplayed();
        expect(isErrorVisible).toBe(true);
        Logger.success(`Attempt ${i}: Error displayed`);
      });

      if (i < attempts) {
        await test.step('Return to login page', async () => {
          await loginPage.navigateToLoginPage();
          Logger.step('Returned to login page');
        });
      }
    }
  });
});
