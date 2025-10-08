import { test, expect } from '@playwright/test';

test('mock todos api', async ({ page }) => {
  await page.route('**/api/todos', async route => {
    const mock = [{ id: 1, title: 'Mocked task', completed: false }];
    await route.fulfill({ status: 200, contentType: 'application/json', body: JSON.stringify(mock) });
  });

  await page.goto('/');
  await expect(page.getByText('Mocked task')).toBeVisible();
});
