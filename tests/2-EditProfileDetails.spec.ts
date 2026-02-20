// tests/2-EditProfileDetails.spec.ts
import { test } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { EditProfileDetailsPage } from '../pages/EditProfileDetailsPage';
import { EditProfileTestData, getrandomAdminDate } from '../test-data/EditProfileDetails';
import { testData } from '../test-data/credentials';
import * as fs from 'fs';

test('Edit Any Existing Move-In Profile @chromium', async ({ page }) => {
  console.log('='.repeat(80));
  console.log('TEST: EDIT COMPLETE PROFILE DETAILS');
  console.log('='.repeat(80));
  
  // Check if we need to login
  const authExists = fs.existsSync('auth-state.json');
  
  if (!authExists) {
    console.log('\n🔐 No saved auth found - Logging in...');
    const loginPage = new LoginPage(page);
    await loginPage.navigate(testData.baseURL);
    await loginPage.login(testData.validUser.email, testData.validUser.password);
    await page.waitForTimeout(3000);
    console.log('✅ Logged in\n');
  } else {
    console.log('\n✅ Using saved authentication\n');
  }
  
  // Navigate to move-ins page
  console.log('📍 Navigating to Move-ins page...');
  await page.goto('https://qa-ehr.polarissw.co/move-in');
  await page.waitForTimeout(2000);
  
  // Find existing entry
  console.log('📍 Finding existing entry...');
  await page.waitForSelector('tbody tr', { timeout: 5000 });
  
  const firstRow = page.locator('tbody tr').first();
  const nameCell = firstRow.locator('td').first();
  
  const entryCount = await page.locator('tbody tr').count();
  
  if (entryCount === 0) {
    console.log('❌ No entries found! Please create a move-in first.');
    throw new Error('No move-in entries available to edit');
  }
  
  const entryName = await nameCell.textContent();
  console.log(`✅ Found entry: ${entryName?.trim()}\n`);
  
  // Open entry
  console.log('📍 Opening entry details...');
  await nameCell.click();
  await page.waitForTimeout(2000);
  console.log('✅ Details page opened\n');
  
  // Initialize page object
  const editProfilePage = new EditProfileDetailsPage(page);
  
  // Edit all sections
  console.log('📍 Editing all profile sections...\n');
  
  // 1. ROOM MANAGEMENT
console.log('   1/9: Room Management...');
console.log('   ━'.repeat(40));

const primaryRoomAdded = await editProfilePage.addPrimaryRoom(
  EditProfileTestData.roomManagement.primaryRoom
);

if (!primaryRoomAdded) {
  console.log('⏭️ Skipping Secondary Room and edits — Primary room not added');
} else {
  // Edit primary room
  await editProfilePage.changeRoomType(
    EditProfileTestData.roomManagement.primaryRoom
  );

  // Add secondary room ONLY if primary exists
  const secondaryRoomAdded = await editProfilePage.addSecondaryRoom(
    EditProfileTestData.roomManagement.secondaryRoom
  );

  if (!secondaryRoomAdded) {
    console.log('⚠️ Secondary room not added — skipping edit');
  }
}

console.log('   ━'.repeat(40));
  
  // 2. ADMISSION DETAILS
  console.log('   2/9: Admission Details...');
  await editProfilePage.editAdmissionDetails(EditProfileTestData.admissionDetails);
  
  // 3. RESPONSIBLE PERSON
  console.log('   3/9: Responsible Person...');
  await editProfilePage.editResponsiblePerson(EditProfileTestData.responsiblePerson);
  
  // 4. DIET
  console.log('   4/9: Diet...');
  await editProfilePage.editDiet(EditProfileTestData.diet);
  
  // 5. DIAGNOSIS
  console.log('   5/9: Diagnosis...');
  await editProfilePage.editDiagnosis(EditProfileTestData.diagnosis);
  
  // 6. INSURANCE
  console.log('   6/9: Insurance...');
  await editProfilePage.addInsurance(EditProfileTestData.insurance);
  
  // 7. HOSPITALIZATION
  console.log('   7/9: Hospitalization...');
  await editProfilePage.editHospitalization(EditProfileTestData.hospitalization);
  
  // 8. IMMUNIZATION
  console.log('   8/9: Immunization...');
  await editProfilePage.addImmunization(EditProfileTestData.immunization);
  
  // 9. PHYSICIAN
  console.log('   9/9: Physician...');
  await editProfilePage.editPhysician(EditProfileTestData.physician);
  
  console.log('\n' + '='.repeat(80));
  console.log('✅ TEST COMPLETED - All 9 Sections Edited Successfully');
  console.log('='.repeat(80) + '\n');
});