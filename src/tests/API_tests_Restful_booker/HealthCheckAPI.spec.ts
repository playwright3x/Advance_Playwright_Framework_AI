import {test,expect} from '@playwright/test';
import {request} from 'node:http';

const apiUrl = process.env.API_BASE_URL || 'https://restful-booker.herokuapp.com';


test('Health Check API', async ({ request }) => {
     
    const responseData = await request.get(`${apiUrl}/ping`);

    console.log("Status:", responseData.status());

    expect(responseData.status()).toBe(201);

});