// pages/EditProfileDetailsPage.ts
import { Page, Locator, expect } from '@playwright/test';

export class EditProfileDetailsPage {
  readonly page: Page;

  // Admission Details Section
  readonly editAdmissionDetailsButton: Locator;
  // readonly desiredCommunityDropdown: Locator;
  readonly asapCheckbox: Locator;
  readonly chooseDateButton: Locator;
  readonly calendarGrid: Locator;  // ADD THIS LINE
  readonly admissionTypeDropdown: Locator;
  readonly respiteSwitch: Locator;
  readonly hospiceSwitch: Locator;
  readonly summaryNotesTextbox: Locator;

  //Room section
   readonly addRoomButton: Locator;
  readonly roomTypeToggle: Locator;
  readonly roomNumberDropdown: Locator;
  readonly roomStartDateButton: Locator;
  readonly roomEndDateButton: Locator;
  readonly addAdditionalRoomButton: Locator;
  readonly secondResidentToggle: Locator;
  readonly occupancyTypeDropdown: Locator;
  readonly editRoomButton: Locator;
  readonly noOptionFoundText: Locator;
  // readonly secondaryRoomEditBtn: Locator;

  // Responsible Person Section
  readonly editResponsiblePersonButton: Locator;
  readonly rpFirstNameInput: Locator;
  readonly rpLastNameInput: Locator;
  readonly specificRelationshipDropdown: Locator;
  readonly rpEmailInput: Locator;
  readonly rpAddressLine1Input: Locator;
  readonly addAnotherButton: Locator;

  // Diet Section
  readonly editDietButton: Locator;
  readonly dietTypeDropdown: Locator;
  readonly addDietButton: Locator;
  readonly allergyTextbox: Locator;
  readonly addAllergyButton: Locator;

  // Diagnosis Section
  readonly editDiagnosisButton: Locator;
  readonly diagnosisTextbox: Locator;
  readonly addDiagnosisButton: Locator;
  readonly behavioralHealthTextbox: Locator;
  readonly addBehavioralButton: Locator;

  // Insurance Section
  readonly addInsuranceButton: Locator;
  readonly insuranceTypeDropdown: Locator;
  readonly insuranceProviderInput: Locator;
  readonly memberIdInput: Locator;
  readonly groupNumberInput: Locator;

  // Hospitalization Section
  readonly editHospitalizationButton: Locator;
  readonly hospitalNameInput: Locator;
  readonly hospitalAddressInput: Locator;
  readonly hospitalContactInput: Locator;
  readonly hospitalFaxInput: Locator;

  // Immunization Section
  readonly addImmunizationButton: Locator;
  readonly immunizationNameDropdown: Locator;
  readonly routeDropdown: Locator;
  readonly administeredDateButton: Locator;
  readonly administeredByDropdown: Locator;
  readonly siteInput: Locator;
  readonly vaccineManufacturerDropdown: Locator;
  readonly lotNumberInput: Locator;

  // Physician Section
  readonly editPhysicianButton: Locator;
  readonly physicianFirstNameInput: Locator;
  readonly physicianLastNameInput: Locator;
  readonly physicianTitleDropdown: Locator;
  readonly professionDropdown: Locator;
  readonly clinicalSpecialityInput: Locator;
  readonly physicianAddressInput: Locator;
  readonly physicianAptInput: Locator;
  readonly physicianContactInput: Locator;
  readonly physicianContactTypeDropdown: Locator;
  readonly physicianEmailInput: Locator;
  // readonly scrollIntoView: Locator;
  readonly mentalHealthProviderToggle: Locator;
  readonly hospiceProviderToggle: Locator;
  readonly notesTextarea: Locator;

  // Common buttons
  readonly saveButton: Locator;
  readonly cancelButton: Locator;
  readonly continueButton: Locator;

