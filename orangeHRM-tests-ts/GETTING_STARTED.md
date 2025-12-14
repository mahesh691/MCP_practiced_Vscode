# OrangeHRM Playwright TypeScript Test Project - Setup & Getting Started

## 📦 Project Initialization Complete

Your complete Playwright TypeScript test automation project for OrangeHRM has been created at:
```
orangeHRM-tests-ts/
```

---

## 🚀 Quick Start (5 Minutes)

### Step 1: Navigate to Project Directory
```powershell
cd "orangeHRM-tests-ts"
```

### Step 2: Install Dependencies
```powershell
npm install
```
This installs:
- Playwright test framework
- TypeScript
- Type definitions

### Step 3: Install Browsers
```powershell
npx playwright install
```

### Step 4: Run Tests
```powershell
npm test
```

### Step 5: View Report
```powershell
npm run test:report
```

---

## 📁 Project Structure

```
orangeHRM-tests-ts/
│
├── 📄 Configuration Files
│   ├── playwright.config.ts      # Playwright configuration (baseURL, timeouts, reporters)
│   ├── tsconfig.json             # TypeScript configuration
│   ├── package.json              # Dependencies and scripts
│   └── .gitignore                # Git ignore patterns
│
├── 📂 tests/                     # Test Specifications (39 Test Cases)
│   ├── orangeHRM-login.spec.ts       # 10 login test cases
│   ├── orangeHRM-dashboard.spec.ts   # 12 dashboard test cases
│   ├── orangeHRM-employee.spec.ts    # 12 employee management test cases
│   └── orangeHRM-e2e.spec.ts         # 5 end-to-end integration test cases
│
├── 📂 PB_pages/                  # Page Object Model Classes
│   ├── PB_LoginPage.ts           # Login page interactions (9 methods)
│   ├── PB_DashboardPage.ts       # Dashboard interactions (10 methods)
│   ├── PB_EmployeePage.ts        # Employee management (12 methods)
│   └── PB_CommonPage.ts          # Shared functionality (10 methods)
│
├── 📂 fixtures/                  # Custom Playwright Fixtures
│   └── testFixture.ts            # Dependency injection for page objects
│
├── 📂 utils/                     # Utility Functions
│   └── logger.ts                 # Centralized logging (6 log levels)
│
└── 📄 Documentation
    ├── README.md                 # Complete project documentation
    ├── TEST_EXECUTION_GUIDE.md   # Detailed test execution commands
    └── TEST_COVERAGE_SUMMARY.md  # Test case coverage matrix
```

---

## 🎯 Test Coverage: 39 Test Cases

### Login Module (10 test cases)
- ✓ Page display validation
- ✓ Valid credential authentication
- ✓ Invalid username/password handling
- ✓ Empty field validation
- ✓ Field interaction (clear, focus)
- ✓ Responsive design
- ✓ Multiple failed attempts

### Dashboard Module (12 test cases)
- ✓ Post-login dashboard display
- ✓ Sidebar menu navigation
- ✓ URL verification
- ✓ Metrics and quick launch sections
- ✓ Module navigation (PIM, Admin, Time & Attendance)
- ✓ Greeting messages
- ✓ Logout functionality
- ✓ Error-free loading

### Employee Management Module (12 test cases)
- ✓ Employee list display
- ✓ Data presence validation
- ✓ Search functionality
- ✓ Employee details navigation
- ✓ Add employee form
- ✓ ID auto-generation
- ✓ Pagination
- ✓ Page refresh

### End-to-End Workflows (5 test cases)
- ✓ Complete user journey
- ✓ Search and view employee details
- ✓ Multi-module navigation
- ✓ Session persistence
- ✓ Error handling and recovery

---

## 📋 Available Commands

### Run Tests
```bash
npm test                    # Run all tests (all browsers)
npm run test:headed        # Run with visible browser
npm run test:ui            # Interactive UI mode
npm run test:debug         # Step-through debugging
npm run test:report        # View HTML report
```

### Run Specific Test Suite
```bash
npm run test:login         # Login tests only (10 cases)
npm run test:dashboard     # Dashboard tests only (12 cases)
npm run test:employee      # Employee tests only (12 cases)
```

