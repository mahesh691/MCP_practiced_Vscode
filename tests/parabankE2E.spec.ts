import { test } from '../fixtures/testFixture';
import { Logger } from '../utils/logger';

test('Parabank E2E Flow', async ({ launchPage, authPage, accountPage, transferPage, commonPage }) => {
  const username = `user_${Date.now()}`;
  const password = 'password123';

  await test.step('Launch Parabank Homepage', async () => {
    await launchPage.navigateToHomePage();
    await launchPage.validateHomePage();
    Logger.step('Homepage launched successfully');
  });

  await test.step('Register a new user', async () => {
    await authPage.registerUser(username, password);
    Logger.step('User registered successfully');
  });

  // Ensure the user is logged out before attempting to log in
  await test.step('Logout after registration (if logged in)', async () => {
    await commonPage.logout();
    Logger.step('User logged out successfully after registration');
  });

  await test.step('Login with the new user', async () => {
    await authPage.login(username, password);
    Logger.step('User logged in successfully');
  });

  await test.step('Open a new checking account', async () => {
    await accountPage.openNewAccount();
    await accountPage.validateAccountCreation();
    Logger.step('New account created successfully');
  });

  await test.step('Transfer funds between accounts', async () => {
    await transferPage.transferFunds('100', '14787', '14787');
    await transferPage.validateTransferSuccess();
    Logger.step('Funds transferred successfully');
  });

  await test.step('Logout', async () => {
    await commonPage.logout();
    Logger.step('User logged out successfully');
  });
});
