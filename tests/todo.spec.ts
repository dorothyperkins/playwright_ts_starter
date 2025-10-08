import { test } from '@playwright/test';
import { TodoPage } from '../src/pages/TodoPage';

test.describe('Todos', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('add a task', async ({ page }) => {
    const todo = new TodoPage(page);
    await todo.addTask('Buy milk');
    await todo.expectTaskVisible('Buy milk');
  });
});
