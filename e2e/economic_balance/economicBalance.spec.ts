import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('/solar_arrays');
  await page.getByRole('button', { name: 'Add solar array' }).click();
  await page.getByRole('combobox', { name: 'Select a panel model' }).click();
  await page.getByText('Winaico 360MGL PERC FULL').click();
  await page.locator('#panelNumber button').first().click();
  await page.locator('#panelNumber button').first().click();
  await page.getByRole('button', { name: 'Consult PVGIS Data' }).click();

  await page.getByRole('link', { name: 'Consumption' }).click();
  const peakJanuary = page.getByTestId('peak-January').locator('input')
  await peakJanuary.click()
  await peakJanuary.pressSequentially('100');

  await page.getByRole('link', { name: 'Economic balance' }).click();
})

test('shows correct economic balance data', async ({ page }) => {
  const roiCanvasLocator = page.locator('canvas').nth(1);
  const negativeRoiChart = await roiCanvasLocator.screenshot({ animations: 'disabled' });

  const peakKwhCost = page.getByTestId('peakKwhCost').locator('input');
  await peakKwhCost.click();
  await peakKwhCost.press('ControlOrMeta+Home')
  await peakKwhCost.pressSequentially('2')
  await peakKwhCost.blur()

  const positiveRoiChart = await roiCanvasLocator.screenshot({ animations: 'disabled' });

  await expect(page.getByText('2000.00€').first()).toBeVisible();
  await expect(page.getByText('2543.73€').first()).toBeVisible();
  expect(negativeRoiChart).not.toEqual(positiveRoiChart);

})
