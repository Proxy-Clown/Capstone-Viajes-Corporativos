import {test,expect} from "@playwright/test";

test('prueba', async({page})=> {
    await page.goto('http://localhost:3000/login');

    await page.getByRole("textbox")
              .filter({hasText:'m@example.com'})
              .fill("vice@test.com")
    await page.getByRole("textbox")
              .filter({hasText:'********'})
              .fill('password123');
    await page.getByRole('button')
              .filter({})
    
});

//logintest