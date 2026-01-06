// pages/AddMoveInPage.ts

import { Page } from '@playwright/test';

export class AddMoveInPage {
    constructor(private page: Page) {}

    // Resident Info Locators
    firstNameInput = () => this.page.locator('input[name="residentInfo.firstName"]');
    lastNameInput = () => this.page.locator('input[name="residentInfo.lastName"]');
    ssnInput = () => this.page.getByRole('textbox', { name: 'Enter Social Security Number' });
    dobButton = () => this.page.getByRole('button', { name: 'Choose Date' }).first();
    genderIdentityDropdown = () => this.page.getByRole('combobox', { name: 'Gender Identity' });
    pronounsDropdown = () => this.page.getByRole('combobox', { name: 'Pronouns' });
    maritalStatusDropdown = () => this.page.getByRole('combobox', { name: 'Marital Status' });
    residentContactNumber = () => this.page.locator('input[name="residentInfo.contactNumber"]');
    addressLine1Input = () => this.page.locator('input[name="residentInfo.addressLine1"]');
    cityDropdown = () => this.page.getByRole('combobox', { name: 'City' }).first();
    stateDropdown = () => this.page.getByRole('combobox', { name: 'State' }).first();
    countryInput = () => this.page.locator('input[name="residentInfo.country"]');
    zipCodeInput = () => this.page.locator('input[name="residentInfo.zipCode"]');
    
    // Responsible Person Locators
    rpFirstNameInput = () => this.page.locator('input[name="responsiblePersons[0].firstName"]');
    rpLastNameInput = () => this.page.locator('input[name="responsiblePersons[0].lastName"]');
    relationshipDropdown = () => this.page.getByRole('combobox', { name: 'Relationship to Move-in*' });
    specificRelationshipDropdown = () => this.page.getByRole('combobox', { name: 'Specific relationship*' });
    contactNumberTypeDropdown = () => this.page.getByRole('combobox', { name: 'Contact Number*' });
    rpContactNumber = () => this.page.locator('input[name="responsiblePersons[0].contactNumber"]');
    emailInput = () => this.page.getByRole('textbox', { name: 'Enter Email Address' });
    rpAddressLine1Input = () => this.page.locator('input[name="responsiblePersons[0].addressLine1"]');
    rpCityButton = () => this.page.locator('button').filter({ hasText: 'Select City' });
    rpStateButton = () => this.page.locator('button').filter({ hasText: 'Select State' });
    rpZipCodeInput = () => this.page.locator('input[name="responsiblePersons[0].zipCode"]');
    
    // Admission Details Locators
    desiredCommunityDropdown = () => this.page.getByRole('combobox', { name: 'Desired Community*' });
    moveInDateButton = () => this.page.getByRole('button', { name: 'Choose Date' });
    
    // Buttons
    addMoveInButton = () => this.page.getByRole('button', { name: 'Add Move-in' });
    cancelButton = () => this.page.getByRole('button', { name: 'Cancel' });

