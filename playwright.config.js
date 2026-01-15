import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './integration/e2e_tests',
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: 'html',
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Base URL to use in actions like `await page.goto('/')`. */
    baseURL: process.env.HOST ? `https://${process.env.HOST}` : 'http://localhost:4001',
    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'on-first-retry',
    /* Record screenshot on failure in CI */
    screenshot: process.env.CI ? 'only-on-failure' : 'off',
  },
  /* set the expect timeout to 5s */
  expect: { timeout: 5000 },
  /* Configure projects for major browsers */
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'], channel: 'chromium' },
    },
    {
      name: 'Mobile Chrome',
      testMatch: /mobile-app-banner.spec.js/,
      use: { ...devices['Pixel 7'] },
    },
    {
      name: 'Mobile Safari',
      testMatch: /mobile-app-banner.spec.js/,
      use: { ...devices['iPhone SE'] },
    }
  ]
});
