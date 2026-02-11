const { defineConfig, devices } = require('@playwright/test');
const path = require('path');

const STORAGE_STATE = path.resolve(__dirname, '.state/admin-auth.json');

module.exports = defineConfig({
  testDir: './tests',

  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,

  // CI optimization
  workers: process.env.CI ? 2 : 4,

  reporter: [['html', { outputFolder: 'playwright-report' }]],

  globalSetup: require.resolve('./global-setup.js'),

  use: {
    baseURL: 'http://127.0.0.1:8000',
    storageState: STORAGE_STATE,

    screenshot: 'only-on-failure',

    trace: process.env.CI ? 'retain-on-failure' : 'on-first-retry',
    video: process.env.CI ? 'off' : 'retain-on-failure',

    ...devices['Desktop Chrome'],
  },
});
