import { test } from '@playwright/test';
import { LoginPage } from '../src/pages/LoginPage';
import { InventoryPage } from '../src/pages/InventoryPage';
import { CartPage } from '../src/pages/CartPage';

test.describe('SauceDemo: add to cart and verify', () => {
  test('add “Sauce Labs Backpack” and check it appears in cart', async ({ page }) => {
    // 1) Login
    const login = new LoginPage(page);
    await login.goto();
    await login.login(
      process.env.USERNAME || 'standard_user',
      process.env.PASSWORD || 'secret_sauce'
    );

    // 2) Inventory: add item
    const inventory = new InventoryPage(page);
    await inventory.assertLoaded();
    await inventory.addBackpackToCart();

    // 3) Go to cart and verify item present
    await inventory.openCart();
    const cart = new CartPage(page);
    await cart.assertHasItem(inventory.itemName);
  });
});
