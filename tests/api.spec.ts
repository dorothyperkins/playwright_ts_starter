test.beforeEach(async ({ page }) => {
  const login = new LoginPage(page);
  await login.goto();
  await login.login(
    process.env.USERNAME || 'standard_user',
    process.env.PASSWORD || 'secret_sauce'
  );
  const inv = new InventoryPage(page);
  await inv.goto();
  await inv.assertLoaded();
});
