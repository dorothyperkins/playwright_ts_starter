import { test, expect } from '@playwright/test';
import { LoginPage } from '../src/pages/LoginPage';

test.describe('SauceDemo Auth', () => {
  test('user can log in and log out', async ({ page }) => {
    const login = new LoginPage(page);
    await login.goto();

    const user = process.env.USERNAME || 'standard_user';
    const pass = process.env.PASSWORD || 'secret_sauce';

    await login.login(user, pass);

    // (extra) a quick assertion that a product is visible
    await expect(page.getByText('Sauce Labs Backpack')).toBeVisible();

    await login.logout();
  });
});
