import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test('a11y: homepage', async ({ page }) => {
  await page.goto('/');
  const results = await new AxeBuilder({ page }).analyze();
  expect(results.violations).toEqual([]);
});
