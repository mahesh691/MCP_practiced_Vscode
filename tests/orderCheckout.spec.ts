import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';
import { CartPage } from '../pages/CartPage';
import { CheckoutPage } from '../pages/CheckoutPage';
import { OrderConfirmationPage } from '../pages/OrderConfirmationPage';

test.describe('Order Checkout Flow', () => {
  test('should complete the order successfully',{ tag: '@checkOutFlow' }, async ({ page }) => {
    const loginPage = new LoginPage(page);
    const inventoryPage = new InventoryPage(page);
    const cartPage = new CartPage(page);
    const checkoutPage = new CheckoutPage(page);
    const orderConfirmationPage = new OrderConfirmationPage(page);

    // Step 1: Login
    await loginPage.navigate();
    await loginPage.login(process.env.SAUCE_USERNAME!,process.env.SAUCE_PASSWORD!);
    // await loginPage.login('standard_user', 'secret_sauce');

    // Step 2: Add items to cart
    await inventoryPage.addItemToCart('Sauce Labs Backpack');
    await inventoryPage.addItemToCart('Sauce Labs Bike Light');

    // Step 3: Open cart and proceed to checkout
    await inventoryPage.navigateToCart();
    await cartPage.proceedToCheckout();

    // Step 4: Fill customer info and complete order
    await checkoutPage.fillCustomerInfo('John', 'Doe', '12345');
    await checkoutPage.completeCheckout();

    // Step 5: Assert order confirmation
    const isOrderComplete = await orderConfirmationPage.isOrderComplete();
    expect(isOrderComplete).toBeTruthy();
  });
});
