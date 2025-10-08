import { Page, expect } from '@playwright/test';

export class LoginPage {
  constructor(private page: Page) {}

  private username = this.page.locator('#user-name');
  private password = this.page.locator('#password');
  private submit   = this.page.locator('#login-button');

  async goto() {
    await this.page.goto('/');
  }

  async login(user: string, pass: string) {
    await this.username.fill(user);
    await this.password.fill(pass);
    await this.submit.click();
    await expect(this.page.locator('.title')).toHaveText('Products');
  }

  async logout() {
    await this.page.locator('#react-burger-menu-btn').click();
    await this.page.locator('#logout_sidebar_link').click();
    await expect(this.page.locator('#login-button')).toBeVisible();
  }
}
