import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('/solar_arrays');
  await page.getByRole('button', { name: 'Add solar array' }).click();
  await page.getByRole('combobox', { name: 'Select a panel model' }).click();
  await page.getByText('Winaico 360MGL PERC FULL').click();
  await page.locator('#panelNumber button').first().click();
  await page.locator('#panelNumber button').first().click();
  await page.getByRole('link', { name: 'Inverters setup' }).click();
})

test('shows remaining unconnected panels', async ({ page }) => {
  await expect(page.getByRole('alert')).toContainText('Missing panels to connect (2)');
})

test('shows remaining MPPTs', async ({ page }) => {
  await page.getByRole('button', { name: 'Add inverter' }).click();
  await page.getByRole('combobox', { name: 'Select an inverter' }).click();
  await page.getByText('Huawei SUN2000 2KTL-L1 (3000W)').click();
  await expect(page.getByLabel('Add MPPT (2 remaining)')).toContainText('Add MPPT (2 remaining)');
})

test('check correct texts when connecting', async ({ page }) => {
  await page.getByRole('button', { name: 'Add inverter' }).click();
  await page.getByRole('combobox', { name: 'Select an inverter' }).click();
  await page.getByText('Huawei SUN2000 2KTL-L1 (3000W)').click();
  await page.getByRole('button', { name: 'Add MPPT (2 remaining)' }).click();
  await page.getByRole('button', { name: 'Add String' }).click();
  await page.getByRole('combobox', { name: 'Select array' }).click();
  await page.getByText('2 x Winaico 360MGL PERC FULL').click();
  await page.getByRole('region', { name: 'Strings' }).locator('button').nth(1).click();
  await expect(page.getByRole('main')).toContainText('Connected power: 720W (36%)');
  await expect(page.getByRole('main')).toContainText('Correct, but the inverter is underutilized');
  await expect(page.getByRole('main')).toContainText('Input voltage too low (67.4V < 100V)');
  await expect(page.getByText('Open circuit voltage: 80.48V')).toBeVisible();
  await expect(page.getByLabel('2 x Winaico 360MGL PERC FULL')).toContainText('2 x Winaico 360MGL PERC FULL BLACK 🧭0º');
  await expect(page.getByText('All panels connected (2)')).toBeVisible();
})