  constructor(page: Page) {
    this.page = page;

    // Admission Details
    this.editAdmissionDetailsButton = page.getByRole('button', { name: 'Edit' }).first();
   
 // this.desiredCommunityDropdown = page.getByRole('combobox', { name: 'Desired Community*' });
    this.asapCheckbox = page.getByRole('checkbox', { name: 'As Soon as possible' });
    this.chooseDateButton = page.locator('dialog button:has-text("Choose Date")').nth(1);
    this.calendarGrid = page.locator('[role="grid"]'); 
    this.admissionTypeDropdown = page.getByRole('combobox', { name: 'Admission Type*' });
    this.hospiceSwitch = page.getByRole('switch', { name: 'Hospice' });
    this.respiteSwitch = page.getByRole('switch', { name: 'Respite' });
    this.summaryNotesTextbox = page.getByRole('textbox', { name: 'Summary Notes' });

    // Room Management
    this.addRoomButton = page.getByRole('button', { name: 'Add Room' });
    this.roomTypeToggle = page.getByText('Shared');
    this.roomNumberDropdown = page.getByRole('combobox').first();
    this.roomStartDateButton = page.getByRole('button', { name: 'Choose Date' }).first();
    this.roomEndDateButton = page.getByRole('button', { name: 'Choose Date' }).last();
    this.addAdditionalRoomButton = page.getByRole('button', { name: 'Add Additional' });
    this.secondResidentToggle = page.getByText('2nd Resident');
    this.occupancyTypeDropdown = page.locator('div').filter({ hasText: 'Occupancy Type*' });
    this.editRoomButton = page.getByRole('button', { name: 'Edit' }).first();
    this.noOptionFoundText = page.getByText('No option found');
    // this.secondaryRoomEditBtn=  page.getByRole('button', { name: 'Edit' }).first();

    // Responsible Person
    this.editResponsiblePersonButton = page.getByRole('button', { name: 'Edit' }).nth(3);
    this.rpFirstNameInput = page.getByRole('textbox', { name: 'Enter First Name' });
    this.rpLastNameInput = page.getByRole('textbox', { name: 'Enter Last Name' });
    this.specificRelationshipDropdown = page.getByRole('combobox', { name: 'Specific relationship*' });
    this.rpEmailInput = page.getByRole('textbox', { name: 'Enter Email Address' });
    this.rpAddressLine1Input = page.getByRole('textbox', { name: 'Enter Address Line 1' });
    this.addAnotherButton = page.getByRole('button', { name: 'Add Another' });

    // Diet
    this.editDietButton = page.getByRole('button', { name: 'Edit' }).nth(1);
    this.dietTypeDropdown = page.getByRole('combobox').first();
    this.addDietButton = page.getByRole('button', { name: 'Add' }).first();
    this.allergyTextbox = page.getByRole('textbox', { name: 'Enter one per line...' });
    this.addAllergyButton = page.getByRole('button', { name: 'Add' }).nth(1);

    // Diagnosis
    this.editDiagnosisButton = page.getByRole('button', { name: 'Edit' }).nth(2);
    this.diagnosisTextbox = page.getByRole('textbox', { name: 'Enter one per line...' }).first();
    this.addDiagnosisButton = page.getByRole('button', { name: 'Add' }).first();
    this.behavioralHealthTextbox = page.getByRole('textbox', { name: 'Enter one per line...' }).nth(1);
    this.addBehavioralButton = page.getByRole('button', { name: 'Add' }).nth(1);

    // Insurance
    this.addInsuranceButton = page.getByRole('button', { name: 'Add' }).nth(1);
    this.insuranceTypeDropdown = page.getByRole('combobox', { name: 'Type*' });
    this.insuranceProviderInput = page.getByRole('textbox', { name: 'Enter Insurance Provider' });
    this.memberIdInput = page.getByRole('textbox', { name: 'Enter Member ID' });
    this.groupNumberInput = page.getByRole('textbox', { name: 'Enter Group Number' });

    // Hospitalization
    this.editHospitalizationButton = page.getByRole('button', { name: 'Edit' }).nth(5);
    this.hospitalNameInput = page.getByRole('textbox', { name: 'Hospital Name' });
    this.hospitalAddressInput = page.getByRole('textbox', { name: 'Hospital Address' });
    this.hospitalContactInput = page.getByRole('textbox', { name: 'Contact Number' });
    this.hospitalFaxInput = page.getByRole('textbox', { name: 'Fax' });

    // Immunization
    this.addImmunizationButton = page.getByRole('button', { name: 'Add' }).nth(2);
    this.immunizationNameDropdown = page.getByRole('combobox', { name: 'Immunization Name*' });
    this.routeDropdown = page.getByRole('combobox', { name: 'Select Route' });
    this.administeredDateButton = page.getByRole('button', { name: 'Choose Date' });
    this.administeredByDropdown = page.getByRole('combobox').filter({ hasText: 'Search for a user' });
    this.siteInput = page.locator('input[name="site"]');
    this.vaccineManufacturerDropdown = page.getByRole('combobox', { name: 'Vaccine Manufacturer' });
    this.lotNumberInput = page.locator('input[name="lotNumber"]');

    // Physician
    this.editPhysicianButton = page.getByRole('button', { name: 'Edit' }).nth(4);
    this.physicianFirstNameInput = page.getByRole('textbox', { name: 'Enter First Name' });
    this.physicianLastNameInput = page.getByRole('textbox', { name: 'Enter Last Name' });
    this.physicianTitleDropdown = page.getByRole('combobox', { name: 'Title*' });
    this.professionDropdown = page.getByRole('combobox', { name: 'Profession*' })
    this.clinicalSpecialityInput = page.getByRole('textbox', { name: 'Clinical speciality or' });
    this.physicianAddressInput = page.getByRole('textbox', { name: 'Enter Address' });
    this.physicianAptInput = page.getByRole('textbox', { name: 'APT / Unit #' });
    this.physicianContactInput = page.locator('input[name="primaryContactNumber"]');
    this.physicianContactTypeDropdown = page.getByRole('combobox').nth(2);
    this.physicianEmailInput = page.getByRole('textbox', { name: 'Enter Email' });
   // this.continueButton = page.locator('[data-slot="drawer-footer"] button:has-text("Continue")');
   this.continueButton = page.locator("//button[text()='Continue']");
    this.mentalHealthProviderToggle = page.getByRole('switch', { name: /Mental Health Provider/i });
    this.hospiceProviderToggle = page.getByRole('switch', { name: /Hospice Provider/i });
    this.notesTextarea = page.getByPlaceholder('Type Here...');

    // Common
    this.saveButton = page.getByRole('button', { name: 'Save' });
    this.cancelButton = page.getByRole('button', { name: 'Cancel' });
   

  }