### Advanced Commands
```bash
# Run specific browser
npx playwright test --project=chromium

# Run specific test by name
npx playwright test -g "TC001"

# Run with mobile viewport
npx playwright test --project="Mobile Chrome"

# Run in serial mode
npx playwright test --workers=1
```

---

## 🏗️ Architecture: Page Object Model (POM)

All test interactions go through Page Objects for maintainability:

```typescript
// Page Object Example: PB_LoginPage
export class PB_LoginPage {
  private readonly usernameField = 'input[name="username"]';
  private readonly passwordField = 'input[name="password"]';
  private readonly loginButton = 'button[type="submit"]';
  
  constructor(private page: Page) {}
  
  async login(username: string, password: string): Promise<void> {
    await this.enterUsername(username);
    await this.enterPassword(password);
    await this.clickLoginButton();
  }
}
```

### Page Objects Included
- **PB_LoginPage**: Login page interactions (9 methods)
- **PB_DashboardPage**: Dashboard and navigation (10 methods)
- **PB_EmployeePage**: Employee management (12 methods)
- **PB_CommonPage**: Shared functionality (10 methods)

**Total**: 4 Page Objects, 41 methods

---

## 🔧 Custom Fixtures (Dependency Injection)

Tests receive page objects automatically:

```typescript
import { test } from '../fixtures/testFixture';

test('Login test', async ({ loginPage, dashboardPage, commonPage }) => {
  await loginPage.login('Admin', 'admin123');
  const isVisible = await dashboardPage.verifyDashboardIsDisplayed();
  expect(isVisible).toBe(true);
});
```

**Benefits**:
- No manual instantiation
- Automatic lifecycle management
- Cleaner test code
- Less duplication

---

## 📊 Logger Utility

Centralized logging with 6 levels:

```typescript
Logger.step('User logged in');           // Step in test flow
Logger.success('Test passed');           // Success message
Logger.error('Test failed', error);      // Error with stack
Logger.info('Additional information');   // General info
Logger.warn('Warning message');          // Warning level
Logger.debug('Debug info', data);        // Debug data
```

---

## 🌐 Test Environment

**Target Application**: OrangeHRM Demo
- **URL**: https://opensource-demo.orangehrmlive.com/web/index.php
- **Test Credentials**: 
  - Username: `Admin`
  - Password: `admin123`

**Browsers**: Chromium, Firefox, WebKit
**Mobile**: Pixel 5, iPhone 12
**Viewport**: 1280x720 (desktop), responsive (mobile)

---

## ⚙️ Configuration Details

### Playwright Config (`playwright.config.ts`)
```typescript
{
  baseURL: 'https://opensource-demo.orangehrmlive.com/web/index.php',
  timeout: 30000,                    // 30 seconds
  expect.timeout: 5000,              // 5 seconds
  screenshot: 'only-on-failure',     // Screenshots on fail
  video: 'retain-on-failure',        // Videos on fail
  trace: 'on-first-retry'            // Traces on retry
}
```

---

## 🧪 Writing New Tests

### 1. Use the Custom Fixture
```typescript
import { test, expect } from '../fixtures/testFixture';
import { Logger } from '../utils/logger';

test('My test', async ({ loginPage, dashboardPage, commonPage }) => {
  // Page objects already provided
});
```

### 2. Structure with Steps
```typescript
test('TC999: My test case', async ({ loginPage }) => {
  await test.step('Step 1: Navigate to login', async () => {
    await loginPage.navigateToLoginPage();
    Logger.step('Navigated to login page');
  });
  
  await test.step('Step 2: Perform action', async () => {
    await loginPage.login('Admin', 'admin123');
    Logger.step('Logged in');
  });
});
```

### 3. Use Page Objects
```typescript
await loginPage.enterUsername('Admin');
await loginPage.enterPassword('admin123');
await loginPage.clickLoginButton();
```

---

## 📈 Test Reports

After running tests, view the comprehensive HTML report:

```bash
npm run test:report
```

