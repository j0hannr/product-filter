// @ts-check
const { test, expect } = require('@playwright/test');

// hello world

test('test', async ({ page }) => {
  // Go to http://localhost:3002/
  await page.goto('/');
  // Select type
  await page.locator('select[name="rules\\.0\\.parameter"]').selectOption('type');
  // Select >
  await page.locator('select[name="rules\\.0\\.operator"]').selectOption('>');
  // Click [placeholder="values comma seperated for multiple"]
  await page.locator('[placeholder="values comma seperated for multiple"]').click();
  // Fill [placeholder="values comma seperated for multiple"]
  await page.locator('[placeholder="values comma seperated for multiple"]').fill('20');
  // Select error
  await page.locator('select[name="rules\\.0\\.state"]').selectOption('error');
  // Click [placeholder="error message"]
  await page.locator('[placeholder="error message"]').click();
  // Fill [placeholder="error message"]
  await page.locator('[placeholder="error message"]').fill('Hello');
  // Click [placeholder="success message"]
  await page.locator('[placeholder="success message"]').click();
  // Fill [placeholder="success message"]
  await page.locator('[placeholder="success message"]').fill('World');
  // Click text=hinzufügen
  await page.locator('text=hinzufügen').click();
  // Select type
  await page.locator('select[name="rules\\.1\\.parameter"]').selectOption('type');
  // Select ==
  await page.locator('select[name="rules\\.1\\.operator"]').selectOption('==');
  // Double click input[name="rules\.1\.value"]
  await page.locator('input[name="rules\\.1\\.value"]').dblclick();
  // Fill input[name="rules\.1\.value"]
  await page.locator('input[name="rules\\.1\\.value"]').fill('hi');
  // Press Tab
  await page.locator('input[name="rules\\.1\\.value"]').press('Tab');
  // Click input[name="rules\.1\.fault_message"]
  await page.locator('input[name="rules\\.1\\.fault_message"]').click();
  // Fill input[name="rules\.1\.fault_message"]
  await page.locator('input[name="rules\\.1\\.fault_message"]').fill('World');
  // Press Tab
  await page.locator('input[name="rules\\.1\\.fault_message"]').press('Tab');
  // Fill input[name="rules\.1\.success_message"]
  await page.locator('input[name="rules\\.1\\.success_message"]').fill('Hello');
  // Click text=Gebäudetyp ✅ World
  await page.locator('text=Gebäudetyp ✅ World').click();
  // Click text=Message World >> nth=0
  await page.locator('text=Message World').first().click();
  // Click text=Gebäudetyp ⚠️ World
  await page.locator('text=Gebäudetyp ⚠️ World').click();
  // Click text=Message World >> nth=1
  await page.locator('text=Message World').nth(1).click();
});