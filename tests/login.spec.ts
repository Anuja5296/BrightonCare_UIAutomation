// tests/login.spec.ts

import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { testData } from '../test-data/credentials';

test.describe('Login Functionality', () => {
    let loginPage: LoginPage;

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        await loginPage.navigate(testData.baseURL);
    });


    test('TC-L001: Verify login page elements are visible', async ({ page }) => {
        // ASSERT: All login form elements should be visible
        await expect(loginPage.usernameInput).toBeVisible();
        await expect(loginPage.passwordInput).toBeVisible();
        await expect(loginPage.loginButton).toBeVisible();
    }); 

    test('TC-L002: Verify successful login with valid credentials', async ({ page }) => {
        // ACT: Login with valid credentials
        await loginPage.login(testData.validUser.email, testData.validUser.password);
        await loginPage.waitForPageLoad();

        // ASSERT: Should navigate to move-in or dashboard page
        await expect(page).toHaveURL(/move-in|dashboard/);
    });

    test('TC-L003: Verify login fails with invalid credentials', async ({ page }) => {
        // ACT: Login with invalid credentials
        await loginPage.login(testData.invalidUser.email, testData.invalidUser.password);
        
        // Wait for error to appear
        await page.waitForTimeout(2000);
        
        // ASSERT: General error should be visible
        const hasError = await loginPage.isGeneralErrorVisible();
        expect(hasError, 'Error message should be visible for invalid credentials').toBeTruthy();
        
        // Get and log error text
        const errorText = await loginPage.getGeneralError();

        
        // Verify error contains expected keywords
        expect(errorText).toMatch(/account locked|invalid|incorrect|failed/i);
        
        // ASSERT: Should stay on login page
        await expect(page).toHaveURL(/login/);
    });

    // test('TC-L003: Verify login fails with empty username', async ({ page }) => {
    //     // ACT: Try to login with empty username
    //     await loginPage.login('', testData.validUser.password);
        
    //     // ASSERT: Username error should be visible
    //     const hasUsernameError = await loginPage.isUsernameErrorVisible();
    //     expect(hasUsernameError, 'Username required error should be visible').toBeTruthy();
        
    //     // Get and verify error text
    //     const errorText = await loginPage.getUsernameError();
        
    //     expect(errorText).toMatch(/username is required/i);
        
    //     // ASSERT: Should stay on login page
    //     await expect(page).toHaveURL(/login/);
    // });

    // test('TC-L004: Verify login fails with empty password', async ({ page }) => {
    //     // ACT: Try to login with empty password
    //     await loginPage.login(testData.validUser.email, '');
        
    //     // ASSERT: Password error should be visible
    //     const hasPasswordError = await loginPage.isPasswordErrorVisible();
    //     expect(hasPasswordError, 'Password required error should be visible').toBeTruthy();
        
    //     // Get and verify error text
    //     const errorText = await loginPage.getPasswordError();
    
    //     expect(errorText).toMatch(/password must be at least|password is required/i);
        
    //     // ASSERT: Should stay on login page
    //     await expect(page).toHaveURL(/login/);
    // });

    // test('TC-L005: Verify password must be at least 8 characters', async ({ page }) => {
    //     // ACT: Try to login with short password
    //     await loginPage.login(testData.validUser.email, 'short');
        
    //     // ASSERT: Password length error should be visible
    //     const hasPasswordError = await loginPage.isPasswordErrorVisible();
    //     expect(hasPasswordError, 'Password length error should be visible').toBeTruthy();
        
    //     // Get and verify error text
    //     const errorText = await loginPage.getPasswordError();
        
    //     expect(errorText).toContain('8 characters');
        
    //     // ASSERT: Should stay on login page
    //     await expect(page).toHaveURL(/login/);
    // });

    
});