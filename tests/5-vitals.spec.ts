import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { NotesPage } from '../pages/NotesPage';
import { VitalsPage } from '../pages/vitals.page';
import { vitalsTestData } from '../test-data/vitals';
import * as fs from 'fs';

test.describe('Vitals Management with Graph Verification', () => {
  let vitalsPage: VitalsPage;

  test.beforeEach(async ({ page }) => {
    // Login
    const authExists = fs.existsSync('auth-state.json');
    
    if (!authExists) {
      console.log('🔐 Logging in...');
      const loginPage = new LoginPage(page);
      await loginPage.navigate('https://qa-ehr.polarissw.co/login');
      await loginPage.login('anuja.qa', 'Pass@123');
      await page.waitForTimeout(3000);
    }
    
    // Navigate to move-ins
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

    // Navigate to Notes tab
    const notesPage = new NotesPage(page);
    console.log('📍 Clicking Notes tab...');
    await notesPage.navigateToNotes();
    
    // Verify URL changed to notes section
    await page.waitForURL('**/notes');
    console.log('✅ Notes tab opened\n');

    // Initialize VitalsPage
    vitalsPage = new VitalsPage(page);
  });

  test('Complete Vitals Flow: Add → Verify Card → Check Graph → Update → Verify Updates → Check Graph Again', async ({ page }) => {
    console.log('\n🏥 Starting Complete Vitals Verification Test\n');
    console.log('='.repeat(60));

    // ============================================================
    // STEP 1: Add Initial Vitals
    // ============================================================
    console.log('\n📋 STEP 1: Adding Initial Vitals');
    console.log('-'.repeat(60));
    await vitalsPage.clickAddVitals();
    await vitalsPage.fillVitalsForm(vitalsTestData.initialVitals);
    await vitalsPage.saveVitals();

    // ============================================================
    // STEP 2: Verify Initial Card Appears
    // ============================================================
    console.log('\n📋 STEP 2: Verifying Initial Vitals Card');
    console.log('-'.repeat(60));
    await page.waitForTimeout(2000);
    
    const cardExists = await vitalsPage.verifyCardExists(vitalsTestData.initialVitals.weight);
    expect(cardExists).toBeTruthy();
    console.log('✅ Vitals card is visible');

    const cardText = await vitalsPage.getCardText();
    expect(cardText).toContain('Weight:');
    expect(cardText).toContain(vitalsTestData.initialVitals.weight);
    console.log(`✅ Card Content: ${cardText?.replace(/\s+/g, ' ')}`);

    // ============================================================
    // STEP 3: Click on Card and Open Graph View
    // ============================================================
    console.log('\n📋 STEP 3: Opening Card & Graph View');
    console.log('-'.repeat(60));
    await vitalsPage.clickVitalsCard();
    
    // Open Graph View
    await vitalsPage.openGraphView();
    
    // ============================================================
    // STEP 4: Verify Initial Graph Values
    // ============================================================
    console.log('\n📋 STEP 4: Verifying Initial Graph Data');
    console.log('-'.repeat(60));
    
    const graphDisplayed = await vitalsPage.verifyGraphDisplayed();
    expect(graphDisplayed).toBeTruthy();
    console.log('✅ Graph is displayed');

    const hasGraphData = await vitalsPage.verifyGraphHasData();
    expect(hasGraphData).toBeTruthy();
    console.log('✅ Graph contains data points');

    // Capture initial graph values
    const initialGraphValues = await vitalsPage.captureGraphValues();
    console.log(`📊 Initial Graph Values: ${initialGraphValues.join(', ')}`);

    // Get data point count
    const initialDataPoints = await vitalsPage.getGraphDataPoints();
    console.log(`📊 Number of data points: ${initialDataPoints}`);

    // Test different frequencies
    console.log('\n🔄 Testing Chart Frequencies:');
    await vitalsPage.selectChartFrequency(vitalsTestData.chartFrequencies.daily);
    await vitalsPage.verifyGraphHasData();
    
    await vitalsPage.selectChartFrequency(vitalsTestData.chartFrequencies.weekly);
    await vitalsPage.verifyGraphHasData();
    
    await vitalsPage.selectChartFrequency(vitalsTestData.chartFrequencies.monthly);
    await vitalsPage.verifyGraphHasData();

    // Close graph view
    await vitalsPage.openGraphView();
    console.log('✅ Graph view closed');

    // ============================================================
    // STEP 5: Click Edit and Verify Current Values
    // ============================================================
    console.log('\n📋 STEP 5: Opening Edit Mode & Verifying Current Values');
    console.log('-'.repeat(60));
    await vitalsPage.clickEdit();

    await page.waitForTimeout(1500);
    // Verify form is populated with initial values
    const currentWeight = await vitalsPage.getWeightValue();
    const currentTemp = await vitalsPage.getTemperatureValue();
    const currentPulse = await vitalsPage.getPulseValue();
    
    expect(currentWeight).toBe(vitalsTestData.initialVitals.weight);
    expect(currentTemp).toBe(vitalsTestData.initialVitals.temperature);
    expect(currentPulse).toBe(vitalsTestData.initialVitals.pulse);
    
    console.log('✅ Current values in edit form:');
    console.log(`   Weight: ${currentWeight} lbs`);
    console.log(`   Temperature: ${currentTemp}°F`);
    console.log(`   Pulse: ${currentPulse} bpm`);

    // ============================================================
    // STEP 6: Update Vitals with New Values
    // ============================================================
    console.log('\n📋 STEP 6: Updating Vitals with New Values');
    console.log('-'.repeat(60));
    
    console.log('📝 Updating fields:');
    console.log(`   Weight: ${vitalsTestData.initialVitals.weight} → ${vitalsTestData.updatedVitals.weight}`);
    console.log(`   Temperature: ${vitalsTestData.initialVitals.temperature} → ${vitalsTestData.updatedVitals.temperature}`);
    console.log(`   Pulse: ${vitalsTestData.initialVitals.pulse} → ${vitalsTestData.updatedVitals.pulse}`);
    console.log(`   Systolic BP: ${vitalsTestData.initialVitals.systolicBP} → ${vitalsTestData.updatedVitals.systolicBP}`);
    console.log(`   Position: ${vitalsTestData.initialVitals.position} → ${vitalsTestData.updatedVitals.position}`);
    console.log(`   Oxygen Flow: ${vitalsTestData.initialVitals.oxygenFlow} → ${vitalsTestData.updatedVitals.oxygenFlow}`);
    console.log(`   Blood Sugar Timing: ${vitalsTestData.initialVitals.bloodSugarTiming} → ${vitalsTestData.updatedVitals.bloodSugarTiming}`);
    
    await vitalsPage.fillWeight(vitalsTestData.updatedVitals.weight);
    await vitalsPage.fillTemperature(vitalsTestData.updatedVitals.temperature);
    await vitalsPage.fillPulse(vitalsTestData.updatedVitals.pulse);
    await vitalsPage.fillBloodPressure(
      vitalsTestData.updatedVitals.systolicBP,
      vitalsTestData.updatedVitals.diastolicBP
    );
    await vitalsPage.fillRespiratoryRate(vitalsTestData.updatedVitals.respiratoryRate);
    await vitalsPage.fillOxygenSaturation(vitalsTestData.updatedVitals.oxygenSaturation);
    await vitalsPage.fillBloodSugar(vitalsTestData.updatedVitals.bloodSugar);
    await vitalsPage.fillOptionalNotes(vitalsTestData.updatedVitals.notes);
    //   await vitalsPage.selectTemperatureMethodInEditMode(
    //   vitalsTestData.updatedVitals.temperatureMethod
    // );
    // await vitalsPage.selectPosition(vitalsTestData.updatedVitals.position);
    // await vitalsPage.selectOxygenFlow(vitalsTestData.updatedVitals.oxygenFlow);
    // await vitalsPage.selectBloodSugarTiming(vitalsTestData.updatedVitals.bloodSugarTiming);
    await vitalsPage.updateVitals();
    await vitalsPage.clickCrossVital();
    console.log('✅ Cross vitals clicked');

    // ============================================================
    // STEP 7: Verify Updated Card
    // ============================================================
    console.log('\n📋 STEP 7: Verifying Updated Vitals Card');
    console.log('-'.repeat(60));
    await page.waitForTimeout(2000);
    
    const updatedCardExists = await vitalsPage.verifyCardExists(vitalsTestData.updatedVitals.weight);
    expect(updatedCardExists).toBeTruthy();
    console.log('✅ Updated vitals card is visible');

    const updatedCardText = await vitalsPage.getCardText();
    expect(updatedCardText).toContain(vitalsTestData.updatedVitals.weight);
    console.log(`✅ Updated Card Content: ${updatedCardText?.replace(/\s+/g, ' ')}`);

    // ============================================================
    // STEP 8: Click Updated Card and Open Graph View Again
    // ============================================================
    console.log('\n📋 STEP 8: Opening Updated Card & Graph View');
    console.log('-'.repeat(60));
    await vitalsPage.clickVitalsCard();
    
    // Open Graph View
    await vitalsPage.openGraphView();

    // ============================================================
    // STEP 9: Verify Updated Graph Values
    // ============================================================
    console.log('\n📋 STEP 9: Verifying Updated Graph Data');
    console.log('-'.repeat(60));
    
    const updatedGraphDisplayed = await vitalsPage.verifyGraphDisplayed();
    expect(updatedGraphDisplayed).toBeTruthy();
    console.log('✅ Updated graph is displayed');

    const hasUpdatedGraphData = await vitalsPage.verifyGraphHasData();
    expect(hasUpdatedGraphData).toBeTruthy();
    console.log('✅ Updated graph contains data points');

    // Capture updated graph values
    const updatedGraphValues = await vitalsPage.captureGraphValues();
    console.log(`📊 Updated Graph Values: ${updatedGraphValues.join(', ')}`);

    // Get updated data point count
    const updatedDataPoints = await vitalsPage.getGraphDataPoints();
    console.log(`📊 Number of data points after update: ${updatedDataPoints}`);

    // Verify we have at least the same or more data points
    expect(updatedDataPoints).toBeGreaterThanOrEqual(initialDataPoints);
    console.log(`✅ Data points comparison: Initial=${initialDataPoints}, Updated=${updatedDataPoints}`);

    // Test frequencies again with updated data
    console.log('\n🔄 Testing Chart Frequencies with Updated Data:');
    await vitalsPage.selectChartFrequency(vitalsTestData.chartFrequencies.daily);
    await vitalsPage.verifyGraphHasData();
    
    await vitalsPage.selectChartFrequency(vitalsTestData.chartFrequencies.monthly);
    await vitalsPage.verifyGraphHasData();

    // Close graph view
    await vitalsPage.openGraphView();

    // ============================================================
    // STEP 10: Final Verification - Click Edit and Verify Updated Values
    // ============================================================
    console.log('\n📋 STEP 10: Final Verification - View Updated Values in Edit Mode');
    console.log('-'.repeat(60));
    await vitalsPage.clickEdit();

    // Verify all updated values in form
    const finalWeight = await vitalsPage.getWeightValue();
    const finalTemp = await vitalsPage.getTemperatureValue();
    const finalPulse = await vitalsPage.getPulseValue();
    const finalSystolic = await vitalsPage.getSystolicBPValue();
    const finalDiastolic = await vitalsPage.getDiastolicBPValue();

    expect(finalWeight).toBe(vitalsTestData.updatedVitals.weight);
    expect(finalTemp).toBe(vitalsTestData.updatedVitals.temperature);
    expect(finalPulse).toBe(vitalsTestData.updatedVitals.pulse);
    expect(finalSystolic).toBe(vitalsTestData.updatedVitals.systolicBP);

    console.log('✅ Final verified values in edit form:');
    console.log(`   Weight: ${finalWeight} lbs (Expected: ${vitalsTestData.updatedVitals.weight})`);
    console.log(`   Temperature: ${finalTemp}°F (Expected: ${vitalsTestData.updatedVitals.temperature})`);
    console.log(`   Pulse: ${finalPulse} bpm (Expected: ${vitalsTestData.updatedVitals.pulse})`);
    console.log(`   Systolic BP: ${finalSystolic} mmHg (Expected: ${vitalsTestData.updatedVitals.systolicBP})`);
    console.log(`   Diastolic BP: ${finalDiastolic} mmHg (Expected: ${vitalsTestData.updatedVitals.diastolicBP})`);

    // Click Cancel to close form
    await vitalsPage.clickCancel();
    console.log('✅ Clicked Cancel - form closed');

    // ============================================================
    // TEST SUMMARY
    // ============================================================
    console.log('\n' + '='.repeat(60));
    console.log('✅ COMPLETE VITALS VERIFICATION TEST PASSED!');
    console.log('='.repeat(60));
    console.log('Summary:');
    console.log('  ✓ Added initial vitals');
    console.log('  ✓ Verified initial card display');
    console.log('  ✓ Verified initial graph with data points');
    console.log('  ✓ Updated vitals with new values');
    console.log('  ✓ Verified updated card display');
    console.log('  ✓ Verified updated graph with data points');
    console.log('  ✓ All values correctly persisted');
    console.log('='.repeat(60) + '\n');
  });

  test('Add Vitals and Cancel Without Saving', async ({ page }) => {
    console.log('\n🏥 Testing Add Vitals Cancel Flow\n');

    // Open Add Vitals form
    await vitalsPage.clickAddVitals();
    
    // Fill partial data
    await vitalsPage.fillWeight('80');
    await vitalsPage.fillTemperature('98');
    
    // Cancel without saving
    await vitalsPage.clickCancel();
    console.log('✅ Cancelled without saving');

    // Verify no new card was created
    await page.waitForTimeout(1000);
    const cardExists = await vitalsPage.verifyCardExists('80');
    expect(cardExists).toBeFalsy();
    console.log('✅ Verified no card created after cancel');
  });

  test('Verify Multiple Graph Frequency Changes', async ({ page }) => {
    console.log('\n📊 Testing Multiple Graph Frequency Changes\n');

    // Add vitals first
    await vitalsPage.clickAddVitals();
    await vitalsPage.fillVitalsForm(vitalsTestData.initialVitals);
    await vitalsPage.saveVitals();
    await page.waitForTimeout(2000);

    // Click card and open graph
    await vitalsPage.clickVitalsCard();
    await vitalsPage.openGraphView();

    // Test all frequencies
    const frequencies = [
      vitalsTestData.chartFrequencies.daily,
      vitalsTestData.chartFrequencies.weekly,
      vitalsTestData.chartFrequencies.monthly,
      vitalsTestData.chartFrequencies.daily, // Go back to daily
    ];

    for (const frequency of frequencies) {
      console.log(`\n📊 Testing frequency: ${frequency}`);
      await vitalsPage.selectChartFrequency(frequency);
      
      const hasData = await vitalsPage.verifyGraphHasData();
      expect(hasData).toBeTruthy();
      console.log(`✅ ${frequency} view has data`);

      const values = await vitalsPage.captureGraphValues();
      console.log(`   Graph values: ${values.join(', ')}`);
    }

    console.log('\n✅ All frequency changes verified successfully');
  });
});