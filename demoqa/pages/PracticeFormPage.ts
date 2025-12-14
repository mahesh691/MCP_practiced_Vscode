import { Page } from '@playwright/test';

export class PracticeFormPage {
  constructor(private page: Page) {}

  // Locators
  private firstNameInput = '#firstName';
  private lastNameInput = '#lastName';
  private emailInput = '#userEmail';
  private genderMaleRadio = '#gender-radio-1';
  private genderFemaleRadio = '#gender-radio-2';
  private genderOtherRadio = '#gender-radio-3';
  private mobileInput = '#userNumber';
  private sportsCheckbox = '#hobbies-checkbox-1';
  private readingCheckbox = '#hobbies-checkbox-2';
  private musicCheckbox = '#hobbies-checkbox-3';
  private submitButton = '#submit';
  private successModal = '#example-modal-sizes-title-lg';
  private successModalBody = '.modal-body';
  private closeButton = '#closeLargeModal';

  async navigateToPracticeForm(): Promise<void> {
    await this.page.goto('/forms');
    // Click on Practice Form option
    await this.page.click('text=Practice Form');
    await this.page.waitForLoadState('domcontentloaded');
  }

  async fillFirstName(firstName: string): Promise<void> {
    await this.page.fill(this.firstNameInput, firstName);
  }

  async fillLastName(lastName: string): Promise<void> {
    await this.page.fill(this.lastNameInput, lastName);
  }

  async fillEmail(email: string): Promise<void> {
    await this.page.fill(this.emailInput, email);
  }

  async selectGender(gender: 'Male' | 'Female' | 'Other'): Promise<void> {
    switch (gender) {
      case 'Male':
        await this.page.click('label[for="gender-radio-1"]');
        break;
      case 'Female':
        await this.page.click('label[for="gender-radio-2"]');
        break;
      case 'Other':
        await this.page.click('label[for="gender-radio-3"]');
        break;
    }
  }

  async fillMobileNumber(mobile: string): Promise<void> {
    await this.page.fill(this.mobileInput, mobile);
  }

  async selectHobbies(hobbies: string[]): Promise<void> {
    for (const hobby of hobbies) {
      switch (hobby.toLowerCase()) {
        case 'sports':
          await this.page.click('label[for="hobbies-checkbox-1"]');
          break;
        case 'reading':
          await this.page.click('label[for="hobbies-checkbox-2"]');
          break;
        case 'music':
          await this.page.click('label[for="hobbies-checkbox-3"]');
          break;
      }
    }
  }

  async submitForm(): Promise<void> {
    // Scroll to submit button to ensure it's visible
    await this.page.locator(this.submitButton).scrollIntoViewIfNeeded();
    await this.page.click(this.submitButton);
    // Wait for success modal to appear
    await this.page.waitForSelector(this.successModal);
  }

  async getSubmittedName(): Promise<string> {
    // Get the modal body text which contains the submitted information
    const modalText = await this.page.textContent(this.successModalBody);
    
    // Extract the name from the modal (format: "Name\tJohn Doe")
    const nameMatch = modalText?.match(/Name\s+([\w\s]+)/);
    return nameMatch ? nameMatch[1].trim() : '';
  }

  async closeSuccessModal(): Promise<void> {
    await this.page.click(this.closeButton);
  }

  async isSuccessModalVisible(): Promise<boolean> {
    return await this.page.locator(this.successModal).isVisible();
  }
}
