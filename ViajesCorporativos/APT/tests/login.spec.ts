import { test, expect } from '@playwright/test';

const TEST_EMAIL = "vice@test.com";
const TEST_PASSWORD = "password123";

test.describe('Login NeoTravelFlow', () => {

  // Se ejecuta antes de cada test
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:3000/login');
  });

  test('Pasar por login y redirige a home', async ({ page }) => {
    // Llenar inputs
    await page.locator('input[name="email"]').fill(TEST_EMAIL);
    await page.locator('input[name="password"]').fill(TEST_PASSWORD);

    // Hacer clic en el botón de login
    await page.getByRole('button', { name: 'Ingresar Sesion' }).click();
    await page.waitForLoadState('networkidle') 
    // Esperar explícitamente a que la URL cambie a /Home
    await page.waitForURL('http://localhost:3000/Home', { timeout: 800000 });
    
    await expect(page.getByRole('heading', { name: 'Acciones rápidas' }))
    .toBeVisible({timeout: 15000});
  });

});
//Firefox = Pasan

//Chromium = Pasan
 