  // ========== ADMISSION DETAILS ==========
  // ========== ADMISSION DETAILS ==========
async editAdmissionDetails(data: any) {
  console.log('📝 Editing Admission Details...');
  await this.editAdmissionDetailsButton.click();
  await this.page.waitForTimeout(500);

  // if (data.desiredCommunity) {
  //   await this.desiredCommunityDropdown.click();
  //   await this.page
  //     .getByLabel(data.desiredCommunity)
  //     .getByText(data.desiredCommunity)
  //     .click();
  // 

  // ===== ASAP & Move-In Date logic (EDIT FLOW) =====
  await this.asapCheckbox.waitFor({ state: 'visible' });

const isAsapChecked = await this.asapCheckbox.isChecked();

if (!isAsapChecked) {
  // ASAP NOT selected → select it and STOP
  console.log('☑️ ASAP not selected — selecting ASAP, skipping date selection');
  await this.asapCheckbox.click();
  
} else {
  // ASAP already selected → deselect & select current date
  console.log('⬜ ASAP already selected — deselecting and selecting current date');

  await this.asapCheckbox.click(); // deselect ASAP
  await this.chooseDateButton.waitFor({ state: 'visible', timeout: 10000 });

  await this.chooseDateButton.click();

  await this.calendarGrid.waitFor({ state: 'visible' });

  const today = new Date().getDate();
  await this.calendarGrid
    .getByRole('button', { name: String(today), exact: true })
    .click();

  console.log(`📅 Selected current date: ${today}`);
}


    if (data.respite) {
      await this.respiteSwitch.click();
    }

    if (data.admissionType) {
      await this.admissionTypeDropdown.click();
      await this.page.getByRole('option', { name: data.admissionType }).click();
    }

    if (data.hospice) {
      await this.hospiceSwitch.click();
    }

    if (data.summaryNotes) {
      await this.summaryNotesTextbox.click();
      await this.summaryNotesTextbox.fill(data.summaryNotes);
    }

    await this.saveButton.click();
    await this.page.waitForTimeout(1000);
    console.log('✅ Admission Details saved');
  }

