import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('/solar_arrays');
  await page.getByRole('button', { name: 'Add solar array' }).click();
  await page.getByRole('combobox', { name: 'Select a panel model' }).click();
  await page.getByText('Winaico 360MGL PERC FULL').click();
  await page.locator('#panelNumber button').first().click();
  await page.locator('#panelNumber button').first().click();
})

test('calculates total power production', async ({ page }) => {
  await expect(page.getByLabel('', { exact: true })).toContainText('(0.72 kW)');
})

test('queries PVGIS data', async ({ page }) => {
  await expect(page.getByLabel('Consult PVGIS Data')).toContainText('Needs update');
  await page.getByRole('button', { name: 'Consult PVGIS Data' }).click();
  await expect(page.locator('.p-card-body').first()).toBeVisible();
  await expect(page.locator('div:nth-child(2) > .p-card-body')).toBeVisible();
  await expect(page.getByLabel('', { exact: true })).toContainText('E_m');
  await expect(page.getByLabel('', { exact: true })).toContainText('PROVIDED DATA');
  await expect(page.getByLabel('Consult PVGIS Data')).toContainText('Updated');
})

test('shows array summary when wrapped', async ({ page }) => {
  await page.locator('#pv_id_11_header').click();
  await expect(page.getByRole('main')).toContainText('2 x Winaico 360MGL PERC FULL BLACK (📉14% 📐35º 🧭0º) ⚡0 kWh yearly - NOT UPDATED');
})

test('deletes array', async ({ page }) => {
  await expect(page.getByRole('combobox')).toBeVisible();
  await page.getByRole('button', { name: '' }).click();
  await expect(page.getByRole('combobox')).toBeHidden();
})
