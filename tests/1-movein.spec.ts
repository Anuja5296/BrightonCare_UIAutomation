// tests/1-movein.spec.ts
import { test } from '@playwright/test';  // Import from @playwright/test
import { MoveInPage } from '../pages/MoveInPage';
import { AddMoveInPage } from '../pages/AddMoveInPage';
import { generateMoveInData } from '../test-data/Addmovein-data';
import { LoginPage } from '../pages/LoginPage';
import { testData } from '../test-data/credentials';

test.describe('Move-In Tests', () => {
    let loginPage: LoginPage;

    test.beforeEach(async ({ page }) => {
          loginPage = new LoginPage(page);
          await loginPage.navigate(testData.baseURL);
          await loginPage.login(testData.validUser.email, testData.validUser.password);
      });

test('Add Move-In with Unique Random Data', async ({ page }) => {  // Use 'page'
  console.log('='.repeat(80));
  console.log('TEST 1: ADD MOVE-IN');
  console.log('='.repeat(80));
    

  
  
  const moveInData = generateMoveInData(0);
  
  console.log(`\n✅ Generated Name: ${moveInData.firstName} ${moveInData.lastName}`);
  
  console.log('✅ On Move-ins page');
  
  const moveInPage = new MoveInPage(page);
  
  console.log('\n📍 Opening Add Move-in form...');
  await moveInPage.clickAddMoveIn();
  await page.waitForTimeout(2000);
  
  console.log('📍 Filling form...');
  const addMoveInPage = new AddMoveInPage(page);
  await addMoveInPage.fillForm(moveInData);
  
  console.log('📍 Submitting form...');
  await addMoveInPage.submit();
  await page.waitForTimeout(3000);
  
  console.log(`\n✅ Move-in added: ${moveInData.firstName} ${moveInData.lastName}`);
  console.log('✅ TEST 1 COMPLETED\n');
})});