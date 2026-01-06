// pages/MoveInPage.ts

import { Page, Locator } from '@playwright/test';

export class MoveInPage {
    readonly page: Page;
    readonly pageTitle: Locator;
    readonly addMoveInButton: Locator;
    readonly moveInTable: Locator;

    constructor(page: Page) {
        this.page = page;
        this.pageTitle = page.getByRole('heading', { name: 'Move-ins' });
        this.addMoveInButton = page.getByRole('button', { name: 'Add Move-in' });
        this.moveInTable = page.locator('table, [role="table"]');
    }

    async clickAddMoveIn(): Promise<void> {
        await this.addMoveInButton.click();
    }

    async waitForPageLoad(): Promise<void> {
        await this.page.waitForLoadState('networkidle');
        await this.pageTitle.waitFor({ state: 'visible' });
    }

    // Check if entry is displayed in list
    async isEntryDisplayedInList(firstName: string, lastName: string): Promise<boolean> {
        const fullName = `${firstName} ${lastName}`;
        console.log(`🔎 Checking if "${fullName}" is displayed in the list...`);
        
        // Wait for table to be visible
        await this.page.waitForSelector('tbody tr', { timeout: 5000 });
        await this.page.waitForTimeout(1000);
        
        // Try multiple ways to find the entry
        const selectors = [
            this.page.getByText(fullName, { exact: false }),
            this.page.getByText(firstName, { exact: false }),
            this.page.locator(`td:has-text("${firstName}")`),
            this.page.locator(`tr:has-text("${firstName}"):has-text("${lastName}")`),
            this.page.locator(`tbody tr:has-text("${firstName}")`),
        ];

        for (const selector of selectors) {
            try {
                const count = await selector.count();
                if (count > 0) {
                    console.log(`   ✅ Found entry in the list`);
                    return true;
                }
            } catch (error) {
                // Continue to next selector
            }
        }

        console.log(`   ❌ Entry not found`);
        return false;
    }

    // Click on entry in the list
    async clickOnEntry(firstName: string, lastName: string): Promise<boolean> {
        const fullName = `${firstName} ${lastName}`;
        console.log(`🖱️  Attempting to click on: ${fullName}`);
        
        try {
            // Wait a bit for any animations to complete
            await this.page.waitForTimeout(500);
            
            // Try to find and click the name in the table
            const nameSelectors = [
                this.page.getByText(fullName, { exact: false }),
                this.page.locator(`td:has-text("${firstName}"):has-text("${lastName}")`),
                this.page.locator(`tbody tr:has-text("${firstName}") td`).first(),
            ];

            for (const selector of nameSelectors) {
                try {
                    const count = await selector.count();
                    if (count > 0) {
                        console.log(`   Found element, clicking...`);
                        await selector.first().click();
                        console.log(`   ✅ Clicked successfully`);
                        return true;
                    }
                } catch (error) {
                    // Continue to next selector
                }
            }

            console.log(`   ❌ Could not find clickable element`);
            return false;
        } catch (error) {
            console.log(`   ❌ Error: ${error}`);
            return false;
        }
    }
}