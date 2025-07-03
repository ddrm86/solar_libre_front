import { test, expect } from '@playwright/test';

// See here how to get started:
// https://playwright.dev/docs/intro
test('visits the app root url and the quick start guide should appear', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('h1')).toHaveText('Welcome to SolarLibre');
  await expect(page.locator('h2')).toHaveText('Quick Start Guide');
})
