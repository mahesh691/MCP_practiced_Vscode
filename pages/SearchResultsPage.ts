import { Page, expect } from '@playwright/test';

export class SearchResultsPage {
    private page: Page;
    private productList = '.product_list'; // Locator for the product list container
    private productNames = '.product_list .product-name'; // Locator for product names

    constructor(page: Page) {
        this.page = page;
    }

    async verifyItemInResults(item: string) {
        await this.page.waitForSelector(this.productList); // Ensure the product list is loaded
        const items = (await this.page.locator(this.productNames).allTextContents()).map(item => item.trim());

        // Log expected and actual values
        console.log(`Expected: ${item}`);
        console.log(`Actual: ${items.join(', ')}`);

        if (!items.includes(item)) {
            throw new Error(`Expected item "${item}" to be in the search results, but it was not found.`);
        }

        expect.soft(items).toContain(item);
    }
}
