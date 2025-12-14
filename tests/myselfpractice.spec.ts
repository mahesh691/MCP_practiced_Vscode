import { test, expect, Page } from '@playwright/test';
import path from 'path';

test.describe('Test Automation Practice Site', () => {
  
  test.beforeEach(async ({ page }) => {
    await page.goto('https://testautomationpractice.blogspot.com/');
  });

  // test('Handle Webtable', async ({ page }) => {
  //   const element = page.locator('table[name="BookTable"]');
  //   await element.scrollIntoViewIfNeeded();
  //   await page.waitForTimeout(2000); // Wait for 2 seconds to ensure table is loaded
  //   const tableRows = page.locator('table[name="BookTable"] tbody tr');
  //   const rowCount = await tableRows.count();
  //   console.log(`Number of rows: ${rowCount}`);

  //   for (let i = 0; i < rowCount; i++) {
  //     const rowText = await tableRows.nth(i).textContent();
  //     console.log(rowText?.trim());
  //   }

  //   // Example: Check author of "Learn Selenium"
  //   const author = await page.locator('table[name="BookTable"] >> text=Learn Selenium >> xpath=../td[2]').textContent();
  //   console.log(`Author of Learn Selenium: ${author}`);
  // });

  // need to check this 
  // test('Handle Date Picker', async ({ page }) => {
  //   // Navigate to JQuery Date Picker example
  //   await page.locator("input[id='datepicker']").click();
  //   await page.frameLocator('#frame-one1434677811').locator('#datepicker').click();

  //   // Pick a date
  //   await page.frameLocator('#frame-one1434677811').locator('.ui-state-default:has-text("15")').click();
  //   const selectedDate = await page.frameLocator('#frame-one1434677811').locator('#datepicker').inputValue();
  //   console.log(`Selected Date: ${selectedDate}`);
  // });

  // test('Handle Frames', async ({ page }) => {
  //   const frame = page.frame({ name: 'frame-one1434677811' });
  //   if (frame) {
  //     const header = await frame.locator('h1').textContent();
  //     console.log(`Frame Header: ${header?.trim()}`);
  //   }
  // });

  // test('Action Chains (Mouse Hover)', async ({ page }) => {
  //   const hoverButton = page.locator('button[onclick="myFunction()"]');
  //   await hoverButton.hover();
  //   console.log('Hovered over button');
  //   await page.waitForTimeout(2000); // Wait to observe hover effect
  // });

  // test('File Upload', async ({ page }) => {
  //   const filePath = path.resolve(__dirname, '../sample_upload.txt');
  //   const hoverButton = page.locator("input[id='singleFileInput']");
  //   await hoverButton.hover();
  //   await page.setInputFiles("input[id='singleFileInput']", filePath);
  //   console.log('File uploaded');
  //   await page.waitForTimeout(2000); // Wait to observe upload effect
  // });

  //Need to check this
  // test('File Download', async ({ page, context }) => {
  //   page.on('download', async download => {
  //     const path = await download.path();
  //     console.log(`Downloaded file path: ${path}`);
  //   });

  //   await page.locator("//a[text()='Download Files']").click();
  //   await page.waitForTimeout(2000); // Wait to observe download effect
  // });

});
