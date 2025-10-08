import { Page, expect } from '@playwright/test';

export class InventoryPage {
  constructor(private page: Page) {}

  cartLink = this.page.locator('.shopping_cart_link');
  cartBadge = this.page.locator('.shopping_cart_badge');

  // Product example: Sauce Labs Backpack
  itemName = 'Sauce Labs Backpack';
  addBackpackBtn = this.page.locator('[data-test="add-to-cart-sauce-labs-backpack"]');

  async assertLoaded() {
    await expect(this.page.locator('.title')).toHaveText('Products');
  }

  async addBackpackToCart() {
    await this.addBackpackBtn.click();
    await expect(this.cartBadge).toHaveText('1');
  }

  async openCart() {
    await this.cartLink.click();
  }
}
