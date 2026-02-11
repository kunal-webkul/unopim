const { defineConfig, devices } = require('@playwright/test');
const path = require('path');

const STORAGE_STATE = path.resolve(__dirname, '.state/admin-auth.json');

module.exports = defineConfig({
  testDir: './tests',
  fullyParallel: true,

  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  workers: 4,
  reporter: [['html', { outputFolder: 'playwright-report' }]],

  globalSetup: require.resolve('./global-setup.js'),

  use: {
    baseURL: 'http://127.0.0.1:8000',
    storageState: STORAGE_STATE,
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },

  projects: [
    {
      name: 'configuration',
      testDir: './tests/02-configuration',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'dashboard',
      testDir: './tests/03-dashboard',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'datatransfer',
      testDir: './tests/04-datatransfer',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'product-completeness',
      testDir: './tests/06-product-completeness',
      use: { ...devices['Desktop Chrome'] },
    },

    {
      name: 'catalog',
      testDir: './tests/01-catalog',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'settings',
      testDir: './tests/05-settings',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'login',
      testDir: './tests/07-ui-loginpage',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
});
