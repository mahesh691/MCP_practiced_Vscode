# Axe Accessibility Tests for TodoMVC

Comprehensive Playwright accessibility testing using `@axe-core/playwright` for the TodoMVC demo site.

## Overview

This test suite includes:
- **Global Axe Scan**: Complete page accessibility audit
- **WCAG 2.1 AA Rules**: Specific WCAG 2.1 Level AA compliance checks
- **WCAG 2.0 A Rules**: WCAG 2.0 Level A compliance checks
- **Region-Specific Scans**: Testing individual page regions
- **Dynamic Content Testing**: Accessibility after DOM updates
- **Comprehensive Reports**: JSON and text-based reports
- **Known False Positives Handling**: Filter ignored violations
- **Zero Violations Assertions**: Strict accessibility compliance

## Test Cases

### 1. Global Axe Scan
- Runs a full Axe accessibility audit on the TodoMVC homepage
- Exports results to JSON
- Asserts zero violations

### 2. WCAG 2.1 AA Rules Scan
- Scans the page against WCAG 2.1 Level AA rules
- Focuses on accessibility standards compliance
- Exports results to JSON

### 3. WCAG 2.0 A Rules Scan
- Scans the page against WCAG 2.0 Level A rules
- Tests foundational accessibility requirements
- Exports results to JSON

### 4. Known False Positives Handling
- Demonstrates filtering of false positives
- Configurable rule disabling
- Element-specific violation filtering

### 5. Region-Specific Scan
- Tests accessibility of specific page regions (e.g., todo input field)
- Isolates scanning to improve focus
- Exports region-specific results to JSON

### 6. Dynamic Content Testing
- Tests accessibility after adding a new todo
- Verifies dynamic DOM updates maintain accessibility
- Exports dynamic content results to JSON

### 7. Comprehensive Report Generation
- Generates detailed accessibility summary
- Lists violations by impact level (critical, serious, moderate, minor)
- Creates detailed report with violation details

### 8. Accessibility Tree Validation
- Validates key accessibility passes
- Verifies heading structure and language attributes
- Exports accessibility tree to JSON

## Installation

```bash
# Install dependencies
npm install @playwright/test @axe-core/playwright axe-core axe-playwright typescript

# Or use the provided package.json
npm install
```

## Running Tests

### Run All Tests
```bash
npx playwright test axe2/axe-accessibility.spec.ts
```

### Run in Debug Mode
```bash
npx playwright test axe2/axe-accessibility.spec.ts --debug
```

### Run in UI Mode (Interactive)
```bash
npx playwright test axe2/axe-accessibility.spec.ts --ui
```

### Run Specific Test
```bash
npx playwright test axe2/axe-accessibility.spec.ts -g "Global Axe scan"
```

### View HTML Report
```bash
npx playwright show-report
```

## Output Files

All Axe results are exported to the `axe-results/` directory:

- `global-scan-*.json` - Full page accessibility audit results
- `wcag2aa-rules-*.json` - WCAG 2.1 AA compliance results
- `wcag2a-rules-*.json` - WCAG 2.0 A compliance results
- `with-ignored-false-positives-*.json` - Results with filtered false positives
- `region-scan-todo-input-*.json` - Region-specific scan results
- `dynamic-content-add-todo-*.json` - Dynamic content test results
- `comprehensive-report-*.json` - Comprehensive audit report
- `summary-*.json` - Summary statistics
- `*-report-*.txt` - Detailed text reports

## Configuration

### Customizing Axe Rules

Edit the test file to customize which rules are scanned:

```typescript
const violations = await page.evaluate(() => {
  return (window as any).axe.run({
    runOnly: {
      type: 'tag',
      values: ['wcag2aa', 'wcag21aa'] // Change rules here
    }
  });
});
```

### Ignoring False Positives

Configure rules to ignore in the "Known False Positives" test:

```typescript
rules: {
  'color-contrast': { enabled: true },
  'image-alt': { enabled: true },
  'label': { enabled: true },
  'aria-required-attr': { enabled: true }
}
```

## Utility Functions

The `axe-utils.ts` file provides helper functions:

- `exportAxeResultsToJSON()` - Export results to JSON
- `generateAxeSummary()` - Generate summary statistics
- `filterViolationsByImpact()` - Filter by impact level
- `filterViolationsById()` - Filter by rule ID
- `ignoreViolations()` - Ignore specific violations
- `generateDetailedReport()` - Generate detailed text report
- `exportDetailedReport()` - Export text report

## Usage Example

```typescript
import { exportAxeResultsToJSON, generateAxeSummary } from './axe-utils';

// In your test...
const results = await page.evaluate(() => {
  return (window as any).axe.run();
});

// Export results
exportAxeResultsToJSON(results, 'my-test');

// Generate summary
const summary = generateAxeSummary(results);
console.log(`Violations: ${summary.violations}`);
console.log(`Critical: ${summary.criticalViolations}`);
```

## WCAG 2.1 Guidelines Covered

This test suite verifies compliance with:

- **1.1.1 Non-text Content**: Alt text for images and icons
- **1.4.3 Contrast (Minimum)**: Text and UI component contrast
- **1.4.11 Non-text Contrast**: Visual components contrast
- **2.1.1 Keyboard**: All functionality operable by keyboard
- **2.1.2 No Keyboard Trap**: Keyboard focus not trapped
- **2.4.3 Focus Order**: Focus order is logical
- **2.4.7 Focus Visible**: Keyboard focus indicator visible
- **3.2.1 On Focus**: No unexpected context changes
- **3.2.2 On Input**: No unexpected context changes
- **3.3.2 Labels or Instructions**: Form inputs labeled
- **4.1.2 Name, Role, Value**: ARIA attributes accurate
- **4.1.3 Status Messages**: Announcements for dynamic content

## Troubleshooting

### Tests Fail: "Axe is not defined"
- Ensure `@axe-core/playwright` and `axe-core` are installed
- Verify the page has loaded before injecting Axe

### JSON Files Not Generated
- Check that the `axe-results/` directory exists
- Verify write permissions in the project directory

### Violations Found
- Review the JSON export files for detailed violation information
- Check the HTML report for visual context
- Use `--debug` mode to investigate specific violations

## Additional Resources

- [Axe Documentation](https://github.com/dequelabs/axe-core)
- [Axe Playwright Plugin](https://github.com/dequelabs/axe-core-npm/tree/develop/packages/playwright)
- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [Playwright Documentation](https://playwright.dev/)

## Notes

- Tests run in **headless: false** mode to allow visual inspection
- All results are timestamped and stored in `axe-results/` directory
- Modify the test suite to add custom rules or ignore specific violations
- Use the utility functions to create custom accessibility workflows
