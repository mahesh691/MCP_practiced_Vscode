import { test, expect } from '@playwright/test';

test.only('fifth test case', async ({ page }) => {

    let url = 'https://testautomationpractice.blogspot.com/';
    await page.goto(process.env.DEVURL || url);
    const title = await page.title();
    expect(title).toBe('Automation Testing Practice');
    await page.locator("//input[@id='name']").fill('Admin');
    await page.locator("//input[@id='email']").fill('admin123@yopmail.com');
    await page.locator("//input[@id='phone']").fill("9876543210");
    // await page.locator("//input[@id='male']").click();
    await page.waitForTimeout(5000);

    //input[@id='male']
    //input[@id='female']
    const gender = (process.env.GENDER || 'male').toLowerCase();
    console.log("Gender is " + gender);
    let genderOption = page.locator("//input[@id='" + gender + "']")
    await genderOption.click();
    console.log(await expect(genderOption).toBeChecked());
    console.log(await expect(genderOption).toHaveAttribute('id', gender));
    console.log(await expect(genderOption).not.toBeDisabled());
    console.log(await expect(genderOption).toBeVisible());
    await page.waitForTimeout(2000);


    //select[@id='country']/option
    const countryOptions = page.locator("//select[@id='country']/option").all();
    console.log("Total country options " + (await countryOptions).length);
    for (let country of await countryOptions) {
        let countryName = await country.textContent();
        console.log("Country name is " + countryName);
        if (countryName?.trim() === 'India') {
            await page.selectOption("//select[@id='country']", { label: countryName!.trim() });
            break;
        }
    }
    await page.waitForTimeout(2000);
    // await page.locator(`//input[@id='${process.env.DAYS?.toLowerCase() || 'sunday'}']`).click();
    // await page.waitForTimeout(2000);

    //label[text()='Days:']/..//input
    const daysToSelect = process.env.DAYS || 'SUNDAY'.toLowerCase();
    let days = await page.locator("//label[text()='Days:']/..//input");
    for (let i = 0; i < await days.count(); i++) {
        let day = await days.nth(i);
        let dayValue = await day.getAttribute('id');
        console.log(dayValue);

        console.log("expected day " + daysToSelect);
        if (dayValue == daysToSelect) {
            await day.click();
            break;
        }
    }
    await page.waitForTimeout(5000);

    //links
    // (//div[@class='widget-content']/ul)[1]
    //     (//div[@class='widget-content']/ul)[1]/li/a

    const pagesLinks = await page.locator("(//div[@class='widget-content']/ul)[1]");
    const links = pagesLinks.locator('li a').all();
    console.log("Total links " + (await links).length);
    for (let link of await links) {
        let linkName = await link.textContent();
        console.log("Link name is " + linkName);
    }



});