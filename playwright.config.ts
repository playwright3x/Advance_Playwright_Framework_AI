import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';
import path from 'path';

// Load environment variables
dotenv.config({ path: path.resolve(__dirname, '.env') });

// Resolve Base URL based on TTA_ENV
function resolveBaseURL(): string {
  if (process.env.BASE_URL) return process.env.BASE_URL;

  const env = (process.env.TTA_ENV || 'qa').toLowerCase();

  switch (env) {
    case 'api':
      return process.env.API_BASE_URL || 'https://restful-booker.herokuapp.com';

    case 'dev':
    case 'local':
      return process.env.DEV_BASE_URL || 'http://localhost:3000';

    case 'stg':
    case 'stage':
    case 'staging':
      return process.env.STG_BASE_URL || 'https://stage.thetestingacademy.com';

    case 'prod':
    case 'production':
      return process.env.PROD_BASE_URL || 'https://app.thetestingacademy.com';

    case 'qa':
    default:
      return process.env.QA_BASE_URL || 'https://app.thetestingacademy.com';
  }
}

export default defineConfig({

  // Test directory
  testDir: './src/tests',

  // Execution settings
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,

  // Allure Reporter Configuration
  reporter: [
    ['list'],
    [
      'allure-playwright',
      {
        resultsDir: 'allure-results',
        detail: true,
        suiteTitle: true,
      },
    ],
  ],

  // Shared settings
  use: {
    baseURL: resolveBaseURL(),

    screenshot: 'on',
    video: 'on',
    trace: 'on',

    headless: !!process.env.CI,
  },

  // Browser projects
  projects: [
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
        viewport: { width: 1920, height: 1080 },
      },
    },
  ],

});