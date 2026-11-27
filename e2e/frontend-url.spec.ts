import { expect, test } from '@playwright/test';

test('opens the local frontend from a relative URL', async ({ page }) => {
  await page.goto('/');

  await expect(page).toHaveTitle('Gesta');
});
