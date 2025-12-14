// // 1. Auto Waiting, 
// // await page.click('text=Submit'); // waits automatically until "Submit" is ready
// // 2. Locators,
// // const submitButton = page.locator('text=Submit');



// // await expect(page).toHaveTitle('Dashboard');
// // await expect(page).toHaveURL(/dashboard/);
// // toHaveTitle(title) → checks the page title.
// // toHaveURL(urlOrRegex) → ensures the current URL matches.   await page.waitForTimeout(2000); // Wait to observe upload effect


// // const heading = page.locator('h1');
// // await expect(heading).toHaveText('Welcome');
// // await expect(heading).toBeVisible();

// // Assertion	Description
// // toBeVisible()	Element is displayed on the page
// // toBeHidden()	Element exists but not visible
// // toBeEnabled()	Element is clickable/enabled
// // toBeDisabled()	Element is disabled
// // toHaveText()	Matches exact or partial text
// // toContainText()	Checks substring inside text
// // toHaveValue()	Checks input value
// // toHaveAttribute()	Checks for an attribute
// // toHaveClass()	Checks element CSS class

// // await expect(page.locator('#login-button')).toBeEnabled();
// // await expect(page.locator('.error-msg')).toHaveText('Invalid credentials');

// // 3. Soft Assertions
// // await expect.soft(page.locator('h1')).toHaveText('Dashboard');
// // await expect(page.locator('#error')).not.toBeVisible();

// // await expect(page.locator('#status')).toHaveText('Done', { timeout: 10000 }); //   await page.waitForTimeout(2000); // Wait to observe upload effect


// // await page.screenshot({ path: 'screenshot.png' });
// // await page.screenshot({ fullPage: true });

//   await page.screenshot({ path: 'fullpage.png', fullPage: true });

//   await page.screenshot({ path: 'viewport.png' });

//   const logo = page.locator('img#logo');
// await logo.screenshot({ path: 'logo.png' });

// // playwright.config.js
// import { defineConfig } from '@playwright/test';

// export default defineConfig({
//   use: {
//     screenshot: 'only-on-failure',
//   },
// });
// Options:

// 'off' – disable screenshots

// 'on' – take screenshots for all tests

// 'only-on-failure' – take screenshots only when a test fails


// Playwright Parameterization
// import { test, expect } from '@playwright/test';

// const searchTerms = ['Selenium', 'Playwright', 'Cypress'];

// for (const term of searchTerms) {
//   test(`Search test for ${term}`, async ({ page }) => {
//     await page.goto('https://testautomationpractice.blogspot.com/');
//     await page.fill('#Wikipedia1_wikipedia-search-input', term);
//     await page.click('.wikipedia-search-button');
//     await expect(page.locator('.wikipedia-search-results')).toBeVisible();
//   });
// }

// test.describe('Wikipedia Search Tests', () => {
//   const searchTerms = ['Automation', 'Testing', 'JavaScript'];

//   for (const term of searchTerms) {
//     test(`should search Wikipedia for ${term}`, async ({ page }) => {
//       await page.goto('https://testautomationpractice.blogspot.com/');
//       await page.fill('#Wikipedia1_wikipedia-search-input', term);
//       await page.click('.wikipedia-search-button');
//       await expect(page.locator('.wikipedia-search-results')).toBeVisible();
//     });
//   }
// });

// test('Search with multiple terms using steps', async ({ page }) => {
//   const terms = ['QA', 'Selenium', 'Python'];

//   await page.goto('https://testautomationpractice.blogspot.com/');

//   for (const term of terms) {
//     await test.step(`Searching for ${term}`, async () => {
//       await page.fill('#Wikipedia1_wikipedia-search-input', term);
//       await page.click('.wikipedia-search-button');
//       await expect(page.locator('.wikipedia-search-results')).toBeVisible();
//     });
//   }
// });


// test.describe('Data-driven form test', () => {
//   test.each([
//     { name: 'John', email: 'john@example.com', phone: '1234567890' },
//     { name: 'Alice', email: 'alice@example.com', phone: '9876543210' },
//   ])('Fill the form with data for $name', async ({ page }, data) => {
//     await page.goto('https://testautomationpractice.blogspot.com/');

//     await page.fill('#name', data.name);
//     await page.fill('#email', data.email);
//     await page.fill('#phone', data.phone);

//     await expect(page.locator('#name')).toHaveValue(data.name);
//   });
// });


// data.json:
// [
//   { "name": "Mark", "email": "mark@gmail.com", "phone": "1112223333" },
//   { "name": "Sophia", "email": "sophia@gmail.com", "phone": "4445556666" }
// ]
// test.spec.js:
// import data from './data.json';

// for (const user of data) {
//   test(`Form test for ${user.name}`, async ({ page }) => {
//     await page.goto('https://testautomationpractice.blogspot.com/');

//     await page.fill('#name', user.name);
//     await page.fill('#email', user.email);
//     await page.fill('#phone', user.phone);

//     await expect(page.locator('#email')).toHaveValue(user.email);
//   });
// }

// test('Login with environment variables', async ({ page }) => {
//   const username = process.env.USER;
//   const password = process.env.PASSWORD;

//   await page.goto('https://testautomationpractice.blogspot.com/');
//   await page.fill('#username', username);
//   await page.fill('#password', password);
//   await page.click('#login');

//   await expect(page.locator('#success')).toBeVisible();
// });
