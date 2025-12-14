import { test, expect } from '@playwright/test';
import { PracticeFormPage } from '../pages/PracticeFormPage';

test.describe('DemoQA Practice Form Tests', () => {
  let practiceForm: PracticeFormPage;

  test.beforeEach(async ({ page }) => {
    practiceForm = new PracticeFormPage(page);
    await practiceForm.navigateToPracticeForm();
  });

  test('Fill and submit the entire practice form with all fields', async ({ page }) => {
    // Test data
    const firstName = 'John';
    const lastName = 'Doe';
    const email = 'john.doe@example.com';
    const gender = 'Male';
    const mobile = '9876543210';
    const hobbies = ['Sports', 'Reading'];

    await test.step('Fill in first name', async () => {
      await practiceForm.fillFirstName(firstName);
      expect(page.locator('#firstName')).toHaveValue(firstName);
    });

    await test.step('Fill in last name', async () => {
      await practiceForm.fillLastName(lastName);
      expect(page.locator('#lastName')).toHaveValue(lastName);
    });

    await test.step('Fill in email', async () => {
      await practiceForm.fillEmail(email);
      expect(page.locator('#userEmail')).toHaveValue(email);
    });

    await test.step('Select gender', async () => {
      await practiceForm.selectGender(gender as any);
      await expect(page.locator('#gender-radio-1')).toBeChecked();
    });

    await test.step('Fill in mobile number', async () => {
      await practiceForm.fillMobileNumber(mobile);
      expect(page.locator('#userNumber')).toHaveValue(mobile);
    });

    await test.step('Select hobbies', async () => {
      await practiceForm.selectHobbies(hobbies);
      await expect(page.locator('#hobbies-checkbox-1')).toBeChecked(); // Sports
      await expect(page.locator('#hobbies-checkbox-2')).toBeChecked(); // Reading
    });

    await test.step('Submit the form', async () => {
      await practiceForm.submitForm();
      await expect(page.locator('#example-modal-sizes-title-lg')).toBeVisible();
    });

    await test.step('Verify success popup shows submitted name', async () => {
      const isModalVisible = await practiceForm.isSuccessModalVisible();
      expect(isModalVisible).toBe(true);

      // Verify the submitted data in the modal
      const modalText = await page.textContent('.modal-body');
      expect(modalText).toContain(firstName);
      expect(modalText).toContain(lastName);
      expect(modalText).toContain(email);
      expect(modalText).toContain(mobile);
    });

    await test.step('Close success modal', async () => {
      await practiceForm.closeSuccessModal();
    });
  });

  test('Fill and submit form with Female gender and Music hobby', async ({ page }) => {
    // Test data
    const firstName = 'Jane';
    const lastName = 'Smith';
    const email = 'jane.smith@example.com';
    const gender = 'Female';
    const mobile = '8765432109';
    const hobbies = ['Music'];

    await test.step('Fill all form fields', async () => {
      await practiceForm.fillFirstName(firstName);
      await practiceForm.fillLastName(lastName);
      await practiceForm.fillEmail(email);
      await practiceForm.selectGender(gender as any);
      await practiceForm.fillMobileNumber(mobile);
      await practiceForm.selectHobbies(hobbies);
    });

    await test.step('Submit and verify', async () => {
      await practiceForm.submitForm();
      await expect(page.locator('#example-modal-sizes-title-lg')).toBeVisible();

      const modalText = await page.textContent('.modal-body');
      expect(modalText).toContain(firstName);
      expect(modalText).toContain(lastName);
    });
  });
});
