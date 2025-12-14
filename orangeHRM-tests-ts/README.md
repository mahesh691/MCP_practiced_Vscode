# OrangeHRM Playwright TypeScript Test Automation

A comprehensive Playwright-based test automation framework for the OrangeHRM demo application. This project uses TypeScript with the **Page Object Model (POM)** pattern for maintainability and scalability.

## 📋 Project Structure

```
orangeHRM-tests-ts/
├── tests/                          # Test specification files
│   ├── orangeHRM-login.spec.ts     # Login functionality tests (10 test cases)
│   ├── orangeHRM-dashboard.spec.ts # Dashboard tests (12 test cases)
│   ├── orangeHRM-employee.spec.ts  # Employee management tests (12 test cases)
│   └── orangeHRM-e2e.spec.ts       # End-to-end integration tests (5 test cases)
├── PB_pages/                       # Page Object classes
│   ├── PB_LoginPage.ts             # Login page interactions
│   ├── PB_DashboardPage.ts         # Dashboard page interactions
│   ├── PB_EmployeePage.ts          # Employee management interactions
│   └── PB_CommonPage.ts            # Shared common functionality
├── fixtures/                       # Test fixtures
│   └── testFixture.ts              # Custom fixture with dependency injection
├── utils/                          # Utility functions
│   └── logger.ts                   # Centralized logging utility
├── playwright.config.ts            # Playwright configuration
├── tsconfig.json                   # TypeScript configuration
├── package.json                    # Project dependencies
└── README.md                       # This file
```

## 🎯 Test Coverage

### Total: 39 Test Cases

#### Login Tests (10 cases)
- TC001: Verify login page is displayed
- TC002: Successful login with valid credentials
- TC003: Login with invalid username
- TC004: Login with invalid password
- TC005: Login with empty credentials
- TC006: Verify username field can be cleared
- TC007: Verify password field can be cleared
- TC008: Verify login page responsiveness
- TC009: Verify username field focus
- TC010: Multiple login attempts with invalid credentials

#### Dashboard Tests (12 cases)
- TC101: Verify dashboard is displayed after successful login
- TC102: Verify sidebar menu is visible
- TC103: Verify dashboard URL is correct
- TC104: Verify dashboard metrics section is visible
- TC105: Verify quick launch section is visible
- TC106: Navigate to PIM menu
- TC107: Navigate to Admin menu
- TC108: Navigate to Time & Attendance menu
- TC109: Verify greeting/welcome message
- TC110: Verify user can logout from dashboard
- TC111: Verify page title is present
- TC112: Verify dashboard loads without errors

#### Employee Management Tests (12 cases)
- TC201: Verify employee list page is displayed
- TC202: Verify employee list contains data
- TC203: Verify employee list columns are present
- TC204: Search for existing employee
- TC205: Search for non-existent employee
- TC206: Click on first employee to view details
- TC207: Verify Add Employee button exists
- TC208: Navigate to Add Employee page
- TC209: Verify employee ID auto-generation on Add Employee page
- TC210: Fill employee first and last name
- TC211: Verify employee list pagination
- TC212: Verify employee list refresh

#### E2E Integration Tests (5 cases)
- TC301: Complete user journey - Login to Employee List
- TC302: Search and view employee details workflow
- TC303: Navigate through multiple modules workflow
- TC304: Session persistence and page navigation
- TC305: Error handling and recovery workflow

## 🚀 Quick Start

### Prerequisites
- Node.js (v14 or higher)
- npm (v6 or higher)

### Installation

1. **Navigate to the project directory:**
   ```bash
   cd orangeHRM-tests-ts
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Install Playwright browsers:**
   ```bash
   npx playwright install
   ```

### Running Tests

```bash
# Run all tests
npm test

# Run tests in UI mode (interactive)
npm run test:ui

# Run tests in debug mode
npm run test:debug

# Run tests in headed mode (visible browser)
npm run test:headed

# Run specific test suite
npm run test:login      # Login tests only
npm run test:dashboard  # Dashboard tests only
npm run test:employee   # Employee tests only