  // ========== RESPONSIBLE PERSON ==========
  async editResponsiblePerson(data: any) {
    console.log('📝 Editing Responsible Person...');
    await this.editResponsiblePersonButton.click();
    await this.page.waitForTimeout(500);

    await this.rpFirstNameInput.click();
    await this.rpFirstNameInput.press('ControlOrMeta+a');
    await this.rpFirstNameInput.fill(data.firstName);

    await this.rpLastNameInput.click();
    await this.rpLastNameInput.press('ControlOrMeta+a');
    await this.rpLastNameInput.fill(data.lastName);

    if (data.specificRelationship) {
      await this.specificRelationshipDropdown.click();
      await this.page.getByRole('option', { name: data.specificRelationship }).click();
    }

    await this.rpEmailInput.click();
    await this.rpEmailInput.press('ControlOrMeta+a');
    await this.rpEmailInput.fill(data.email);

    await this.rpAddressLine1Input.click();
    await this.rpAddressLine1Input.fill(data.addressLine1);

    // Add another responsible person if provided
    if (data.additionalPerson) {
      await this.addAnotherButton.click();
      await this.page.waitForTimeout(500);

      await this.page.locator('input[name="responsiblePersons[1].firstName"]').fill(data.additionalPerson.firstName);
      await this.page.locator('input[name="responsiblePersons[1].lastName"]').fill(data.additionalPerson.lastName);

      await this.page.locator('//button//span[text()="Relationship Category"]').click();
      await this.page.getByRole('option', { name: data.additionalPerson.relationship }).click();

      await this.page.locator('//button//span[text()="Specific relationship"]').click();
      await this.page.getByRole('option', { name: data.additionalPerson.specificRelationship }).click();

      await this.page.locator('//button//span[text()="Enter Type"]').click();
      await this.page.getByRole('option', { name: data.additionalPerson.contactType }).click();

      await this.page.locator('input[name="responsiblePersons[1].contactNumber"]').fill(data.additionalPerson.contactNumber);
      await this.page.locator('input[name="responsiblePersons[1].email"]').fill(data.additionalPerson.email);
      await this.page.locator('input[name="responsiblePersons[1].addressLine1"]').fill(data.additionalPerson.addressLine1);
    }

    await this.saveButton.click();
    await this.page.waitForTimeout(1000);
    console.log('✅ Responsible Person saved');
  }

  // ========== DIET ==========
  async editDiet(data: any) {
    console.log('📝 Editing Diet...');
    await this.editDietButton.click();
    await this.page.waitForTimeout(500);

    // Add diet types
    for (const dietType of data.dietTypes) {
      await this.dietTypeDropdown.click();
      await this.page.getByRole('option', { name: dietType }).click();
      await this.addDietButton.click();
      await this.page.waitForTimeout(300);
    }

    // Add allergies
    if (data.allergies && data.allergies.length > 0) {
      await this.allergyTextbox.click();
      await this.allergyTextbox.fill(data.allergies.join('\n'));
      await this.addAllergyButton.click();
      await this.page.waitForTimeout(300);
    }

    await this.saveButton.click();
    await this.page.waitForTimeout(1000);
    console.log('✅ Diet saved');
  }

