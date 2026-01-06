import { test, expect } from '@playwright/test';
import { NotesPage } from '../pages/NotesPage';
import { LoginPage } from '../pages/LoginPage';
import { notesTestData } from '../test-data/NoteandVital';
import { testData } from '../test-data/credentials';
import * as fs from 'fs';

test('Add note with tags', async ({ page }) => {
  console.log('TEST: ADD NOTE WITH TAGS');
  
  // Login
  const authExists = fs.existsSync('auth-state.json');
  
  if (!authExists) {
    console.log('🔐 Logging in...');
    const loginPage = new LoginPage(page);
    await loginPage.navigate(testData.baseURL);
    await loginPage.login(testData.validUser.email, testData.validUser.password);
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

  // Initialize NotesPage and navigate to Notes tab
  const notesPage = new NotesPage(page);
  
  console.log('📍 Clicking Notes tab...');
  await notesPage.navigateToNotes();
  
  // Verify URL changed to notes section
  await page.waitForURL('**/notes');
  console.log('✅ Notes tab opened\n');

  // Add note with tags
  console.log('📝 Adding note...');
  await notesPage.createNoteWithTags(
    notesTestData.validNote.noteText,
    notesTestData.validNote.tags
  );
  console.log('✅ Note added\n');
  
  // Verify note
  console.log('🔍 Verifying note...');
  const isVisible = await notesPage.verifyNoteExists(notesTestData.validNote.noteText);
  expect(isVisible).toBeTruthy();
  console.log('✅ Test completed\n');
});