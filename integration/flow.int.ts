import { test, expect } from '@playwright/test';

test('Index', async ({ page }) => {
  await page.goto('http://127.0.0.1:3000/');

  await expect(page).toHaveTitle(/Pokedex/);

  await page.getByRole('link', { name: 'charmeleon' }).click();
  await expect(page).toHaveTitle(/Details/);
});

test('Pokemon charmeleon', async ({ page }) => {
  await page.goto('http://127.0.0.1:3000/pokemon/charmeleon');

  await expect(page).toHaveTitle(/Details/);

  await page.getByRole('link', { name: 'Pokedex' }).click();

  await expect(page).toHaveTitle(/Pokedex/);
});
