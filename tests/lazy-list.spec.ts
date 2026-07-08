import { test, expect } from '@playwright/test';

test('Lazy List: load 3 pages, verify 15 items with mixed statuses', async ({ page }) => {
  await page.goto('');

  // 1. Navigate to the Timing Challenges tab
  await page.locator('[data-tab="timing"]').click();

  const loadMoreButton = page.getByTestId('load-more');
  const itemCount = page.getByTestId('item-count');

  // 2. Click "Load More Items" 3 times, waiting for each load to finish before the next click.
  for (let i = 1; i <= 3; i++) {
    await loadMoreButton.click();

    // Must wait for loading to complete after each click before proceeding:
    // the button is disabled and its label flips to "Loading..." while a batch loads,
    // and the loading spinner (data-testid="list-loading") is removed once done.
    await expect(loadMoreButton).toBeEnabled({ timeout: 5000 });
    await expect(page.getByTestId('list-loading')).toHaveCount(0);

    // Confirm the running total matches how many batches have loaded so far —
    // this also guards against racing ahead before state has actually updated.
    await expect(itemCount).toHaveText(String(i * 5));
  }

  // 3. Verify exactly 15 items are displayed
  await expect(itemCount).toHaveText('15');
  await expect(page.getByTestId('item-list').locator('[data-testid^="list-item-"]')).toHaveCount(15);

  // 4. Verify at least one item has status "active" and at least one has status "pending"
  const itemList = page.getByTestId('item-list');
  await expect(itemList.getByText('active', { exact: true }).first()).toBeVisible();
  await expect(itemList.getByText('pending', { exact: true }).first()).toBeVisible();
});
