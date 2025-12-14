import { test, expect } from '@playwright/test';

test('Search for T-shirts and verify Faded Short Sleeve T-shirts in results', async ({ page }) => {
  // Navigate to the automation practice site
  await page.goto('http://www.automationpractice.pl/index.php');
  
  // Wait for the search input to be visible
  await page.waitForSelector('#search_query_top');
  
  // Search for T-shirts
  await page.fill('#search_query_top', 'T-shirts');
  await page.click('button[name="submit_search"]');
  
  // Wait for search results to load
  await page.waitForLoadState('networkidle');
  await page.waitForSelector('.product_list');
  
  // Verify "Faded Short Sleeve T-shirts" is in the results
  await expect(page.locator('#center_column a:has-text("Faded Short Sleeve T-shirts")')).toBeVisible();
});
