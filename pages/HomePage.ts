import { Page } from '@playwright/test';

export class HomePage {
  private page: Page;
  private searchInput = '#search_query_top'; // Locator for the search input field
  private searchButton = 'button[name="submit_search"]'; // Locator for the search button

  constructor(page: Page) {
    this.page = page;
  }

  async navigateToHomePage() {
    await this.page.goto('http://www.automationpractice.pl/index.php');
  }

  async searchForItem(item: string) {
    await this.page.fill(this.searchInput, item);
    await this.page.click(this.searchButton);
  }
}
