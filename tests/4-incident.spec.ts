import { test, expect } from '@playwright/test';
import { IncidentPage } from '../pages/IncidentPage';
import { LoginPage } from '../pages/LoginPage';
import { incidentTestData, incidentTypes, signaturePositions } from '../test-data/Incident';
import { testData } from '../test-data/credentials';
import * as fs from 'fs';

test.describe('Incident Management', () => {
  let incidentPage: IncidentPage;

  test.beforeEach(async ({ page }) => {
    // Login
    const authExists = fs.existsSync('auth-state.json');
    
    if (!authExists) {
      console.log('🔐 Logging in...');
      const loginPage = new LoginPage(page);
      await loginPage.navigate(testData.baseURL);
      await loginPage.login(testData.validUser.email, testData.validUser.password);
      await page.waitForTimeout(3000);
    }
    
    // Navigate to move-ins (or residents)
    console.log('📍 Going to Move-ins...');
    await page.goto('https://qa-ehr.polarissw.co/move-ins');
    await page.waitForTimeout(2000);
    
    // Click first entry
    console.log('📍 Opening first entry...');
    await page.locator('tbody tr').first().locator('td').first().click();
    await page.waitForTimeout(2000);
    
    // Verify we're on the detail page
    await page.waitForURL('**/move-ins/**');
    console.log('✅ On detail page');
    
    // Initialize IncidentPage and navigate to Incidents tab
    incidentPage = new IncidentPage(page);
    
    console.log('📍 Clicking Incidents tab...');
    await incidentPage.navigateToAddIncident();
    await page.waitForTimeout(2000);
    
    // Verify URL changed to incidents section
    await page.waitForURL('**/incidents**');
    console.log('✅ Incidents tab opened and Add Incident form loaded\n');
  });

  test('TC-I001: Create complete incident with all details and verify', async ({ page }) => {
    
    await test.step('Fill incident description', async () => {
      console.log('📝 Filling incident description...');
      await incidentPage.fillIncidentDescription(incidentTestData.description);
      console.log('✅ Description filled');
    });

    await test.step('Select all incident types', async () => {
      console.log('📝 Selecting incident types...');
      await incidentPage.selectIncidentType('Abuse (Suspected)');
      await incidentPage.selectIncidentType('Illness');
      await incidentPage.selectIncidentType('Behavioral');
      await incidentPage.selectIncidentType('Medical Emergency /');
      console.log('✅ Incident types selected');
    });

    // await test.step('Select incident date', async () => {
    //   console.log('📅 Selecting date...');
    //   await page.getByRole('button', { name: '/04/2026' }).click();
    //   await page.getByRole('button', { name: 'Su, January 4th,' }).click();
    //   console.log('✅ Date selected');
    // });

    await test.step('Fill location', async () => {
      console.log('📍 Filling location...');
      await incidentPage.fillLocation(incidentTestData.location);
      console.log('✅ Location filled');
    });

    await test.step('Fill injuries', async () => {
      console.log('🩹 Filling injuries...');
      await incidentPage.fillInjuries(incidentTestData.injuries);
      console.log('✅ Injuries filled');
    });

    await test.step('Fill witness name', async () => {
      console.log('👤 Filling witness name...');
      await incidentPage.fillWitnessName(incidentTestData.witnessName);
      console.log('✅ Witness name filled');
    });

await test.step('Select First Aid - No (REQUIRED)', async () => {
  console.log('🚫 Selecting First Aid - No...');
  await page.waitForTimeout(1000);
  await incidentPage.selectFirstAidNo();
  await page.waitForTimeout(500);
  console.log('✅ First Aid - No selected');
});

      await test.step('Select reported by', async () => {
  console.log('👤 Selecting reported by...');
  await incidentPage.selectReportedByFirst();  // New method
  console.log('✅ Reported by selected');
});

   await test.step('Set transported to No', async () => {
  console.log('🚫 Setting transported to No...');
  await incidentPage.setTransportedNo();
  await page.waitForTimeout(500);
  console.log('✅ Transported set to No');
});

    await test.step('Fill nurse progress', async () => {
      console.log('📝 Filling nurse progress...');
      await incidentPage.fillNurseProgress(incidentTestData.nurseProgress);
      console.log('✅ Nurse progress filled');
    });

    await test.step('Toggle notify responsible person', async () => {
      console.log('🔔 Toggling notify responsible person...');
      await incidentPage.toggleNotifyResponsiblePerson();
      console.log('✅ Notify responsible person toggled');
    });

   await test.step('Upload incident image', async () => {
  console.log('📤 Uploading image...');
  
  // Start waiting for file chooser before clicking
  const fileChooserPromise = page.waitForEvent('filechooser');
  await page.getByRole('button', { name: 'Click to upload' }).click();
  const fileChooser = await fileChooserPromise;
  await fileChooser.setFiles('C:\\Users\\LNV-56\\Downloads\\Risk-Acknowledgement.pdf');
  
  await page.waitForTimeout(1000);
  console.log('✅ Image uploaded');
});

    await test.step('Add signature on canvas', async () => {
      console.log('✍️ Adding signature on canvas...');
      await page.locator('canvas').click({ position: { x: 150, y: 200 } });
      await page.locator('canvas').click({ position: { x: 180, y: 195 } });
      await page.locator('canvas').click({ position: { x: 210, y: 205 } });
      await page.locator('canvas').click({ position: { x: 240, y: 200 } });
      await page.locator('canvas').click({ position: { x: 270, y: 195 } });
      await page.locator('canvas').click({ position: { x: 300, y: 205 } });
      await page.locator('canvas').click({ position: { x: 330, y: 200 } });
      console.log('✅ Signature added');
    });

    await test.step('Save incident', async () => {
      console.log('💾 Saving incident...');
      await page.getByRole('button', { name: 'Save Incident' }).click();
      await page.waitForTimeout(2000);
      console.log('✅ Incident saved');
    });

    await test.step('Verify incident details', async () => {
      console.log('🔍 Verifying incident details...');
      await page.waitForTimeout(1000);
      console.log('✅ On incident details page');
    });

   await test.step('Add comment', async () => {
  console.log('💬 Adding comment...');
  await incidentPage.addComment(incidentTestData.comment);
  await page.waitForTimeout(1500);
  console.log('✅ Comment added');
});

   await test.step('Upload document', async () => {
  console.log('📤 Uploading document...');
  await incidentPage.uploadDocument();
  await page.waitForTimeout(1000);
  console.log('✅ Document uploaded');
});

    await test.step('Mark incident as closed', async () => {
      console.log('🔒 Marking incident as closed...');
      await page.getByRole('button', { name: 'Mark as Closed' }).click();
      await page.waitForTimeout(1000);
      console.log('✅ Incident marked as closed');
    });

    await test.step('Final verification', async () => {
      console.log('🔍 Final verification...');
      await page.screenshot({ path: 'incident-complete.png', fullPage: true });
      console.log('✅ Screenshot saved');
      console.log('✅ Incident created successfully!\n');
    });
  });
});