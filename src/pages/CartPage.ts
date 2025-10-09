 // src/pages/CartPage.ts
import { Page, expect } from '@playwright/test';

export class CartPage {
  constructor(private page: Page) {}

  private cartItems = this.page.locator('.cart_item');
  private itemNames = this.page.locator('.inventory_item_name');

  async assertHasItem(name: string) {
    await expect(this.itemNames.filter({ hasText: name })).toBeVisible();
    // If you only add one item in the test, this is a nice extra check:
    await expect(this.cartItems).toHaveCount(1);
  }
}
