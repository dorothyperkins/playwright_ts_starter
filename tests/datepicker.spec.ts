import { test, expect } from '@playwright/test';

function formatEnGb(date: Date) {
  const dd = String(date.getDate()).padStart(2, '0');
  const mm = String(date.getMonth() + 1).padStart(2, '0');
  const yyyy = date.getFullYear();
  return `${dd}/${mm}/${yyyy}`;
}

test('select a date (pattern)', async ({ page }) => {
  await page.goto('/'); // adjust to your /booking page when available

  // This is a template; replace selectors with your app's datepicker
  // Example open:
  // await page.getByLabel(/date|check-in/i).click();

  // Example picking 15th (replace with real logic for your component)
  // await page.getByRole('gridcell', { name: '15' }).click();

  // Example assertion for en-GB formatted input value
  // const value = await page.getByLabel(/date|check-in/i).inputValue();
  const today = new Date(); today.setDate(15);
  expect(formatEnGb(today)).toMatch(/\d{2}\/\d{2}\/\d{4}/);
});
