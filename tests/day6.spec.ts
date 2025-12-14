import { test, expect, chromium } from '@playwright/test';

// test('Basic Auth using context credentials', async () => {
//   const browser = await chromium.launch();
//   const context = await browser.newContext({
//     httpCredentials: {
//       username: 'admin',
//       password: 'admin',
//     },
//   });
//   const page = await context.newPage();
//   await page.goto('https://the-internet.herokuapp.com/basic_auth');

//   await expect(page.locator('p')).toHaveText(/Congratulations/);
//   await browser.close();
// });


// test.describe('JavaScript Alert Handling', () => {

//     test('Handle simple alert', async ({ page }) => {
//         await page.goto('https://testautomationpractice.blogspot.com/');

//         // Wait for the alert and accept it
//         page.once('dialog', async dialog => {
//             console.log('Alert message:', dialog.message());
//             await dialog.accept(); // clicks OK
//         });

//         await page.click("button[onclick='myFunctionAlert()']");
//     });

//     test('Handle confirmation alert (OK)', async ({ page }) => {
//         await page.goto('https://testautomationpractice.blogspot.com/');

//         page.once('dialog', async dialog => {
//             console.log('Confirm message:', dialog.message());
//             await dialog.accept(); // clicks OK
//         });

//         await page.click("button[onclick='myFunctionConfirm()']");
//         await expect(page.locator('#demo')).toHaveText('You pressed OK!');
//     });

//     test('Handle confirmation alert (Cancel)', async ({ page }) => {
//         await page.goto('https://testautomationpractice.blogspot.com/');

//         page.once('dialog', async dialog => {
//             console.log('Confirm message:', dialog.message());
//             await dialog.dismiss(); // clicks Cancel
//         });

//         await page.click("button[onclick='myFunctionConfirm()']");
//         await expect(page.locator('#demo')).toHaveText('You pressed Cancel!');
//     });

//     test('Handle prompt alert', async ({ page }) => {
//         await page.goto('https://testautomationpractice.blogspot.com/');
//         let promptText = 'Playwright User';
//         page.once('dialog', async dialog => {
//             console.log('Prompt message:', dialog.message());
//             await dialog.accept(promptText); // send text + OK
//         });

//         await page.click("button[onclick='myFunctionPrompt()']");
//         await expect(page.locator('#demo')).toHaveText(`Hello ${promptText}! How are you today?`);
//     });

// });

test.describe('Popup Window Handling', () => {

  test('Handle new tab', async ({ page, context }) => {
    await page.goto('https://testautomationpractice.blogspot.com/');

    // Wait for a new page (popup) to open after clicking
    const [newPage] = await Promise.all([
      context.waitForEvent('page'),               // wait for the popup
      page.click("button[onclick='myFunction()']") // or use selector for the link/button that opens it
    ]);

    // Wait until the new page loads
    await newPage.waitForLoadState();

    console.log('New tab title:', await newPage.title());
    console.log('New tab URL:', newPage.url());

    // Example: assert that new tab contains some text or element
    await expect(newPage.locator('body')).toContainText('Software Testing & Automation Tutorials');

    // Close the popup
    await newPage.close();

    // Back to the main page
    await expect(page).toHaveTitle("Automation Testing Practice");
  });

  test('Handle new window', async ({ page, context }) => {
    await page.goto('https://testautomationpractice.blogspot.com/');

    // Wait for a new page (popup) to open after clicking
    const [newPage] = await Promise.all([
      context.waitForEvent('page'),               // wait for the popup
      page.click("button[onclick='return popup()']") // or use selector for the link/button that opens it
    ]);

    // Wait until the new page loads
    await newPage.waitForLoadState();

    console.log('New tab title:', await newPage.title());
    console.log('New tab URL:', newPage.url());

    // Example: assert that new tab contains some text or element
    await expect(newPage.locator('body')).toContainText('Selenium automates browsers. That\'s it!');

    // Close the popup
    await newPage.close();

    // Back to the main page
    await expect(page).toHaveTitle("Automation Testing Practice");
  });

});