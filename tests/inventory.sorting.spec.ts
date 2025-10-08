import { test, expect } from '@playwright/test';
import { LoginPage } from '../src/pages/LoginPage';
import { InventoryPage } from '../src/pages/InventoryPage';

test.describe('SauceDemo: inventory sorting', () => {
  test.beforeEach(async ({ page }) => {
    // login first
    const login = new LoginPage(page);
    await login.goto();
    await login.login(
      process.env.USERNAME || 'standard_user',
      process.env.PASSWORD || 'secret_sauce'
    );
  });

  test('Name (A to Z)', async ({ page }) => {
    const inv = new InventoryPage(page);
    await inv.goto();
    await inv.assertLoaded();

    await inv.setSort('az');
    const names = await inv.getNames();
    const sorted = [...names].sort((a, b) => a.localeCompare(b));
    expect(names).toEqual(sorted);
  });

  test('Name (Z to A)', async ({ page }) => {
    const inv = new InventoryPage(page);
    await inv.goto();
    await inv.assertLoaded();

    await inv.setSort('za');
    const names = await inv.getNames();
    const sorted = [...names].sort((a, b) => b.localeCompare(a));
    expect(names).toEqual(sorted);
  });

  test('Price (low to high)', async ({ page }) => {
    const inv = new InventoryPage(page);
    await inv.goto();
    await inv.assertLoaded();

    await inv.setSort('lohi');
    const prices = await inv.getPrices();
    const sorted = [...prices].sort((a, b) => a - b);
    expect(prices).toEqual(sorted);
  });

  test('Price (high to low)', async ({ page }) => {
    const inv = new InventoryPage(page);
    await inv.goto();
    await inv.assertLoaded();

    await inv.setSort('hilo');
    const prices = await inv.getPrices();
    const sorted = [...prices].sort((a, b) => b - a);
    expect(prices).toEqual(sorted);
  });
});
