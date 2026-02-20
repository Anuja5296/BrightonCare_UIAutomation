import { Page, Locator } from '@playwright/test';
import { IncidentData } from '../test-data/Incident';

export class IncidentPage {
  readonly page: Page;
  
  // Locator declarations
  readonly incidentsButton: Locator;
  readonly addIncidentButton: Locator;
  readonly incidentDescriptionInput: Locator;
  readonly locationInput: Locator;
  readonly injuriesInput: Locator;
  readonly witnessNameInput: Locator;
  readonly reportedByCombobox: Locator;
  readonly nurseProgressInput: Locator;
  readonly notifyResponsiblePersonSwitch: Locator;
  readonly saveIncidentButton: Locator;
  readonly commentButton: Locator;
  readonly addDocumentsButton: Locator;
  readonly uploadButton: Locator;
  readonly markAsClosedButton: Locator;
  readonly clickToUploadButton: Locator;
  readonly commentTextbox: Locator;
  readonly submitCommentButton: Locator;
  readonly canvas: Locator;
  readonly firstAidNoRadio: Locator;
  readonly transportedNoRadio: Locator;
  readonly fileInput: Locator;

  constructor(page: Page) {
    this.page = page;
    
    // Initialize all locators
    this.incidentsButton = page.getByRole('button', { name: 'Incidents', exact: true });
    this.addIncidentButton = page.getByRole('button', { name: 'Add Incident' });
    this.incidentDescriptionInput = page.getByRole('textbox', { name: 'Incident Description*' });
    this.locationInput = page.locator('input[name="location"]');
    this.injuriesInput = page.getByRole('textbox', { name: 'Enter Injuries' });
    this.witnessNameInput = page.getByRole('textbox', { name: 'Enter Name' });
    this.reportedByCombobox = page.getByRole('combobox');
    this.nurseProgressInput = page.locator('input[name="nurseProgress"]');
    this.notifyResponsiblePersonSwitch = page.getByRole('switch', { name: 'Notify Responsible Person' });
    this.saveIncidentButton = page.getByRole('button', { name: 'Save Incident' });
    this.commentButton = page.locator('button:has-text("Comment")');
    this.addDocumentsButton = page.getByRole('button', { name: 'Add Documents' });
    this.uploadButton = page.getByRole('button', { name: 'Upload', exact: true });
    this.markAsClosedButton = page.getByRole('button', { name: 'Mark as Closed' });
    this.clickToUploadButton = page.getByRole('button', { name: 'Click to upload' });
    this.commentTextbox = page.getByPlaceholder('Add comment here…');
    this.submitCommentButton = page.getByRole('button', { name: 'Submit' });
    this.canvas = page.locator('canvas');
    this.firstAidNoRadio = page.locator('label[for="firstAid-false"]');
    this.transportedNoRadio = page.locator('label[for="transported-false"]:has-text("No")');
    this.fileInput = page.locator('input[type="file"]');
  }

  async navigateToAddIncident(): Promise<void> {
    await this.incidentsButton.click();
    await this.addIncidentButton.click();
  }

  async fillIncidentDescription(description: string): Promise<void> {
    await this.incidentDescriptionInput.click();
    await this.incidentDescriptionInput.fill(description);
  }

  async selectIncidentType(incidentType: string): Promise<void> {
    await this.page.getByRole('button', { name: incidentType }).click();
  }

  async selectMultipleIncidentTypes(types: string[]): Promise<void> {
    for (const type of types) {
      await this.page.getByRole('button', { name: type }).click();
    }
  }

  // async selectIncidentDate(dateButtonText: string, dayButtonText: string): Promise<void> {
  //   await this.page.getByRole('button', { name: dateButtonText }).click();
  //   await this.page.getByRole('button', { name: dayButtonText }).click();
  // }

  async fillLocation(location: string): Promise<void> {
    await this.locationInput.click();
    await this.locationInput.fill(location);
  }

  async fillInjuries(injuries: string): Promise<void> {
    await this.injuriesInput.click();
    await this.injuriesInput.fill(injuries);
  }

  async fillWitnessName(witnessName: string): Promise<void> {
    await this.witnessNameInput.click();
    await this.witnessNameInput.fill(witnessName);
  }

  async selectFirstAidNo(): Promise<void> {
    await this.firstAidNoRadio.click();
  }

  async selectReportedByFirst(): Promise<void> {
    await this.reportedByCombobox.click();
    await this.page.waitForTimeout(1000);
    await this.page.getByRole('option').first().click();
  }

  async selectReportedBy(reportedBy: string): Promise<void> {
    await this.reportedByCombobox.click();
    await this.page.getByRole('option', { name: reportedBy }).click();
  }

  async setTransportedNo(): Promise<void> {
    await this.transportedNoRadio.click();
  }

  async fillNurseProgress(nurseProgress: string): Promise<void> {
    await this.nurseProgressInput.click();
    await this.nurseProgressInput.fill(nurseProgress);
  }

  async toggleNotifyResponsiblePerson(): Promise<void> {
    await this.notifyResponsiblePersonSwitch.click();
  }

  async uploadImage(filePath?: string): Promise<void> {
    const defaultFile = "C:\\Users\\LNV-56\\Downloads\\Risk-Acknowledgement.pdf";
    const fileToUpload = filePath || defaultFile;
    
    const fileChooserPromise = this.page.waitForEvent('filechooser');
    await this.clickToUploadButton.click();
    const fileChooser = await fileChooserPromise;
    await fileChooser.setFiles(fileToUpload);
  }

  async addSignatureOnCanvas(signaturePositions: Array<{ x: number; y: number }>): Promise<void> {
    for (const position of signaturePositions) {
      await this.canvas.click({ position });
    }
  }

  async saveIncident(): Promise<void> {
    await this.saveIncidentButton.click();
  }

  async addComment(comment: string): Promise<void> {
    await this.commentButton.scrollIntoViewIfNeeded();
    await this.commentButton.click();
    await this.page.waitForTimeout(1500);
    
    // Wait for the textbox to be visible
    await this.commentTextbox.waitFor({ state: 'visible', timeout: 5000 });
    
    // Fill comment
    await this.commentTextbox.fill(comment);
    await this.page.waitForTimeout(500);
    
    // Click submit
    await this.submitCommentButton.click();
  }

  async uploadDocument(filePath?: string): Promise<void> {
    const defaultFile = "C:\\Users\\LNV-56\\Downloads\\Risk-Acknowledgement.pdf";
    const fileToUpload = filePath || defaultFile;
    
    await this.addDocumentsButton.click();
    await this.page.waitForTimeout(500);
    
    // Use file input for upload
    await this.fileInput.last().setInputFiles(fileToUpload);
    
    await this.uploadButton.click();
  }

  async markAsClosed(): Promise<void> {
    await this.markAsClosedButton.click();
  }
}