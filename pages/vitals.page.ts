import { Page, Locator } from '@playwright/test';

export class VitalsPage {
  readonly page: Page;
  
  // Buttons
  readonly addVitalsButton: Locator;
  readonly saveButton: Locator;
  readonly updateVitalsButton: Locator;
  readonly editButton: Locator;
  readonly cancelButton: Locator;
  readonly crossvital: Locator;

  
  // Input Fields
  readonly weightInput: Locator;
  readonly temperatureInput: Locator;
  readonly pulseInput: Locator;
  readonly systolicBPInput: Locator;
  readonly diastolicBPInput: Locator;
  readonly respiratoryRateInput: Locator;
  readonly oxygenSaturationInput: Locator;
  readonly bloodSugarInput: Locator;
  readonly optionalNotesInput: Locator;
  
  // Dropdowns
  readonly temperatureMethodDropdown: Locator;
  readonly positionDropdown: Locator;
  readonly oxygenFlowDropdown: Locator;
  readonly bloodSugarTimingDropdown: Locator;
  
  // Cards and Graph
  readonly vitalsHistorySection: Locator;
  readonly vitalsCard: Locator;
  readonly graphViewButton: Locator;
  readonly chartCircle: Locator;
  readonly chartFrequencyDropdown: Locator;
  readonly graphContainer: Locator;

  constructor(page: Page) {
    this.page = page;
    
    // Buttons
    this.addVitalsButton = page.getByRole('button', { name: 'Add Vitals' });
    this.saveButton = page.getByRole('button', { name: 'Save' });
    this.updateVitalsButton = page.getByRole('button', { name: 'Update Vitals' });
    this.editButton = page.getByRole('button', { name: 'Edit' });
    this.cancelButton = page.getByRole('button', { name: 'Cancel' });
    this.crossvital= page.locator('svg path[d="M6 6L18 18"]');

    
    // Input Fields
    this.weightInput = page.getByPlaceholder('Enter Weight');
    this.temperatureInput = page.getByPlaceholder('Enter Temperature');
    this.pulseInput = page.getByPlaceholder('Enter Pulse');
    this.systolicBPInput = page.getByPlaceholder('120');
    this.diastolicBPInput = page.getByPlaceholder('80');
    this.respiratoryRateInput = page.getByPlaceholder('Enter Respiratory Rate');
    this.oxygenSaturationInput = page.getByPlaceholder('Enter Oxygen Saturation');
    this.bloodSugarInput = page.getByPlaceholder('Enter Blood Sugar');
    this.optionalNotesInput = page.getByRole('textbox', { name: 'Optional Notes' });
    
    // Dropdowns
    const allComboboxes = page.locator('button[role="combobox"]');
    this.temperatureMethodDropdown = allComboboxes.nth(0);
    this.positionDropdown = allComboboxes.nth(1);
    this.oxygenFlowDropdown = allComboboxes.nth(2);
    this.bloodSugarTimingDropdown = allComboboxes.nth(3);
    
    // Cards and Graph
    this.vitalsHistorySection = page.getByLabel('Vitals History');
    this.vitalsCard = page.locator('[data-slot="card"]').first();
    this.graphViewButton = page.locator('circle').nth(3);
    this.chartFrequencyDropdown = page.getByRole('combobox');
    this.chartCircle = page.locator('circle').nth(3);
    this.graphContainer = page.locator('svg').first();
  }

  // Navigation
  async clickAddVitals() {
    await this.addVitalsButton.click();
    await this.page.waitForTimeout(1000);
  }

  // Fill Methods
  async fillWeight(weight: string) {
    await this.weightInput.click();
    await this.weightInput.fill(weight);
  }

  async fillTemperature(temperature: string) {
    await this.temperatureInput.click();
    await this.temperatureInput.fill(temperature);
  }

  async selectTemperatureMethod(method: string) {
    await this.temperatureMethodDropdown.click();
    await this.page.waitForTimeout(1000);
    await this.page.getByLabel(method).getByText(method).click();
    await this.page.waitForTimeout(500);
  }

  async selectTemperatureMethodInEditMode(method: string) {
  console.log('⚠️ Forcing temperature method selection in EDIT mode');

  const dropdown = this.page.getByLabel('Temperature Method', { exact: true });

  await dropdown.scrollIntoViewIfNeeded();
  await dropdown.click({ force: true });

  const option = this.page.getByRole('option', {
    name: method,
    exact: true
  });

  await option.waitFor({ state: 'visible', timeout: 5000 });
  await option.click({ force: true });

  await this.page.waitForTimeout(500);
}