  // ========== DIAGNOSIS ==========
  async editDiagnosis(data: any) {
    console.log('📝 Editing Diagnosis...');
    await this.editDiagnosisButton.click();
    await this.page.waitForTimeout(500);

    // Add diagnoses
    if (data.diagnoses && data.diagnoses.length > 0) {
      await this.diagnosisTextbox.click();
      await this.diagnosisTextbox.fill(data.diagnoses.join('\n'));
      await this.addDiagnosisButton.click();
      await this.page.waitForTimeout(300);
    }

    // Add behavioral health
    if (data.behavioralHealth && data.behavioralHealth.length > 0) {
      await this.behavioralHealthTextbox.click();
      await this.behavioralHealthTextbox.fill(data.behavioralHealth.join('\n'));
      await this.addBehavioralButton.click();
      await this.page.waitForTimeout(300);
    }

    await this.saveButton.click();
    await this.page.waitForTimeout(1000);
    console.log('✅ Diagnosis saved');
  }

  // ========== INSURANCE ==========
  async addInsurance(data: any) {
    console.log('📝 Adding Insurance...');
    await this.addInsuranceButton.click();
    await this.page.waitForTimeout(500);

    await this.insuranceTypeDropdown.click();
    await this.page.getByRole('option', { name: data.type }).click();

    await this.insuranceProviderInput.click();
    await this.insuranceProviderInput.fill(data.provider);

    await this.memberIdInput.click();
    await this.memberIdInput.fill(data.memberId);

    await this.groupNumberInput.click();
    await this.groupNumberInput.fill(data.groupNumber);

    await this.saveButton.click();
    await this.page.waitForTimeout(1000);
    console.log('✅ Insurance added');
  }

  // ========== HOSPITALIZATION ==========
  async editHospitalization(data: any) {
    console.log('📝 Editing Hospitalization...');
    await this.editHospitalizationButton.click();
    await this.page.waitForTimeout(500);

    await this.hospitalNameInput.click();
    await this.hospitalNameInput.fill(data.hospitalName);

    await this.hospitalAddressInput.click();
    await this.hospitalAddressInput.fill(data.hospitalAddress);

    await this.hospitalContactInput.click();
    await this.hospitalContactInput.fill(data.contactNumber);

    await this.hospitalFaxInput.click();
    await this.hospitalFaxInput.fill(data.fax);

    await this.saveButton.click();
    await this.page.waitForTimeout(1000);
    console.log('✅ Hospitalization saved');
  }

  // ========== IMMUNIZATION ==========
  async addImmunization(data: any) {
    console.log('📝 Adding Immunization...');
    await this.addImmunizationButton.click();
    await this.page.waitForTimeout(500);

    await this.immunizationNameDropdown.click();
    await this.page.getByLabel(data.name).getByText(data.name).click();

    if (data.route) {
      await this.routeDropdown.click();
      await this.page.getByLabel(data.route).getByText(data.route).click();
    }

    if (data.administeredDate) {
      //  const dob= data.getrandomAdminDate();
      //  const dobDay = dob.dobDay;
      //  const dobYear = dob.dobYear;
      //  const dobMonth = dob.dobMonth;
      await this.selectAdministeredDate(data.adminYear, data.adminMMonth);
    }

    if (data.administeredBy) {
      await this.administeredByDropdown.click();
      await this.page.getByLabel(data.administeredBy).getByText(data.administeredBy).click();
    }

    if (data.site) {
      await this.siteInput.click();
      await this.siteInput.fill(data.site);
    }

    if (data.manufacturer) {
      await this.vaccineManufacturerDropdown.click();
      await this.page.getByLabel(data.manufacturer).getByText(data.manufacturer).click();
    }

    if (data.lotNumber) {
      await this.lotNumberInput.click();
      await this.lotNumberInput.fill(data.lotNumber);
    }

    await this.saveButton.click();
    await this.page.waitForTimeout(1000);
    console.log('✅ Immunization added');
  }

