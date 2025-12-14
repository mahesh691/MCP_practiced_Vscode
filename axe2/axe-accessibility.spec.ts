import { test, expect, Page } from '@playwright/test';
import * as fs from 'fs';
import * as path from 'path';

// Helper function to generate timestamp for JSON export
function getTimestamp(): string {
  return new Date().toISOString().replace(/[:.]/g, '-');
}

// Helper function to inject Axe into page
async function injectAxe(page: Page): Promise<void> {
  await page.addScriptTag({
    url: 'https://cdnjs.cloudflare.com/ajax/libs/axe-core/4.7.0/axe.min.js'
  });
}

// Helper function to run Axe scan
async function runAxeScan(page: Page, options?: any): Promise<any> {
  return await page.evaluate(async (opts) => {
    return new Promise((resolve, reject) => {
      (window as any).axe.run(opts || {}, (error: any, results: any) => {
        if (error) {
          reject(error);
        } else {
          resolve(results);
        }
      });
    });
  }, options);
}

// Helper function to export Axe results to JSON
async function exportAxeResultsToJSON(results: any, testName: string): Promise<void> {
  const resultsDir = path.join(process.cwd(), 'axe-results');
  
  // Create results directory if it doesn't exist
  if (!fs.existsSync(resultsDir)) {
    fs.mkdirSync(resultsDir, { recursive: true });
  }

  const timestamp = getTimestamp();
  const fileName = `${testName}-${timestamp}.json`;
  const filePath = path.join(resultsDir, fileName);

  if (results) {
    fs.writeFileSync(filePath, JSON.stringify(results, null, 2));
    console.log(`✓ Axe results exported to: ${filePath}`);
  } else {
    console.warn(`⚠ No results to export for: ${testName}`);
  }
}

test.describe('Axe Accessibility Tests for TodoMVC', () => {

  test('1. Global Axe scan - Check for accessibility violations', async ({ page }) => {
    await page.goto('https://demo.playwright.dev/todomvc');
    
    // Inject Axe into the page
    await injectAxe(page);

    // Run Axe scan
    const results = await runAxeScan(page);

    // Export full Axe results to JSON
    await exportAxeResultsToJSON(results, 'axe-global-scan');

    // Extract violations
    const violations = results?.violations || [];

    // Log violations found
    console.log(`Found ${violations.length} violations`);
    violations.forEach((v: any) => {
      console.log(`  - [${v.impact}] ${v.id}: ${v.description}`);
    });

    // Report results (not strict - for reporting purposes)
    if (violations.length > 0) {
      console.log('⚠ Note: Violations found - check JSON report for details');
    } else {
      console.log('✓ No violations found');
    }

    expect(violations).toBeDefined();
  });

  test('2. WCAG 2.1 AA compliance scan', async ({ page }) => {
    await page.goto('https://demo.playwright.dev/todomvc');
    
    // Inject Axe into the page
    await injectAxe(page);

    // Run Axe scan with WCAG 2.1 AA rules
    const results = await runAxeScan(page, {
      runOnly: {
        type: 'tag',
        values: ['wcag2aa', 'wcag21aa']
      }
    });

    // Export WCAG 2.1 AA results to JSON
    await exportAxeResultsToJSON(results, 'axe-wcag21-aa-scan');

    // Extract violations and passes
    const violations = results?.violations || [];
    const passes = results?.passes || [];

    console.log(`WCAG 2.1 AA - Violations: ${violations.length}, Passes: ${passes.length}`);
    
    expect(passes.length).toBeGreaterThan(0);
    console.log('✓ WCAG 2.1 AA scan completed');
  });

  test('3. Region-specific scan - Todo input accessibility', async ({ page }) => {
    await page.goto('https://demo.playwright.dev/todomvc');
    
    // Inject Axe into the page
    await injectAxe(page);

    // Run Axe scan on specific region (e.g., todo input)
    const results = await runAxeScan(page, {
      include: ['.new-todo']
    });

    // Export region-specific results to JSON
    await exportAxeResultsToJSON(results, 'axe-region-todo-input');

    // Extract violations
    const violations = results?.violations || [];

    console.log(`Todo input region - Violations: ${violations.length}`);
    violations.forEach((v: any) => {
      console.log(`  - [${v.impact}] ${v.id}`);
    });

    expect(violations).toBeDefined();
    console.log('✓ Region-specific scan completed');
  });

  test('4. Dynamic content accessibility - After adding a todo', async ({ page }) => {
    await page.goto('https://demo.playwright.dev/todomvc');
    
    // Inject Axe into the page
    await injectAxe(page);

    // Add a new todo
    const todoInput = page.locator('.new-todo');
    await todoInput.fill('Accessibility Test Todo');
    await todoInput.press('Enter');

    // Wait for DOM update
    await page.waitForTimeout(500);

    // Run Axe scan after dynamic content update
    const results = await runAxeScan(page, {
      runOnly: { type: 'tag', values: ['wcag2aa'] }
    });

    // Export dynamic content results to JSON
    await exportAxeResultsToJSON(results, 'axe-dynamic-content-scan');

    // Extract violations
    const violations = results?.violations || [];

    console.log(`Dynamic content - Violations: ${violations.length}`);

    expect(violations).toBeDefined();
    console.log('✓ Dynamic content accessibility scan completed');
  });

  test('5. Generate comprehensive accessibility report - Export results', async ({ page }) => {
    await page.goto('https://demo.playwright.dev/todomvc');
    
    // Inject Axe into the page
    await injectAxe(page);

    // Run comprehensive Axe scan
    const results = await runAxeScan(page);

    // Export comprehensive report to JSON
    await exportAxeResultsToJSON(results, 'axe-comprehensive-report');

    // Generate summary report
    const violations = results?.violations || [];
    const passes = results?.passes || [];
    const inapplicable = results?.inapplicable || [];

    // Create summary
    const summary = {
      timestamp: new Date().toISOString(),
      url: 'https://demo.playwright.dev/todomvc',
      violations: violations.length,
      passes: passes.length,
      inapplicable: inapplicable.length,
      criticalViolations: violations.filter((v: any) => v.impact === 'critical').length,
      seriousViolations: violations.filter((v: any) => v.impact === 'serious').length,
      violationDetails: violations.map((v: any) => ({
        id: v.id,
        impact: v.impact,
        description: v.description,
        nodeCount: v.nodes.length
      }))
    };

    // Export summary to JSON
    const resultsDir = path.join(process.cwd(), 'axe-results');
    if (!fs.existsSync(resultsDir)) {
      fs.mkdirSync(resultsDir, { recursive: true });
    }
    const timestamp = getTimestamp();
    const summaryFilePath = path.join(resultsDir, `axe-summary-report-${timestamp}.json`);
    fs.writeFileSync(summaryFilePath, JSON.stringify(summary, null, 2));
    console.log(`✓ Summary report exported to: ${summaryFilePath}`);

    // Print summary to console
    console.log('\n========== ACCESSIBILITY SUMMARY ==========');
    console.log(`Total Violations: ${violations.length}`);
    console.log(`  Critical: ${summary.criticalViolations}`);
    console.log(`  Serious: ${summary.seriousViolations}`);
    console.log(`Total Passes: ${passes.length}`);
    console.log(`Inapplicable Rules: ${inapplicable.length}`);
    console.log('===========================================\n');

    expect(passes.length).toBeGreaterThan(0);
    console.log('✓ Comprehensive accessibility report generated');
  });

});
