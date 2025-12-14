# Test Execution Guide

## Overview
This document provides detailed instructions for executing tests in the OrangeHRM Playwright test automation project.

## Prerequisites
- Node.js v14 or higher
- npm v6 or higher
- Playwright browsers installed (`npm install` installs them)

## Command Reference

### Basic Test Execution

#### Run All Tests
```bash
npm test
```
Runs all test files across all configured browsers (Chromium, Firefox, WebKit).

#### Run All Tests in Headed Mode
```bash
npm run test:headed
```
Runs tests with visible browser window. Useful for debugging and visual verification.

#### Run Tests in UI Mode
```bash
npm run test:ui
```
Launches Playwright Test UI (interactive mode). Allows:
- See test execution in real-time
- Step through tests
- Inspect elements
- View test results

#### Run Tests in Debug Mode
```bash
npm run test:debug
```
Launches Playwright Inspector for step-by-step debugging with full control.

### Targeted Test Execution

#### Run Login Tests Only
```bash
npm run test:login
```
Runs: `tests/orangeHRM-login.spec.ts` (10 test cases)

#### Run Dashboard Tests Only
```bash
npm run test:dashboard
```
Runs: `tests/orangeHRM-dashboard.spec.ts` (12 test cases)

#### Run Employee Tests Only
```bash
npm run test:employee
```
Runs: `tests/orangeHRM-employee.spec.ts` (12 test cases)

### Advanced Execution Options

#### Run Specific Browser
```bash
# Chromium only
npx playwright test --project=chromium

# Firefox only
npx playwright test --project=firefox

# WebKit only
npx playwright test --project=webkit
```

#### Run Mobile Browser Tests
```bash
# Mobile Chrome (Pixel 5)
npx playwright test --project="Mobile Chrome"

# Mobile Safari (iPhone 12)
npx playwright test --project="Mobile Safari"
```

#### Run Specific Test File
```bash
npx playwright test tests/orangeHRM-login.spec.ts
```

#### Run Tests Matching Pattern
```bash
# Run all tests with "login" in name
npx playwright test -g "login"

# Run tests matching specific TC number
npx playwright test -g "TC001"

# Run tests matching pattern
npx playwright test -g "TC[0-2]" # Runs TC001-TC200
```

#### Run Tests in Serial Mode
```bash
# Run tests one-by-one (not in parallel)
npx playwright test --workers=1
```

#### Run Tests with Specific Worker Count
```bash
# Use 4 parallel workers
npx playwright test --workers=4
```

#### Run Tests with Retries
```bash
# Retry failed tests 3 times
npx playwright test --retries=3
```

### Viewing Reports

#### View HTML Report
```bash
npm run test:report
```
Opens the Playwright HTML report in default browser showing:
- Test execution summary
- Pass/fail status
- Screenshots and videos
- Error details

#### View Report Location
Report is generated in: `playwright-report/index.html`

## Test Execution Scenarios

### Scenario 1: Quick Smoke Test
```bash
npm run test:headed --project=chromium
```
**Purpose**: Quick verification of core functionality in headed mode

### Scenario 2: Full Regression Suite
```bash
npm test
```
**Purpose**: Complete test coverage across all browsers and viewports

### Scenario 3: Debug Failed Test
```bash
npx playwright test -g "TC002" --debug
```
**Purpose**: Step through and debug a specific failing test

### Scenario 4: CI/CD Pipeline
```bash
npx playwright test --workers=1 --reporter=junit
```
**Purpose**: Run tests serially for CI/CD with JUnit XML report

### Scenario 5: Development - Watch Mode
```bash
npm run test:ui
```
**Purpose**: Interactive development with immediate feedback

## Test Output

### Console Output Format
```
 PASS  tests/orangeHRM-login.spec.ts (10 tests)
✓ TC001: Verify login page is displayed (3.2s)
✓ TC002: Successful login with valid credentials (5.1s)
✗ TC003: Login with invalid username (4.5s)
  Error: Expected "false" to be "true"
```

### Logger Output in Tests
Tests use custom Logger utility:
```
✓ [STEP] Navigated to login page
ℹ [INFO] Attempting login
✔ [SUCCESS] Login successful
✗ [ERROR] Element not found
⚠ [WARN] Timeout approaching
🔍 [DEBUG] Element state: visible
```

## Configuration

### Running Tests Against Different Environments

#### Default (Demo Site)
```bash
npm test
```
Uses: `https://opensource-demo.orangehrmlive.com/web/index.php`

#### Change Base URL
Edit `playwright.config.ts`:
```typescript
use: {
  baseURL: 'https://your-custom-url/web/index.php',
}
```

### Timeout Configuration

Adjust in `playwright.config.ts`:
```typescript
use: {
  actionTimeout: 10000,        // 10 seconds for each action
  expect: {
    timeout: 5000              // 5 seconds for assertions
  }
}
```

### Screenshots & Videos

Control in `playwright.config.ts`:
```typescript
use: {
  screenshot: 'only-on-failure',    // Screenshot on failure
  video: 'retain-on-failure',       // Video on failure
  trace: 'on-first-retry'           // Trace on retry
}
```

## Troubleshooting

### Issue: "Playwright browsers not found"
**Solution**:
```bash
npx playwright install
```

### Issue: "Test timeout"
**Solution**: 
- Increase timeout in `playwright.config.ts`
- Use `--timeout=60000` flag

### Issue: "Port already in use"
**Solution**: Kill existing processes or use different port

### Issue: "Selector not found"
**Solution**:
```bash
npx playwright test --debug
```
Use the Inspector to find correct selectors

### Issue: "Network errors connecting to demo site"
**Solution**:
- Check internet connection
- Verify demo site is accessible
- Check firewall settings

## Test Reports Location

### HTML Report
```
playwright-report/index.html
```

### Test Results with Videos/Screenshots
```
test-results/
├── [test-name-chromium]/
│   ├── error-context.md
│   ├── test-finished.json
│   ├── video.webm
│   └── screenshot.png
```

### JUnit XML Report (if configured)
```
test-results/junit.xml
```

## Performance Tips

1. **Run tests in parallel** (default):
   ```bash
   npm test
   ```

2. **Use fewer workers** for stability:
   ```bash
   npx playwright test --workers=2
   ```

3. **Run only chromium** for faster feedback:
   ```bash
   npx playwright test --project=chromium
   ```

4. **Skip headed mode** for CI/CD:
   ```bash
   npx playwright test
   ```

## CI/CD Integration

### GitHub Actions Example
```yaml
name: Tests
on: [push, pull_request]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
        with:
          node-version: 18
      - run: npm install
      - run: npx playwright install --with-deps
      - run: npm test
      - uses: actions/upload-artifact@v2
        if: failure()
        with:
          name: playwright-report
          path: playwright-report/
```

## Summary of Commands

| Command | Purpose |
|---------|---------|
| `npm test` | Run all tests |
| `npm run test:ui` | Interactive UI mode |
| `npm run test:debug` | Debug mode with inspector |
| `npm run test:headed` | Visible browser |
| `npm run test:login` | Login tests only |
| `npm run test:dashboard` | Dashboard tests only |
| `npm run test:employee` | Employee tests only |
| `npm run test:report` | View HTML report |

---

For more information, see [README.md](./README.md)
