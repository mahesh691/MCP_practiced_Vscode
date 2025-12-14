import {test   , expect} from '@playwright/test';

// test('first test case', async ({browser}) => {
//     const context = await browser.newContext(); // context

//     const page = await context.newPage();// page
//     let url = 'https://opensource-demo.orangehrmlive.com/web/index.php/auth/login';
//   await page.goto(url);
//   const title = await page.title();
//   expect(title).toBe('Example Domain');
// });
//async means it will return a promise, await means wait for the promise to resolve, browser is a fixture provided by playwright,   

// test('second test case', async ({page}) => {
//     let url = 'https://opensource-demo.orangehrmlive.com/web/index.php/auth/login';
//   await page.goto(url);
//   const title = await page.title();
//   expect(title).toBe('OrangeHRM');
// });

// test('third test case', async ({page}) => {
//     let url = 'https://opensource-demo.orangehrmlive.com/web/index.php/auth/login';
//     await page.goto(url);
//     await page.locator('input[name="username"]').fill('Admin');
//     await page.locator('input[name="password"]').fill('admin123');
//     await page.locator('button[type="submit"]').click();
//     await expect(page).toHaveURL('https://opensource-demo.orangehrmlive.com/web/index.php/dashboard/index');
// });

// https://testautomationpractice.blogspot.com/

test.only('fourth test case', async ({page}) => {
    let url = 'https://testautomationpractice.blogspot.com/';
    await page.goto(url);
    const title = await page.title();
    expect(title).toBe('Automation Testing Practice');
    await page.locator("//input[@id='name']").fill('Admin');
    await page.locator("//input[@id='email']").fill('admin123@yopmail.com');
    await page.locator("//input[@id='phone']").fill("9876543210");
    await page.locator("//input[@id='male']").click();
    await page.waitForTimeout(5000);
});

