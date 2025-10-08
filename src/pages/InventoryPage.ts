import { Page, expect } from '@playwright/test';

type SortValue = 'az' | 'za' | 'lohi' | 'hilo';

export class InventoryPage {
  constructor(private page: Page) {}

  private sortSelect = this.page.locator('[data-test="product_sort_container"]');
  private itemCards = this.page.locator('.inventory_item');
  private itemNames = this.page.locator('.inventory_item_name');
  private itemPrices = this.page.locator('.inventory_item_price');

  async goto() {
    await this.page.goto('/inventory.html');
  }

  async assertLoaded() {
    await expect(this.page.locator('.title')).toHaveText('Products');
    await expect(this.itemCards).toHaveCountGreaterThan(0);
  }

  async setSort(value: SortValue) {
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
}
