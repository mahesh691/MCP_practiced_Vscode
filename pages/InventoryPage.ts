import { Page } from '@playwright/test';

export class InventoryPage {
  constructor(private page: Page) {}

  async addItemToCart(itemName: string) {
    const itemSelector = `//div[text()='${itemName}']/ancestor::div[@class='inventory_item']//button[contains(@data-test, 'add-to-cart')]`;
    await this.page.click(itemSelector);
  }

  async navigateToCart() {
    await this.page.click('.shopping_cart_link');
  }
}
