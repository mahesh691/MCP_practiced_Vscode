import { test } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { SearchResultsPage } from '../pages/SearchResultsPage';

test('Search and verify item', async ({ page }) => {
  const homePage = new HomePage(page);
  const searchResultsPage = new SearchResultsPage(page);

  await homePage.navigateToHomePage();
  await homePage.searchForItem('T-shirts');
  await searchResultsPage.verifyItemInResults('Faded Short Sleeve T-shirts');
});
