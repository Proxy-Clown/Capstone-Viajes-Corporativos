import { test, expect } from '@playwright/test';

test.describe('Página de Solicitud de Viaje', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:3000/soliuser');
  });

test('Debe mostrar el encabezado "Solicitud de Viaje"', async ({ page }) => {
    
    await expect(page.getByText("Solicitud de Viaje")).toBeVisible({ timeout: 100000 });
    await expect(page.getByText(/^Formulario$/)).toBeVisible({ timeout: 100000});
});

  test('El botón "Enviar solicitud" debe estar deshabilitado al cargar la página', async ({ page }) => {
    const submitButton = page.getByRole('button', { name: 'Enviar solicitud' });

  });

  test('Debe permitir completar y enviar el formulario', async ({ page }) => {
    // 1. Completar todos los campos obligatorios
    await page.fill('input[name="origin"]', 'Santiago');
    await page.fill('input[name="destination"]', 'Miami');
    await page.getByLabel('Fecha de salida').fill('2025-12-01');
    await page.getByLabel('Fecha de retorno').fill('2025-12-10');
    await page.fill('textarea[name="reason"]', 'Reunión de cierre anual con equipo.');

    // 2. Forzar clic en el botón aunque esté "disabled"
    const submitButton = page.getByRole('button', { name: 'Enviar solicitud' });

    await expect(submitButton).toBeEnabled({ timeout: 100000});
    await submitButton.click();
    

    // 3. Verificar que aparece mensaje de éxito
    await expect(page.getByText("Resumen", { exact: true })).toBeVisible({ timeout: 100000 });
  });

});
