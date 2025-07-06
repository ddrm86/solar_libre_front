import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('/inventory/monophase_inverters');
})

test('has inverters table', async ({ page }) => {
  await expect(page.getByText('Maker')).toBeVisible();
  await expect(page.getByText('Nominal Output Power')).toBeVisible();
})

test('clicking new launches empty dialog', async ({ page }) => {
  await page.getByRole('button', { name: 'New' }).click();
  await expect(page.getByRole('textbox', { name: 'Maker' })).toBeEmpty();
})

test('clicking edit launches dialog with data', async ({ page }) => {
  await page.getByRole('button', { name: '' }).click();
  await expect(page.getByRole('textbox', { name: 'Maker' })).not.toBeEmpty();
})

test('clicking delete shows confirmation dialog', async ({ page }) => {
  await page.getByRole('button', { name: '' }).click();
  await expect(page.getByLabel('Confirm')).toContainText('Are you sure you want to delete this monophase inverter');
  await expect(page.locator('small')).not.toBeEmpty();
})
