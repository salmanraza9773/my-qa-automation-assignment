import { test, expect } from '@playwright/test';

test('Conditional Login Flow: admin then standard, correct panel presence/absence each time', async ({ page }) => {
  await page.goto('');

  // 1. Navigate to the Flaky Selectors tab
  await page.locator('[data-tab="selectors"]').click();

  // 2. Click "Admin User" login button
  await page.getByTestId('login-admin').click();

  // Handle the loading state between login and dashboard: a "loading-section"
  // appears for ~1s before "dashboard-section" mounts. Wait for the loading
  // section to disappear (or just wait directly for the dashboard — either
  // way this is a dynamic wait, not a hardcoded sleep).
  await expect(page.getByTestId('loading-section')).toBeVisible();
  await expect(page.getByTestId('loading-section')).toBeHidden({ timeout: 5000 });

  // 3. Wait for dashboard to load
  await expect(page.getByTestId('dashboard-section')).toBeVisible();

  // 4. Verify the Admin Panel is visible (not the Standard Panel).
  // Both panels are conditionally rendered — only one exists in the DOM at a time —
  // so we assert presence of one AND absence (not just invisibility) of the other.
  await expect(page.getByTestId('admin-panel')).toBeVisible();
  await expect(page.getByTestId('standard-panel')).toHaveCount(0);

  // 5. Click Logout
  await page.getByTestId('logout-button').click();
  await expect(page.getByTestId('login-section')).toBeVisible();

  // 6. Click "Standard User" login button
  await page.getByTestId('login-standard').click();
  await expect(page.getByTestId('loading-section')).toBeVisible();
  await expect(page.getByTestId('loading-section')).toBeHidden({ timeout: 5000 });
  await expect(page.getByTestId('dashboard-section')).toBeVisible();

  // 7. Verify the Standard Panel is visible (not the Admin Panel)
  await expect(page.getByTestId('standard-panel')).toBeVisible();
  await expect(page.getByTestId('admin-panel')).toHaveCount(0);
});
