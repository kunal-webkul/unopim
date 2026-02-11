const { defineConfig, devices } = require('@playwright/test');
const path = require('path');

const STORAGE_STATE = path.resolve(__dirname, '.state/admin-auth.json');

module.exports = defineConfig({
  testDir: './tests',

  // Run test files in parallel (safe for DB-based apps)
  fullyParallel: false,

  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,

  // GitHub runner has 2 cores
  workers: process.env.CI ? 2 : undefined,

  timeout: 60 * 1000,
  expect: {
    timeout: 10 * 1000,
  },

  reporter: process.env.CI
    ? [['dot'], ['html', { outputFolder: 'playwright-report', open: 'never' }]]
    : [['list'], ['html', { outputFolder: 'playwright-report' }]],

  globalSetup: require.resolve('./global-setup.js'),

  use: {
    baseURL: process.env.UNOPIM_URL || 'http://127.0.0.1:8000',

    storageState: STORAGE_STATE,

    // 🚀 Speed optimizations
    headless: true,
    screenshot: 'only-on-failure',
    video: process.env.CI ? 'off' : 'retain-on-failure',
    trace: process.env.CI ? 'retain-on-failure' : 'on-first-retry',

    actionTimeout: 0,
    navigationTimeout: 30 * 1000,

    ...devices['Desktop Chrome'],
  },
});