**Report Contains**:
- Test execution summary (pass/fail counts)
- Individual test results with duration
- Screenshots on failures
- Videos of failed tests
- Full stack traces
- Test execution timeline

**Report Location**: `playwright-report/index.html`

---

## 🐛 Debugging Tests

### Method 1: UI Mode (Recommended)
```bash
npm run test:ui
```
- Visual test execution
- Step through tests
- Inspect elements
- View test results

### Method 2: Debug Mode
```bash
npx playwright test --debug
```
- Playwright Inspector window
- Step-through debugging
- DOM inspection
- Network monitoring

### Method 3: Headed Mode
```bash
npm run test:headed
```
- Run with visible browser
- Watch test execution
- Manual inspection

---

## ✅ Best Practices

1. **Always use Page Objects**: Don't interact with page directly in tests
2. **Consistent Logging**: Use Logger utility for all output
3. **Explicit Waits**: Use `waitForLoadingToComplete()` for dynamic content
4. **Test Independence**: Each test should run independently
5. **Clear Steps**: Use `test.step()` for logical test segments
6. **Meaningful Names**: Use descriptive test and method names
7. **Error Handling**: Provide clear error messages and assertions

---

## 🚨 Common Issues & Solutions

| Issue | Solution |
|-------|----------|
| Playwright not found | Run: `npm install` |
| Browsers not installed | Run: `npx playwright install` |
| Test timeout | Increase timeout in `playwright.config.ts` |
| Selector not found | Use debug mode: `npx playwright test --debug` |
| Network errors | Check internet; verify demo site is accessible |
| Flaky tests | Add explicit waits; increase timeouts |

---

## 📚 Documentation Files

1. **README.md** - Complete project overview and architecture
2. **TEST_EXECUTION_GUIDE.md** - Detailed execution commands and scenarios
3. **TEST_COVERAGE_SUMMARY.md** - Test case matrix and statistics
4. **GETTING_STARTED.md** - This file

---

## 🎓 Next Steps

1. ✅ Install dependencies: `npm install`
2. ✅ Install browsers: `npx playwright install`
3. ✅ Run tests: `npm test`
4. ✅ View report: `npm run test:report`
5. ✅ Write new tests using the pattern provided
6. ✅ Integrate into CI/CD pipeline
7. ✅ Customize for your environment

---

## 💡 Tips & Tricks

### Run Tests Faster
```bash
# Use only Chromium
npx playwright test --project=chromium

# Run in parallel with 4 workers
npx playwright test --workers=4

# Skip headed mode
npx playwright test
```

### Debug Single Test
```bash
npx playwright test -g "TC001" --debug
```

### View Specific Report
```bash
# View only failed tests
npx playwright test tests/orangeHRM-login.spec.ts --reporter=list
```

### Integration with CI/CD
```bash
# Run tests in serial for CI
npx playwright test --workers=1 --reporter=junit
```

---

## 📞 Support & Resources

- **Playwright Docs**: https://playwright.dev
- **OrangeHRM Demo**: https://opensource-demo.orangehrmlive.com/
- **Page Object Model**: https://playwright.dev/docs/pom
- **Best Practices**: https://playwright.dev/docs/best-practices

---

## 📝 Project Statistics

| Metric | Count |
|--------|-------|
| **Total Test Cases** | 39 |
| **Login Tests** | 10 |
| **Dashboard Tests** | 12 |
| **Employee Tests** | 12 |
| **E2E Tests** | 5 |
| **Page Objects** | 4 |
| **Test Methods** | 41 |
| **Browsers** | 5 |
| **Languages** | TypeScript |

---

## ✨ Features

- ✅ 39 comprehensive test cases
- ✅ Page Object Model pattern
- ✅ Dependency injection fixtures
- ✅ Centralized logging
- ✅ Cross-browser testing (Chrome, Firefox, Safari)
- ✅ Mobile viewport testing
- ✅ HTML reporting
- ✅ Screenshot/video on failure
- ✅ Comprehensive documentation
- ✅ CI/CD ready

---

**Last Updated**: December 2025
**Framework**: Playwright v1.40.1
**Language**: TypeScript
**Node Version**: >=14

Happy Testing! 🎉