  async fillPulse(pulse: string) {
    await this.pulseInput.click();
    await this.pulseInput.fill(pulse);
  }

  async fillBloodPressure(systolic: string, diastolic: string) {
    await this.systolicBPInput.click();
    await this.systolicBPInput.fill(systolic);
    await this.diastolicBPInput.click();
    await this.diastolicBPInput.fill(diastolic);
  }

  async selectPosition(position: string) {
    await this.positionDropdown.click();
    await this.page.waitForTimeout(1000);
    await this.page.getByRole('option', { name: position }).click();
    await this.page.waitForTimeout(500);
  }

  async fillRespiratoryRate(rate: string) {
    await this.respiratoryRateInput.click();
    await this.respiratoryRateInput.fill(rate);
  }

  async fillOxygenSaturation(saturation: string) {
    await this.oxygenSaturationInput.click();
    await this.oxygenSaturationInput.fill(saturation);
  }

  async selectOxygenFlow(flow: string) {
    await this.oxygenFlowDropdown.click();
    await this.page.waitForTimeout(1000);
    await this.page.getByRole('option', { name: flow }).click();
    await this.page.waitForTimeout(500);
  }

  async fillBloodSugar(sugar: string) {
    await this.bloodSugarInput.click();
    await this.bloodSugarInput.fill(sugar);
  }

  async selectBloodSugarTiming(timing: string) {
    await this.bloodSugarTimingDropdown.click();
    await this.page.waitForTimeout(1000);
    await this.page.getByRole('option', { name: timing }).click();
    await this.page.waitForTimeout(500);
  }

  async fillOptionalNotes(notes: string) {
    await this.optionalNotesInput.click();
    await this.optionalNotesInput.fill(notes);
  }

  // Complete Form Fill
  async fillVitalsForm(data: any) {
    console.log('📝 Filling vitals form...');
    
    await this.fillWeight(data.weight);
    await this.fillTemperature(data.temperature);
    await this.selectTemperatureMethod(data.temperatureMethod);
    await this.fillPulse(data.pulse);
    await this.fillBloodPressure(data.systolicBP, data.diastolicBP);
    await this.selectPosition(data.position);
    await this.fillRespiratoryRate(data.respiratoryRate);
    await this.fillOxygenSaturation(data.oxygenSaturation);
    await this.selectOxygenFlow(data.oxygenFlow);
    await this.fillBloodSugar(data.bloodSugar);
    await this.selectBloodSugarTiming(data.bloodSugarTiming);
    await this.fillOptionalNotes(data.notes);
    await this.selectTemperatureMethod(data.temperatureMethod);
    
    console.log('✅ Form filled');
  }

  // Actions
  async saveVitals() {
    await this.saveButton.click();
    await this.page.waitForTimeout(2000);
    console.log('✅ Vitals saved');
  }

  async updateVitals() {
    await this.updateVitalsButton.click();
    await this.page.waitForTimeout(2000);
    console.log('✅ Vitals updated');
  }

  async clickCrossVital() {
  console.log('⚠️ Clicking cross (✖) to close vitals or remove entry');
  await this.crossvital.scrollIntoViewIfNeeded();
  await this.crossvital.click({ force: true });
  await this.page.waitForTimeout(500);
}


  // Card Interactions

  async clickVitalsCard() {
  await this.page.waitForLoadState('networkidle');

  // Find the card that contains "Weight:" (ignores the actual number)
  const vitalsCard = this.page
    .getByText(/Weight:/i)
    .first()
    .locator('..') // go to parent
    .locator('..'); // maybe card container

  await vitalsCard.waitFor({ state: 'visible' });

  // Real user click
  await vitalsCard.hover();
  await this.page.mouse.down();
  await this.page.mouse.up();

  console.log('✅ Vitals card clicked (real user click)');
}

// async clickVitalsCard() {
//   await this.page.waitForLoadState('networkidle');

//   const vitalsCard = this.page
//     .getByText(/Weight:\s*75\s*lbs/i)
//     .first()
//     .locator('..')
//     .locator('..');

//   await vitalsCard.waitFor({ state: 'visible' });

//   // 👇 THIS is the key difference
//   await vitalsCard.hover();
//   await this.page.mouse.down();
//   await this.page.mouse.up();

//   console.log('✅ Vitals card clicked (real user click)');
// }