  // ========== PHYSICIAN ==========
  async editPhysician(data: any) {
    console.log('📝 Editing Physician...');
    await this.editPhysicianButton.click();
    await this.page.waitForTimeout(500);

    await this.physicianFirstNameInput.click();
    await this.physicianFirstNameInput.fill(data.firstName);

    await this.physicianLastNameInput.click();
    await this.physicianLastNameInput.fill(data.lastName);

    await this.selectRandomTitle();
    await this.selectRandomProfession();
 
    await this.clinicalSpecialityInput.click();
    await this.clinicalSpecialityInput.fill(data.clinicalSpeciality);

    await this.physicianAddressInput.click();
    await this.physicianAddressInput.fill(data.address);

    if (data.apt) {
      await this.physicianAptInput.click();
      await this.physicianAptInput.fill(data.apt);
    }

    await this.physicianContactInput.click();
    await this.physicianContactInput.fill(data.contactNumber);

    await this.physicianContactInput.press('Tab');

    await this.physicianContactTypeDropdown.click();
    await this.page.getByRole('option', { name: data.contactType }).click();


    await this.physicianEmailInput.click();
    await this.physicianEmailInput.fill(data.email);
    await this.page.locator('[data-slot="drawer-content"]').evaluate(el => {
  el.scrollTop = el.scrollHeight;
});

// Click Continue using page object locator
    await this.continueButton.waitFor({ state: 'visible' });
    await this.continueButton.click();

// Wait for Roles & Notes screen
    await this.page.waitForSelector('text=Add Roles & Notes');

    await this.mentalHealthProviderToggle.click();
    await this.hospiceProviderToggle.click();

    await this.notesTextarea.click();
    await this.notesTextarea.fill("Automation notes for physician.");

    await this.saveButton.click();
    await this.page.waitForTimeout(1000);
    console.log('✅ Physician saved');
  }

     async selectAdministeredDate(year: string, month: string) {
        console.log(`📅 Selecting administered date: Year ${year}, Month ${month}`);
        await this.administeredDateButton.click();
        await this.page.waitForTimeout(500);
        
        // Select year from dropdown
        await this.page.getByLabel('Choose the Year').selectOption(year);
        await this.page.waitForTimeout(300);

        //choose month 
        await this.page.getByLabel('Choose the Month').selectOption(month)
        
        // Click the specific day
        await this.page.getByRole('button', { name: "12" }).click();
        await this.page.waitForTimeout(300);
        console.log('✅ DOB selected');
    } 

    // Select random title from dropdown
     async selectRandomTitle() {
  const titleButton = this.page.locator(
    'label:has-text("Title") >> xpath=ancestor::div[@data-slot="form-item"]//button'
  );

  await titleButton.click();

  const options = this.page.locator('[role="listbox"] [role="option"]');
  await options.first().waitFor();

  const count = await options.count();
  const randomIndex = Math.floor(Math.random() * count);

  await options.nth(randomIndex).click();
}

// Select random profession from dropdown
async selectRandomProfession() {
  const professionButton = this.page.locator(
    'label:has-text("Profession") >> xpath=ancestor::div[@data-slot="form-item"]//button'
  );

  await professionButton.click();

  const options = this.page.locator('[role="listbox"] [role="option"]');
  await options.first().waitFor();

  const count = await options.count();
  const randomIndex = Math.floor(Math.random() * count);

  await options.nth(randomIndex).click();
}

  // ========== ROOM MANAGEMENT ==========
  
  private async selectDate(dateString: string) {
    await this.page.getByRole('button', { name: dateString }).click();
    await this.page.waitForTimeout(300);
  }

private async selectRoom(): Promise<boolean> {
  console.log('🏠 Selecting available room across occupancy types...');

  const occupancyRadios = this.page.getByRole('radio');
  const roomDropdown = this.roomNumberDropdown;
  const noOptionText = this.noOptionFoundText;

  const occupancyCount = await occupancyRadios.count();
  console.log(`🔍 Found ${occupancyCount} occupancy types`);

  for (let i = 0; i < occupancyCount; i++) {
    const radio = occupancyRadios.nth(i);

    if (!(await radio.isVisible().catch(() => false))) continue;

    const label = (await radio.textContent())?.trim();
    console.log(`🔄 Trying occupancy type: ${label}`);

    // Select occupancy type
    await radio.click();
    await this.page.waitForTimeout(500);

    // Open room dropdown
    await roomDropdown.click();
    await this.page.waitForTimeout(800);

    // Check "No options found"
    const noOptions = await noOptionText.isVisible().catch(() => false);
    if (noOptions) {
      console.log(`⚠️ No rooms available for ${label}`);
      await this.page.keyboard.press('Escape');
      continue;
    }

    // Fetch available rooms
    const options = this.page.locator('[role="option"]');
    const optionCount = await options.count();

    if (optionCount > 0) {
      const randomIndex = Math.floor(Math.random() * optionCount);
      const selectedRoom = await options.nth(randomIndex).textContent();

      console.log(`✅ Selected room: ${selectedRoom?.trim()}`);
      await options.nth(randomIndex).click();
      return true;
    }

    // Safety escape before next iteration
    await this.page.keyboard.press('Escape');
  }

  console.log('❌ No rooms available in any occupancy type — cancelling');
  await this.cancelButton.click();
  return false;
}

