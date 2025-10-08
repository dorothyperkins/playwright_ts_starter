import { Page, expect } from '@playwright/test';

export class CartPage {
  constructor(private page: Page) {}

  // locators
  cartItems = this.page.locator('.cart_item');
  itemNames = this.page.locator('.inventory_item_name');

  // assertion method: check that item is visible in cart
  async assertHasItem(name: string) {
    // verify that an item with the given name exists in the cart
    await expect(this.itemNames.filter({ hasText: name })).toBeVisible();
    // optional: verify at least one item present
    await expect(this.cartItems).toHaveCount(1);
  }
}
