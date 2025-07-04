import { test, expect } from '@playwright/test';

test('has project selection', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('combobox', { name: 'Select a project' })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Load project' })).toBeVisible();
})

test('loads project and new buttons appear', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('combobox', { name: 'Select a project' }).click();
  await page.getByRole('option', { name: 'Castillo Olvera (Castillo de' }).click();
  await page.getByRole('button', { name: 'Load project' }).click();
  await expect(page.getByRole('button', { name: 'Delete project' })).toBeVisible();
  await expect(page.getByRole('button', { name: 'New Project' })).toBeVisible();
})
