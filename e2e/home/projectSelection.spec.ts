import { test, expect } from '@playwright/test';

test('has project selection', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('combobox', { name: 'Select a project' })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Load project' })).toBeVisible();
})
