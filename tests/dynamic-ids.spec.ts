import { test, expect } from '@playwright/test';

test('Dynamic ID Handling: select Beta after regenerating IDs, using stable attributes only', async ({ page }) => {
  await page.goto('');

  // 1. Navigate to the Flaky Selectors tab
  await page.locator('[data-tab="selectors"]').click();

  // Scope to the "2.1 Dynamic IDs" card specifically via its stable data-testid button,
  // since another card ("2.4 Nested Dynamic Structure") has an identically-labelled
  // "Regenerate All IDs" button — text alone would be ambiguous.
  const regenerateButton = page.getByTestId('regenerate-ids');

  // 2. Click "Regenerate All IDs" — do it twice to prove selection is resilient
  // regardless of how many times the underlying id attribute changes.
  await regenerateButton.click();
  await regenerateButton.click();

  // 3. Select the item named "Beta".
  // IMPORTANT: this selector uses the stable `data-name` attribute, NEVER the
  // element's `id` attribute (which is randomly regenerated on every click).
  const betaItem = page.locator('[data-name="Beta"]');
  await betaItem.click();

  // 4. Verify "Beta" is shown as selected
  await expect(page.getByTestId('selected-item')).toContainText('Beta');

  // Regenerate again after selection to prove the assertion still holds and that
  // we never depended on the (now-changed) id attribute.
  await regenerateButton.click();
  await expect(page.getByTestId('selected-item')).toContainText('Beta');
});
