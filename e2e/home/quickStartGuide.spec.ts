import { test, expect } from '@playwright/test';

test('has quick start guide', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('h1')).toHaveText('Welcome to SolarLibre');
  await expect(page.locator('h2')).toHaveText('Quick Start Guide');
})
