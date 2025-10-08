import { chromium, FullConfig } from '@playwright/test';
import dotenv from 'dotenv';
dotenv.config();

export default async function globalSetup(config: FullConfig) {
  const browser = await chromium.launch();
  const context = await browser.newContext();
  const page = await context.newPage();

  const baseURL = process.env.BASE_URL || 'https://demo.playwright.dev/todomvc';
  const username = process.env.USERNAME || 'demo';
  const password = process.env.PASSWORD || 'demo';

  // Adjust this block to your real app. For the demo site, login isn't needed;
  // we just navigate and save an empty storage state.
  await page.goto(baseURL);
  await page.waitForLoadState('domcontentloaded');

  await context.storageState({ path: 'storageState.json' });
  await browser.close();
}
