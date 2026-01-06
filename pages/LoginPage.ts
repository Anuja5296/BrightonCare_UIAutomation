// pages/LoginPage.ts

import { Page, Locator } from '@playwright/test';

export class LoginPage {
    readonly page: Page;
    readonly usernameInput: Locator;
    readonly passwordInput: Locator;
    readonly loginButton: Locator;
    readonly usernameError: Locator;
    readonly passwordError: Locator;
    readonly generalError: Locator;

    constructor(page: Page) {
        this.page = page;
        
        // Input fields
        this.usernameInput = page.getByRole('textbox', { name: 'Username' });
        this.passwordInput = page.getByRole('textbox', { name: 'Password' });
        this.loginButton = page.getByRole('button', { name: 'Login' });
        
        // Error messages - inline validation
        this.usernameError = page.getByText(/username is required/i);
        this.passwordError = page.getByText(/password must be at least|password is required/i);
        
        // General error - for "Account locked" or "Invalid credentials"
        this.generalError = page.getByText(/account locked|invalid|incorrect|failed/i);
    }

    // Navigate to login page
    async navigate(url: string): Promise<void> {
        await this.page.goto(url);
    }

    // Fill username field
    async fillUsername(username: string): Promise<void> {
        await this.usernameInput.fill(username);
    }

    // Fill password field
    async fillPassword(password: string): Promise<void> {
        await this.passwordInput.fill(password);
    }

    // Click login button
    async clickLogin(): Promise<void> {
        await this.loginButton.click();
    }

    // Complete login action
    async login(username: string, password: string): Promise<void> {
        await this.fillUsername(username);
        await this.fillPassword(password);
        await this.clickLogin();
    }

    // Check if username error is visible
    async isUsernameErrorVisible(): Promise<boolean> {
        try {
            await this.usernameError.waitFor({ state: 'visible', timeout: 5000 });
            return true;
        } catch {
            return false;
        }
    }

    // Check if password error is visible
    async isPasswordErrorVisible(): Promise<boolean> {
        try {
            await this.passwordError.waitFor({ state: 'visible', timeout: 5000 });
            return true;
        } catch {
            return false;
        }
    }

    // Check if general error (invalid credentials, account locked) is visible
    async isGeneralErrorVisible(): Promise<boolean> {
        try {
            await this.generalError.waitFor({ state: 'visible', timeout: 5000 });
            return true;
        } catch {
            return false;
        }
    }

    // Check if ANY error message is visible
    async isAnyErrorVisible(): Promise<boolean> {
        return (await this.isUsernameErrorVisible()) || 
               (await this.isPasswordErrorVisible()) || 
               (await this.isGeneralErrorVisible());
    }

    // Get username error text
    async getUsernameError(): Promise<string | null> {
        try {
            const text = await this.usernameError.textContent();
            return text?.trim() || null;
        } catch {
            return null;
        }
    }

    // Get password error text
    async getPasswordError(): Promise<string | null> {
        try {
            const text = await this.passwordError.textContent();
            return text?.trim() || null;
        } catch {
            return null;
        }
    }

    // Get general error text
    async getGeneralError(): Promise<string | null> {
        try {
            const text = await this.generalError.textContent();
            return text?.trim() || null;
        } catch {
            return null;
        }
    }

    // Wait for page to load
    async waitForPageLoad(): Promise<void> {
        // await this.page.waitForLoadState('networkidle');
    }
}