    // Select Date of Birth (with year dropdown)
    async selectDateOfBirth(year: string, month: string) {
        console.log(`📅 Selecting DOB: Year ${year}, Month ${month}`);
        await this.dobButton().click();
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

    // Select Gender Identity
    async selectGenderIdentity(gender: string) {
        console.log(`🔽 Selecting Gender: ${gender}`);
        await this.genderIdentityDropdown().click();
        await this.page.waitForTimeout(300);
        await this.page.getByRole('option', { name: gender, exact: true }).click();
    }

    // Select Pronouns
    async selectPronouns(pronoun: string) {
        console.log(`🔽 Selecting Pronouns: ${pronoun}`);
        await this.pronounsDropdown().click();
        await this.page.waitForTimeout(300);
        await this.page.getByRole('option', { name: pronoun }).click();
    }

    // Select Marital Status
    async selectMaritalStatus(status: string) {
        console.log(`🔽 Selecting Marital Status: ${status}`);
        await this.maritalStatusDropdown().click();
        await this.page.waitForTimeout(300);
        await this.page.getByRole('option', { name: status }).click();
    }

    // Select City (Resident)
    async selectCity(cityName: string) {
        console.log(`🔽 Selecting City: ${cityName}`);
        await this.cityDropdown().click();
        await this.page.waitForTimeout(300);
        await this.page.getByRole('option', { name: cityName }).click();
    }

    // Select State (Resident)
    async selectState(stateName: string) {
        console.log(`🔽 Selecting State: ${stateName}`);
        await this.stateDropdown().click();
        await this.page.waitForTimeout(300);
        await this.page.getByRole('option', { name: stateName, exact: true }).click();
    }

    // Select Relationship to Move-in
    async selectRelationshipToMoveIn(relationship: string) {
        console.log(`🔽 Selecting Relationship: ${relationship}`);
        await this.relationshipDropdown().click();
        await this.page.waitForTimeout(300);
        await this.page.getByRole('option', { name: relationship }).click();
    }

    // Select Specific Relationship
    async selectSpecificRelationship(relationship: string) {
        console.log(`🔽 Selecting Specific Relationship: ${relationship}`);
        await this.specificRelationshipDropdown().click();
        await this.page.waitForTimeout(300);
        await this.page.getByRole('option', { name: relationship }).click();
    }

    // Select Contact Number Type
    async selectContactNumberType(type: string) {
        console.log(`🔽 Selecting Contact Type: ${type}`);
        await this.contactNumberTypeDropdown().click();
        await this.page.waitForTimeout(300);
        await this.page.getByRole('option', { name: type }).click();
    }

    // Select RP City
    async selectRPCity(cityName: string) {
        console.log(`🔽 Selecting RP City: ${cityName}`);
        await this.rpCityButton().click();
        await this.page.waitForTimeout(300);
        await this.page.getByLabel(cityName).getByText(cityName).click();
    }

    // Select RP State
    async selectRPState(stateName: string) {
        console.log(`🔽 Selecting RP State: ${stateName}`);
        await this.rpStateButton().click();
        await this.page.waitForTimeout(300);
        await this.page.getByRole('option', { name: stateName }).click();
    }

    // Select Desired Community
    async selectDesiredCommunity(communityName: string) {
        console.log(`🔽 Selecting Community: ${communityName}`);
        await this.desiredCommunityDropdown().click();
        await this.page.waitForTimeout(300);
        await this.page.getByRole('option', { name: communityName }).click();
    }

    // Select Move-in Date (current or future)
    async selectMoveInDate(daysFromToday: number = 0) {
        console.log(`📅 Selecting move-in date ${daysFromToday} days from today...`);
        
        await this.moveInDateButton().click();
        await this.page.waitForTimeout(500);
        
        if (daysFromToday === 0) {
            // Select today's date
            const todayButton = this.page.getByRole('button', { name: /Today/ });
            await todayButton.click();
        } else {
            // Calculate target date
            const targetDate = new Date();
            targetDate.setDate(targetDate.getDate() + daysFromToday);
            
            const targetDay = targetDate.getDate();
            const targetMonth = targetDate.getMonth();
            const currentMonth = new Date().getMonth();
            
            // Navigate to correct month if needed
            const monthsToNavigate = targetMonth - currentMonth;
            if (monthsToNavigate > 0) {
                for (let i = 0; i < monthsToNavigate; i++) {
                    await this.page.locator('button:has-text(">")').click();
                    await this.page.waitForTimeout(300);
                }
            }
            
            // Click the target day
            const dayCells = this.page.locator(`button:has-text("${targetDay}"), [role="gridcell"]:has-text("${targetDay}")`);
            const count = await dayCells.count();
            
            for (let i = 0; i < count; i++) {
                const cellText = await dayCells.nth(i).textContent();
                if (cellText?.trim() === targetDay.toString()) {
                    await dayCells.nth(i).click();
                    break;
                }
            }
        }
        
        await this.page.waitForTimeout(300);
        console.log('✅ Move-in date selected');
    }

    // Fill the entire form with all fields
    async fillForm(data: any) {
        console.log('📝 Filling Resident Info...');
        
        // Basic Info
        await this.firstNameInput().fill(data.firstName);
        await this.lastNameInput().fill(data.lastName);
        await this.ssnInput().fill(data.ssn);
        
        // Date of Birth
        await this.selectDateOfBirth(data.dobYear, data.dobMonth);
        
        // Demographics
        await this.selectGenderIdentity(data.genderIdentity);
        await this.selectPronouns(data.pronouns);
        await this.selectMaritalStatus(data.maritalStatus);
        
        // Contact Info
        await this.residentContactNumber().fill(data.residentContactNumber);
        
        // Address
        await this.addressLine1Input().fill(data.addressLine1);
        await this.selectCity(data.city);
        await this.selectState(data.state);
        await this.zipCodeInput().fill(data.zipCode);
        
        // Scroll to Responsible Person section
        await this.page.mouse.wheel(0, 400);
        await this.page.waitForTimeout(500);
        
        console.log('📝 Filling Responsible Person...');
        
        await this.rpFirstNameInput().fill(data.rpFirstName);
        await this.rpLastNameInput().fill(data.rpLastName);
        
        // Relationships
        await this.selectRelationshipToMoveIn(data.relationship);
        await this.selectSpecificRelationship(data.specificRelationship);
        
        // Contact
        await this.selectContactNumberType(data.contactNumberType);
        await this.rpContactNumber().fill(data.rpContactNumber);
        await this.emailInput().fill(data.email);
        
        // RP Address
        await this.rpAddressLine1Input().fill(data.rpAddressLine1);
        await this.selectRPCity(data.rpCity);
        await this.selectRPState(data.rpState);
        await this.rpZipCodeInput().fill(data.rpZipCode);
        
        // Scroll to Admission Details
        await this.page.mouse.wheel(0, 400);
        await this.page.waitForTimeout(500);
        
        console.log('📝 Filling Admission Details...');
        
        await this.selectDesiredCommunity(data.desiredCommunity);
        await this.selectMoveInDate(data.daysFromToday || 0);
        
        console.log('✅ Form filled completely');
    }

    // Submit form
    async submit() {
        await this.page.mouse.wheel(0, 300);
        await this.page.waitForTimeout(500);
        await this.addMoveInButton().click();
        // await this.page.waitForTimeout(5000);
        console.log('move in added successfully')    }
}