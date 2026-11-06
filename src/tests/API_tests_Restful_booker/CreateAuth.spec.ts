import { test, expect } from '@playwright/test';

const apiUrl = process.env.API_BASE_URL || 'https://restful-booker.herokuapp.com';


test('Create Auth API', async ({ request }) => {

    const payload = {
        username: "admin",
        password: "password123"
    };


    const responseData = await request.post(`${apiUrl}/auth`, {

        data: payload,

        headers: {
            'Content-Type': 'application/json'
        }

    });


    console.log("Status:", responseData.status());

    const jsonData = await responseData.json();

      console.log("Response:", jsonData);

       console.log("Token:", jsonData.token);
   
       expect(responseData.status()).toBe(200);
       expect(jsonData.token).toBeTruthy();
});

        