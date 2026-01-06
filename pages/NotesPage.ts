import { Page, Locator } from '@playwright/test';

export class NotesPage {
  readonly page: Page;
  
  // Locators
  readonly notesTab: Locator;
  readonly addNoteButton: Locator;
  readonly addNoteInput: Locator;
  readonly saveNoteButton: Locator;

  constructor(page: Page) {
    this.page = page;
    
    // More specific selector for Notes tab in the detail page (not main navigation)
    this.notesTab = this.page.getByText('Notes', { exact: true }).first();
    
    this.addNoteButton = page.locator('button:has-text("Add Note")').first();
    this.addNoteInput = page.getByPlaceholder('Add Note');
    this.saveNoteButton = page.locator('button:has-text("Add Note")').last();
  }

  // Get tag button dynamically
  getTagButton(tagName: string): Locator {
    return this.page.getByRole('button', { name: tagName });
  }

  // Navigate to Notes tab
  async navigateToNotes() {

    await this.notesTab.waitFor({ state: 'visible', timeout: 3000 });
    await this.notesTab.click();

  }

  // Click Add Note button
  async clickAddNote() {
    await this.addNoteButton.click();
    await this.page.waitForTimeout(1000);
  }

  // Fill note text
  async addNote(noteText: string) {
    await this.addNoteInput.fill(noteText);
    await this.page.waitForTimeout(500);
  }

  // Select tags
  async tagNote(tags: string[]) {
    for (const tag of tags) {
      await this.getTagButton(tag).click();
      await this.page.waitForTimeout(300);
    }
  }

  // Save the note
  async saveNote() {
    await this.saveNoteButton.click();
    await this.page.waitForTimeout(2000);
  }

  // Combined method
  async createNoteWithTags(noteText: string, tags: string[]) {
    await this.clickAddNote();
    await this.addNote(noteText);
    await this.tagNote(tags);
    await this.saveNote();
  }

  // Verify note exists
    async verifyNoteExists(noteText: string): Promise<boolean> {
    await this.page.waitForTimeout(1500);
    
    // Scroll to TOP of page (new notes appear at top)
    await this.page.evaluate(() => {
      window.scrollTo(0, 0);
    });
    await this.page.waitForTimeout(500);
    
    // Get the FIRST matching locator (newest note at top)
    const noteLocator = this.page.getByText(noteText).first();
    
    // Scroll to the element
    await noteLocator.scrollIntoViewIfNeeded();
    await this.page.waitForTimeout(500);
    
    return await noteLocator.isVisible();
  }     
}