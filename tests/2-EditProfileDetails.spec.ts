// tests/2-EditProfileDetails.spec.ts
import { test } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { EditProfileDetailsPage } from '../pages/EditProfileDetailsPage';
import { EditProfileTestData, getrandomAdminDate } from '../test-data/EditProfileDetails';
import { testData } from '../test-data/credentials';
import * as fs from 'fs';

test('Edit Any Existing Move-In Profile', async ({ page }) => {
  console.log('='.repeat(80));
  console.log('TEST: EDIT PROFILE DETAILS (STANDALONE)');
  console.log('='.repeat(80));
  
  // Check if we need to login (if auth-state.json doesn't exist)
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
  
  // Find any existing entry
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
  
  // Edit all sections
  console.log('📍 Editing all profile sections...\n');
  const editProfilePage = new EditProfileDetailsPage(page);
  
  console.log('   1/8: Admission Details...');
  await editProfilePage.editAdmissionDetails(EditProfileTestData.admissionDetails);
  
  console.log('   2/8: Responsible Person...');
  await editProfilePage.editResponsiblePerson(EditProfileTestData.responsiblePerson);
  
  console.log('   3/8: Diet...');
  await editProfilePage.editDiet(EditProfileTestData.diet);
  
  console.log('   4/8: Diagnosis...');
  await editProfilePage.editDiagnosis(EditProfileTestData.diagnosis);
  
  console.log('   5/8: Insurance...');
  await editProfilePage.addInsurance(EditProfileTestData.insurance);
  
  console.log('   6/8: Hospitalization...');
  await editProfilePage.editHospitalization(EditProfileTestData.hospitalization);
  
  console.log('   7/8: Immunization...');
  const admin = getrandomAdminDate();
  
  await editProfilePage.addImmunization(EditProfileTestData.immunization);
  
  console.log('   8/8: Physician...');
  await editProfilePage.editPhysician(EditProfileTestData.physician);
  
  console.log('\n' + '='.repeat(80));
  console.log('✅ TEST COMPLETED - Profile Edited Successfully');
  console.log('='.repeat(80) + '\n');
});