import { test, expect } from '@playwright/test';

test('Delayed Button Flow: start process, wait for enabled confirm, verify success', async ({ page }) => {
  await page.goto('');

  // 1. Navigate to the Timing Challenges tab (it's the default tab, but click explicitly for robustness)
  await page.locator('[data-tab="timing"]').click();

  // 2. Click "Start Process"
  await page.getByTestId('start-process').click();

  // 3. Wait for the "Confirm Action" button to become ENABLED (not just visible/present).
  // The disabled "Please Wait..." button shares the same testid while loading, so we
  // wait on the enabled state specifically rather than just presence.
  const confirmButton = page.getByTestId('confirm-button');
  await expect(confirmButton).toBeEnabled({ timeout: 6000 });
  await expect(confirmButton).toHaveText('✓ Confirm Action');

  // 4. Click the confirm button
  await confirmButton.click();

  // 5. Verify the success message appears
  await expect(page.getByTestId('success-message')).toBeVisible();
  await expect(page.getByTestId('success-message')).toContainText('Action Confirmed Successfully');
});