  async verifyCardExists(weight: string) {
  try {
    // Search for the weight value with units as it appears in the UI
    const weightText = `${weight} lbs`;
    const isVisible = await this.page
      .getByText(weightText)
      .first()
      .isVisible({ timeout: 5000 });
    return isVisible;
  } catch (error) {
    return false;
  }
}

async getCardText() {
  return await this.page.locator('.flex.flex-col').filter({ hasText: 'Weight' }).first().textContent();
}

  async getAllCardsData() {
    const cards = await this.vitalsHistorySection.locator('[class*="card"]').all();
    const cardsData = [];
    
    for (const card of cards) {
      const text = await card.textContent();
      cardsData.push(text);
    }
    
    return cardsData;
  }

  // Graph Interactions
  async openGraphView() {
    await this.graphViewButton.click();
    await this.page.waitForTimeout(5000);
    console.log('✅ Graph view toggled');
  }

  async selectChartFrequency(frequency: string) {
    await this.chartFrequencyDropdown.click();
    await this.page.getByRole('option', { name: frequency }).click();
    await this.page.waitForTimeout(1000);
    console.log(`✅ Chart frequency changed to ${frequency}`);
  }

  async verifyGraphDisplayed() {
    const graphVisible = await this.page.locator('circle').first().isVisible();
    return graphVisible;
  }

  async prepareGraphView() {
  // 1️⃣ Scroll to bottom to ensure graph is in view
  await this.page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  console.log('⬇️ Page scrolled to bottom');

  // 2️⃣ Reduce viewport scale to 70% for better visibility
  const currentSize = this.page.viewportSize();
  if (currentSize) {
    await this.page.setViewportSize({
      width: Math.floor(currentSize.width * 0.7),
      height: Math.floor(currentSize.height * 0.7),
    });
    console.log('🔍 Viewport scaled to 70%');
  } else {
    console.warn('⚠️ Unable to get current viewport size');
  }
}

  async getGraphDataPoints() {
    // Get all circle elements that represent data points
    const circles = await this.page.locator('circle[r="4"], circle[r="5"], circle[r="6"]').all();
    console.log(`📊 Found ${circles.length} data points in graph`);
    return circles.length;
  }

  async getGraphAxisLabels() {
    // Get text elements from the graph
    const labels = await this.page.locator('svg text').allTextContents();
    console.log('📊 Graph labels:', labels);
    return labels;
  }

  async verifyGraphHasData() {
    await this.page.waitForTimeout(1000);
    
    // Check if graph has any data points (circles, paths, or bars)
    const hasCircles = await this.page.locator('svg circle').count() > 0;
    const hasPaths = await this.page.locator('svg path[stroke]').count() > 0;
    const hasLines = await this.page.locator('svg line').count() > 0;
    
    const hasData = hasCircles || hasPaths || hasLines;
    console.log(`📊 Graph has data: ${hasData} (Circles: ${hasCircles}, Paths: ${hasPaths}, Lines: ${hasLines})`);
    
    return hasData;
  }

  async captureGraphValues() {
    // Capture visible text in the graph area
    const graphText = await this.page.locator('svg').first().allTextContents();
    console.log('📊 Graph values captured:', graphText);
    return graphText;
  }

  // Edit Actions
async clickEdit() {
  // Click the first edit button in the Action column
  await this.page.locator('tbody tr').first().locator('button').first().click();
  await this.page.waitForTimeout(1000);
  console.log('✅ Edit clicked');
}
  async clickCancel() {
    await this.cancelButton.click();
    await this.page.waitForTimeout(1000);
    console.log('✅ Cancel clicked');
  }

  // Verification Methods
  async getWeightValue() {
    return await this.weightInput.inputValue();
  }

  async getTemperatureValue() {
    return await this.temperatureInput.inputValue();
  }

  async getPulseValue() {
    return await this.pulseInput.inputValue();
  }

  async getSystolicBPValue() {
    return await this.systolicBPInput.inputValue();
  }

  async getDiastolicBPValue() {
    return await this.diastolicBPInput.inputValue();
  }

  async getRespiratoryRateValue() {
    return await this.respiratoryRateInput.inputValue();
  }

  async getOxygenSaturationValue() {
    return await this.oxygenSaturationInput.inputValue();
  }

  async getBloodSugarValue() {
    return await this.bloodSugarInput.inputValue();
  }
}