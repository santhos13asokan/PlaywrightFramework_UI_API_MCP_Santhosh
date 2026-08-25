import { defineConfig, devices } from '@playwright/test';
import { Config } from './config/env.config';


const browserName = (process.env.BROWSER || 'chromium').toLowerCase();


function getProjects() {
  if (browserName === 'firefox') {
    return [
      {
        name: 'firefox',
        use: { ...devices['Desktop Firefox'] },
      },
    ];
  }

  if (browserName === 'webkit') {
    return [
      {
        name: 'webkit',
        use: { ...devices['Desktop Safari'] },
      },
    ];
  }

  if (browserName === 'all') {
    return [
      {
        name: 'chromium',
        use: { ...devices['Desktop Chrome'] },
      },
      {
        name: 'firefox',
        use: { ...devices['Desktop Firefox'] },
      },
      {
        name: 'webkit',
        use: { ...devices['Desktop Safari'] },
      },
    ];
  }


  return [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ];
}


export default defineConfig({
  testDir: './tests',
  
  //fullyParallel: true,
  timeout: 30000,
  expect: {
    timeout: 5000,
  },
  forbidOnly: !!process.env.CI,
  
  retries: process.env.CI ? 2 : 0,
  
  workers: 2,

 
  
  reporter: [
    ['html'],
    ['allure-playwright', { outputFolder: 'allure-results' }],
  ],
  use: {
    baseURL: Config.baseUrl,
    extraHTTPHeaders: {
      'Accept': 'application/json',
    },
    testIdAttribute: 'data-test',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    headless: false
    
  },

 projects: getProjects()

});
