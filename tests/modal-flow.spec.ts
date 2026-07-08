import { test, expect } from '@playwright/test';

test('Modal Confirmation Flow: nested modal confirm, both modals close, result confirmed', async ({ page }) => {
  await page.goto('');

  // 1. Navigate to the Responsive tab
  await page.locator('[data-tab="responsive"]').click();

  // 2. Click "Open Modal"
  await page.getByTestId('open-modal').click();
  await expect(page.getByTestId('modal-backdrop')).toBeVisible();
  await expect(page.getByTestId('modal-content')).toBeVisible();

  // 3. In the modal, click "Show Details" (opens the nested modal, layered on top)
  await page.getByTestId('show-nested').click();
  await expect(page.getByTestId('nested-modal-backdrop')).toBeVisible();
  await expect(page.getByTestId('nested-modal-content')).toBeVisible();

  // 4. In the nested modal, click "Confirm".
  // IMPORTANT: this must hit the nested modal's own "Confirm" button
  // (data-testid="final-confirm"), which sits on top of the outer modal's
  // "Cancel"/"Show Details" buttons in the same region of the screen.
  // Scoping the locator to the nested modal container guarantees we click
  // the correct top layer rather than accidentally clicking through to
  // whatever is behind it.
  const nestedModal = page.getByTestId('nested-modal-content');
  await nestedModal.getByTestId('final-confirm').click();

  // 5. Verify both modals close
  await expect(page.getByTestId('nested-modal-backdrop')).toHaveCount(0);
  await expect(page.getByTestId('modal-backdrop')).toHaveCount(0);

  // 6. Verify result shows "confirmed"
  await expect(page.getByTestId('modal-result')).toContainText('confirmed');
});
