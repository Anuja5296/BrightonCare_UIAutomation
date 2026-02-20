import { defineConfig, devices } from '@playwright/test';

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// import dotenv from 'dotenv';
// import path from 'path';
// dotenv.config({ path: path.resolve(__dirname, '.env') });

/**
 * See https://playwright.dev/docs/test-configuration.
 *
 */



import * as fs from 'fs';

// Check if auth file exists
const authFile = 'auth-state.json';
const useAuth = fs.existsSync(authFile);


export default defineConfig({
  testDir: './tests',
  /* Run tests in files in parallel */
  fullyParallel: false,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  // workers: process.env.CI ? 1 : undefined,
   workers: 1,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  timeout: 120000,

  // globalSetup: useAuth ? undefined : './global-setup.ts', // Run setup only if needed
    
  // globalSetup: './global-setup.ts',
  // Run tests in specific order
 // Replace the testMatch section with:
testMatch: [
  // 'tests/login.spec.ts',
  'tests/1-movein.spec.ts',
  'tests/2-EditProfileDetails.spec.ts',
  'tests/3-notes.spec.ts',
  'tests/4-incident.spec.ts',
  'tests/5-vitals.spec.ts'
],

  reporter: [
    ['html'],
    ['list']
  ],

  
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Base URL to use in actions like `await page.goto('')`. */
    // baseURL: 'http://localhost:3000',

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
  
    headless: false,
    // storageState: 'auth-state.json', // Login only once
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    trace: 'on-first-retry',
        
    // Only use storageState if file exists
    ...(useAuth && { storageState: authFile }),
    viewport: { width: 1900, height: 1080 }, 


    
  },

  
  /* Configure projects for major browsers */
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },

    

    // {
    //   name: 'firefox',
    //   use: { ...devices['Desktop Firefox'] },
    // },

    // {
    //   name: 'webkit',
    //   use: { ...devices['Desktop Safari'] },
    // },

    /* Test against mobile viewports. */
    // {
    //   name: 'Mobile Chrome',
    //   use: { ...devices['Pixel 5'] },
    // },
    // {
    //   name: 'Mobile Safari',
    //   use: { ...devices['iPhone 12'] },
    // },

    /* Test against branded browsers. */
    // {
    //   name: 'Microsoft Edge',
    //   use: { ...devices['Desktop Edge'], channel: 'msedge' },
    // },
    // {
    //   name: 'Google Chrome',
    //   use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    // },
  ],

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://localhost:3000',
  //   reuseExistingServer: !process.env.CI,
  // },


  
});
