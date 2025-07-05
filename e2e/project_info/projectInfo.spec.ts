import { test, expect } from '@playwright/test';

test('has working map search', async ({ page }) => {
  await page.goto('/project_info');
  await page.getByRole('textbox', { name: 'Enter address' }).click();
  await page.getByRole('textbox', { name: 'Enter address' }).pressSequentially('sevilla');
  await page.getByText('Seville, Sevilla, Andalusia, Spain').first().click();
  await expect(page.getByRole('textbox', { name: 'Address', exact: true })).toHaveValue('Seville, Sevilla, Andalusia, Spain');
  await expect(page.getByTestId('latitude').locator('input')).toHaveValue('37.3886303');
  await expect(page.getByTestId('longitude').locator('input')).toHaveValue('-5.9953403');
})
