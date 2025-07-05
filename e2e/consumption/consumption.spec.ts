import { test, expect } from '@playwright/test';

test('calculates totals', async ({ page }) => {
  await page.goto('/consumption');
  const peakJanuary = page.getByTestId('peak-January').locator('input')
  const peakJune = page.getByTestId('peak-June').locator('input')
  const flatMay = page.getByTestId('flat-May').locator('input')

  await peakJanuary.click()
  await peakJanuary.pressSequentially('1');
  await peakJune.click()
  await peakJune.pressSequentially('2');
  await flatMay.click()
  await flatMay.pressSequentially('3');
  await flatMay.blur()

  await expect(page.getByText('Total Peak: 3')).toBeVisible()
  await expect(page.getByText('Total Flat: 3')).toBeVisible()
  await expect(page.getByText('ANNUAL CONSUMPTION [kWh/year]: 6')).toBeVisible()
})

test('calculates PV consumption', async ({ page }) => {
  await page.goto('/consumption');
  const peakJanuary = page.getByTestId('peak-January').locator('input')

  await peakJanuary.click()
  await peakJanuary.pressSequentially('1');
  await peakJanuary.blur()

  await expect(page.getByRole('row', { name: 'January' }).getByRole('cell').nth(1))
    .toHaveText(/0\.[0-9]+/)
})

test('changes chart', async ({ page }) => {
  await page.goto('/consumption');
  const canvasLocator = page.locator('canvas');
  const emptyChart = await canvasLocator.screenshot({ animations: 'disabled' });

  const peakJanuary = page.getByTestId('peak-January').locator('input')

  await peakJanuary.click()
  await peakJanuary.pressSequentially('1');
  await peakJanuary.blur()

  const nonEmptyChart = await canvasLocator.screenshot({ animations: 'disabled' });

  expect(emptyChart).not.toEqual(nonEmptyChart);
})