  async addPrimaryRoom(data: any): Promise<boolean> {
    console.log('📝 Adding Primary Room...');
    try {
      await this.addRoomButton.click();
      await this.page.waitForTimeout(500);
      
      if (!await this.selectRoom()) return false;
      
      await this.roomStartDateButton.click();
      await this.selectDate(data.startDate);
      
      await this.saveButton.click();
      await this.page.waitForTimeout(1000);
      console.log('✅ Primary Room added\n');
      return true;
    } catch (error) {
      console.log('❌ Error:', error);
      await this.cancelButton.click();
      return false;
    }
  }

async changeRoomType(data: any): Promise<boolean> {
  console.log('📝 Editing Primary Room...');

  await this.page.getByText('Primary', { exact: true }).first().click();
  await this.page.waitForTimeout(1500);

  if (!await this.selectRoom()) return false;

  await this.roomStartDateButton.click();
  await this.selectDate(data.startDate);

  await this.saveButton.click();
  await this.page.waitForTimeout(1500);

  console.log('✅ Primary room updated\n');
  return true;
}


async addSecondaryRoom(data: any): Promise<boolean> {
  console.log('📝 Adding Secondary Room...');

  await this.addAdditionalRoomButton.click();
  await this.page.waitForTimeout(1000);

  if (!await this.selectRoom()) return false;

  await this.roomStartDateButton.click();
  await this.selectDate(data.startDate);

  await this.roomEndDateButton.click();
  await this.selectDate(data.endDate);

  await this.saveButton.click();
  await this.page.waitForTimeout(1500);

  console.log('✅ Secondary Room added\n');
  return true;
}

 async editSecondaryRoom(data: any): Promise<boolean> {
  console.log('✏️ Editing Secondary Room...');

  // 🔹 Find Secondary room card using badge text
  const secondaryRoomCard = this.page.locator('div', {
    has: this.page.getByText('Secondary', { exact: true }),
  }).first();

  await secondaryRoomCard.waitFor({ state: 'visible', timeout: 10000 });

  // 🔹 Click Edit inside Secondary card
  const editBtn = secondaryRoomCard.getByRole('button', { name: 'Edit' });
  await editBtn.click();

  // 🔹 Ensure drawer opened
  await this.page
    .getByText(/Add Secondary Room|Edit Secondary Room/i)
    .waitFor({ state: 'visible', timeout: 5000 });

  // 🔹 Select room across occupancy types
  const roomSelected = await this.selectRoom();
  if (!roomSelected) {
    console.log('⚠️ No room available for Secondary edit');
    return false;
  }

  // 🔹 Update dates if needed
  if (data?.startDate) {
    await this.roomStartDateButton.click();
    await this.selectDate(data.startDate);
  }

  if (data?.endDate) {
    await this.roomEndDateButton.click();
    await this.selectDate(data.endDate);
  }

  // 🔹 Save
  await this.saveButton.click();
  await this.page.waitForTimeout(1500);

  console.log('✅ Secondary room updated successfully\n');
  return true;
}


private async selectCurrentDate() {
  // Open date picker
  await this.chooseDateButton.click();
  await this.page.waitForTimeout(300);

  // Get today's day number
  const today = new Date();
  const day = today.getDate();

  // Click the button corresponding to today's date
  await this.page.getByRole('button', { name: String(day) }).click();
  await this.page.waitForTimeout(300);

  console.log(`✅ Selected current date: ${day}`);
}

}





    
