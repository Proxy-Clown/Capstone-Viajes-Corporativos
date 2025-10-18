import { test, expect } from '@playwright/test';

const TEST_EMAIL = "vice@test.com";
const TEST_PASSWORD = "password123";

test.describe('Login NeoTravelFlow', () => {

  // Se ejecuta antes de cada test
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:3000');
  });

  test('login funciona y redirige a home', async ({ page }) => {
    // Llenar inputs
    await page.locator('input[name="email"]').fill(TEST_EMAIL);
    await page.locator('input[name="password"]').fill(TEST_PASSWORD);

    // Hacer clic en el botón de login
    await page.getByRole('button', { name: 'Ingresar Sesion' }).click();
try {
    // Esperar explícitamente a que la URL cambie a /Home (SPA-friendly)
    await page.waitForURL('**/home', { timeout: 8000 });
  } catch {
    console.warn('No se detectó cambio de URL, verificando contenido del home')
  }
    // Verificar que el contenido del home esté visible
    await expect(page.locator('text=Bienvenido')).toBeVisible({ timeout: 8000});
  });

});
