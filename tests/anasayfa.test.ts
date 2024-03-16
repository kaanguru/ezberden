import { test, expect } from '@playwright/test';
let parolaAlan: string;
let yeniParolaAlan: string;
test.beforeEach(async ({ page }) => {
	await page.goto('/');
});
test.describe.skip('Parola üretim kontrolü', () => {
	test('parola-alan da 2 karakterden fazla yazı var', async ({ page }) => {
		await expect(page.locator('#parola-alan')).toContainText(/[a-z]{3,}/i);
		parolaAlan = await page.locator('#parola-alan').innerText();
	});

	test('kelime değiştiğinde parola değişiyor', async ({ page }) => {
		await page.locator('#kelimeSayisi').fill('4');
		await page.locator('#kelimeSayisi').click();
		yeniParolaAlan = await page.locator('#parola-alan').innerText();
		expect(yeniParolaAlan.length).toBeGreaterThan(16);
		expect(yeniParolaAlan).not.toBe(parolaAlan);
		parolaAlan = yeniParolaAlan;
		await page.locator('#kelimeSayisi').fill('5');
		await page.locator('#kelimeSayisi').click();
		yeniParolaAlan = await page.locator('#parola-alan').innerText();
		expect(yeniParolaAlan.length).toBeGreaterThan(20);
		expect(yeniParolaAlan).not.toBe(parolaAlan);
		parolaAlan = yeniParolaAlan;
	});

	test('yeniden üret', async ({ page }) => {
		await page.locator('#yeniden-uret').click();
		yeniParolaAlan = await page.locator('#parola-alan').innerText();
		expect(yeniParolaAlan).not.toBe(parolaAlan);
		parolaAlan = yeniParolaAlan;
	});
	test('standartlar', async ({ page }) => {
		await page.locator('#standartlar').click();
		yeniParolaAlan = await page.locator('#parola-alan').innerText();
		expect(yeniParolaAlan).toMatch(/-/g);
		expect(yeniParolaAlan).not.toBe(parolaAlan);
		parolaAlan = yeniParolaAlan;
		await page.locator('#standartlar').click();
		yeniParolaAlan = await page.locator('#parola-alan').innerText();
		expect(yeniParolaAlan).not.toMatch(/-/g);
		expect(yeniParolaAlan).not.toBe(parolaAlan);
		parolaAlan = yeniParolaAlan;
	});
	test('Ara Karakterler', async ({ page }) => {
		await page.locator('#araliklar').click();
		await page.locator('#araliklar').fill(' +');
		yeniParolaAlan = await page.locator('#parola-alan').innerText();

		expect(yeniParolaAlan).toMatch(/\+/g);
		expect(yeniParolaAlan).not.toBe(parolaAlan);
		parolaAlan = yeniParolaAlan;
	});
});
