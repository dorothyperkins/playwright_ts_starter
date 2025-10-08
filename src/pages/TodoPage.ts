import { Page, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class TodoPage extends BasePage {
  newTodo = this.page.getByPlaceholder('What needs to be done?');

  constructor(page: Page) { super(page); }

  async addTask(text: string) {
    await this.newTodo.fill(text);
    await this.newTodo.press('Enter');
  }

  async expectTaskVisible(text: string) {
    await expect(this.page.getByRole('listitem').filter({ hasText: text })).toBeVisible();
  }
}