# View HTML report
npm run test:report
```

## 📖 Test Execution Options

### Run All Tests with Chromium
```bash
npx playwright test
```

### Run Tests with Specific Browser
```bash
npx playwright test --project=chromium
npx playwright test --project=firefox
npx playwright test --project=webkit
```

### Run Tests with Mobile Viewports
```bash
npx playwright test --project="Mobile Chrome"
npx playwright test --project="Mobile Safari"
```

### Run Specific Test File
```bash
npx playwright test tests/orangeHRM-login.spec.ts
```

### Run Specific Test by Name
```bash
npx playwright test -g "TC001"
```

## 🏗️ Architecture

### Page Object Model (POM)
Each page in the OrangeHRM application has a corresponding Page Object class:

- **PB_LoginPage**: Handles login page interactions (selectors, actions, validations)
- **PB_DashboardPage**: Manages dashboard navigation and menu interactions
- **PB_EmployeePage**: Handles employee list and employee management operations
- **PB_CommonPage**: Contains shared functionality used across pages (logout, page waits, screenshots)

### Custom Fixtures
Tests use dependency injection via custom Playwright fixtures. This pattern:
- Automatically instantiates page objects
- Ensures proper lifecycle management
- Reduces code duplication
- Improves test readability

Example:
```typescript
test('TC001: Test name', async ({ loginPage, dashboardPage, commonPage }) => {
  // Page objects are already available
  await loginPage.login('Admin', 'admin123');
  await dashboardPage.verifyDashboardIsDisplayed();
});
```

### Logger Utility
Centralized logging provides consistent test output:

```typescript
Logger.step('User performed action');    // Step logs
Logger.success('Test passed');           // Success logs
Logger.error('Test failed', error);      // Error logs
Logger.info('Additional info');          // Info logs
Logger.warn('Warning message');          // Warning logs
Logger.debug('Debug info', data);        // Debug logs
```

## 🔧 Configuration

### Playwright Config (`playwright.config.ts`)

Key settings:
- **baseURL**: `https://opensource-demo.orangehrmlive.com/web/index.php`
- **timeout**: 30 seconds per action
- **expect.timeout**: 5 seconds per assertion
- **video**: Records videos only on test failure
- **screenshot**: Captures screenshots only on test failure
- **trace**: Records trace for debugging

### Test Credentials

Default admin credentials (for the demo site):
- **Username**: `Admin`
- **Password**: `admin123`

## 📊 Test Reports

After running tests, Playwright generates an HTML report:

```bash
npm run test:report
```

Report includes:
- Test execution summary
- Pass/fail status for each test
- Screenshot and video attachments
- Test execution timeline
- Error details and stack traces

## 🛠️ Development

### Adding New Tests

1. Create a new test file in `tests/` directory
2. Import the custom fixture:
   ```typescript
   import { test, expect } from '../fixtures/testFixture';
   ```
3. Use page objects for interactions:
   ```typescript
   test('New test', async ({ loginPage, dashboardPage }) => {
     // Your test code
   });
   ```

### Adding New Page Objects

1. Create a new file in `PB_pages/` directory
2. Define selectors as private class properties
3. Implement methods for interactions and validations
4. Add the page object to `testFixture.ts`

Example:
```typescript
export class PB_NewPage {
  private readonly someSelector = 'selector-string';
  
  constructor(private page: Page) {}
  
  async someAction(): Promise<void> {
    await this.page.locator(this.someSelector).click();
  }
}
```

## 📝 Test Naming Convention

Test cases follow a systematic naming pattern:
- **TC001-TC010**: Login tests
- **TC101-TC112**: Dashboard tests
- **TC201-TC212**: Employee management tests
- **TC301-TC305**: E2E integration tests

## ✅ Best Practices

1. **Use Page Objects**: All page interactions go through page object methods
2. **Consistent Logging**: Use Logger utility for all test output
3. **Explicit Waits**: Use `waitForLoadingToComplete()` for dynamic content
4. **Test Independence**: Each test should be independent and runnable in any order
5. **Clear Test Steps**: Use `test.step()` for logical test segments
6. **Error Handling**: Implement proper error messages and assertions

## 🐛 Troubleshooting

### Tests fail due to timeout
- Increase `timeout` in `playwright.config.ts`
- Check network connectivity to the demo site
- Verify element selectors are correct

### Selectors not found
- Use Playwright Inspector: `npx playwright test --debug`
- Verify application markup hasn't changed
- Update selectors in page objects accordingly

### Flaky tests
- Add explicit waits for dynamic content
- Use `waitForLoadingToComplete()` method
- Increase `expect.timeout` for assertions

## 📚 Resources

- [Playwright Documentation](https://playwright.dev/)
- [OrangeHRM Demo Site](https://opensource-demo.orangehrmlive.com/)
- [Page Object Model Pattern](https://playwright.dev/docs/pom)
- [Playwright Best Practices](https://playwright.dev/docs/best-practices)

## 📝 License

This project is provided as-is for testing and learning purposes.

## 👤 Author

Automated Test Framework for OrangeHRM Demo Application

---

**Last Updated**: December 2025
**Framework Version**: 1.0.0
**Playwright Version**: ^1.40.1
