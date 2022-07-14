// @ts-check
const { test, expect } = require('@playwright/test');

test('test', async ({ page }) => {
  // Go to http://localhost:3002/
  await page.goto('/');
  // Select type
 // Select type
 await page.locator('select[name="rules\\.0\\.parameter"]').selectOption('type');
 // Click select[name="rules\.0\.parameter"]
 await page.locator('select[name="rules\\.0\\.parameter"]').click();
 // Select ==
 await page.locator('select[name="rules\\.0\\.operator"]').selectOption('==');
 // Click [placeholder="error message"]
 await page.locator('[placeholder="error message"]').click();
 // Fill [placeholder="error message"]
 await page.locator('[placeholder="error message"]').fill('hello');
 // Click [placeholder="success message"]
 await page.locator('[placeholder="success message"]').click();
 // Fill [placeholder="success message"]
 await page.locator('[placeholder="success message"]').fill('world');
 // Click text=hinzufügen
 await page.locator('text=hinzufügen').click();
 // Click text=hinzufügen
 await page.locator('text=hinzufügen').click();
 // Click text=hinzufügen
 await page.locator('text=hinzufügen').click();
 // Click text=zurücksetzen
 await page.locator('text=zurücksetzen').click();

});