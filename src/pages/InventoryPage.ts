import { Page, expect } from '@playwright/test';

type SortValue = 'az' | 'za' | 'lohi' | 'hilo';

export class InventoryPage {
  constructor(private page: Page) {}

  // Robust selector: support both data-test and class (site sometimes uses the class)
  private sortSelect = this.page.locator(
    'select[data-test="product_sort_container"], select.product_sort_container'
  );
  private itemCards  = this.page.locator('.inventory_item');
  private itemNames  = this.page.locator('.inventory_item_name');
  private itemPrices = this.page.locator('.inventory_item_price');
  private cartLink   = this.page.locator('.shopping_cart_link');
  private cartBadge  = this.page.locator('.shopping_cart_badge');

  itemName = 'Sauce Labs Backpack';
  private addBackpackBtn = this.page.locator('[data-test="add-to-cart-sauce-labs-backpack"], button#add-to-cart-sauce-labs-backpack');

  async goto() {
    await this.page.goto('/inventory.html');
    await this.page.waitForLoadState('domcontentloaded');
    await this.page.waitForURL(/\/inventory\.html$/);
  }

  async assertLoaded() {
    // Ensure we’re on inventory and elements are attached
    await expect(this.page).toHaveURL(/\/inventory\.html$/);
    await expect(this.page.locator('.title')).toHaveText('Products');

    // Wait for either selector variant to be attached & enabled
    await this.page.waitForSelector(
      'select[data-test="product_sort_container"], select.product_sort_container',
      { state: 'attached', timeout: 10000 }
    );
    await expect(this.sortSelect).toBeEnabled();

    // Ensure at least one product is visible
    await expect(this.itemCards.first()).toBeVisible();
  }

  async setSort(value: SortValue) {
    // Guard: element ready
    await expect(this.sortSelect).toBeEnabled();
    // Try selectOption on the select element
    await this.sortSelect.selectOption(value);
  }

  async getNames(): Promise<string[]> {
    const count = await this.itemNames.count();
    const names: string[] = [];
    for (let i = 0; i < count; i++) {
      names.push((await this.itemNames.nth(i).innerText()).trim());
    }
    return names;
  }

  async getPrices(): Promise<number[]> {
    const count = await this.itemPrices.count();
    const prices: number[] = [];
    for (let i = 0; i < count; i++) {
      const raw = await this.itemPrices.nth(i).innerText(); // "$29.99"
      prices.push(parseFloat(raw.replace('$', '')));
    }
    return prices;
  }

  // ---- Cart helpers ----
  async addBackpackToCart() {
    await this.addBackpackBtn.click();
    await expect(this.cartBadge).toHaveText('1');
  }

  async openCart() {
    await this.cartLink.click();
    await expect(this.page).toHaveURL(/cart\.html/);
  }
}
