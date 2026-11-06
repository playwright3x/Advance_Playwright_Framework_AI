import { test, expect } from '@playwright/test';
import { request } from 'node:http';

const apiUrl = process.env.API_BASE_URL || 'https://restful-booker.herokuapp.com';

test.describe("Restful Booker booking API", () => {

    test("TC#2 @p0 - PUT : Verify that update the existing booking is working fine.", async ({ request }) => {


        const header = {
            'Content-Type': 'application/json',
        }

        const Booking_payload = {

            "firstname": "James",
            "lastname": "Brown",
            "totalprice": 111,
            "depositpaid": true,
            "bookingdates": {
                "checkin": "2018-01-01",
                "checkout": "2019-01-01"
            },
            "additionalneeds": "Breakfast"
        }

        const Updated_Booking_payload = {

            "firstname": "john",
            "lastname": "smith",
            "totalprice": 111,
            "depositpaid": true,
            "bookingdates": {
                "checkin": "2018-01-01",
                "checkout": "2019-01-01"
            },
            "additionalneeds": "No"
        }

        let token = "";
        let bookingId = 0;


        const auth_Payload = {
            username: "admin",
            password: "password123"
        };


        // Token 
        await test.step("Create Auth Token", async () => {
            const createAuth = await request.post(`${apiUrl}/auth`, {
                headers: header,
                data: auth_Payload

            })


            const authResponse = await createAuth.json();
            token = authResponse.token;
        });
        // create Booking
        await test.step("Create Booking", async () => {
            const createBooking = await request.post(`${apiUrl}/booking`, {
                headers: header,
                data: Booking_payload

            })

            const booking_Response = await createBooking.json();
            bookingId = booking_Response.bookingid;
        });

        // Update Booking
        await test.step("Update Booking", async () => {
            const updateBooking = await request.put(`${apiUrl}/booking/${bookingId}`, {
                headers: {
                    ...header,
                    'Cookie': `token=${token}`
                },
                data: Updated_Booking_payload
            })
            expect(updateBooking.status()).toBe(200);
            const updateBooking_Response = await updateBooking.json();

            expect(updateBooking_Response.firstname).toBe(Updated_Booking_payload.firstname);

            expect(updateBooking_Response.lastname).toBe(Updated_Booking_payload.lastname)

            expect(updateBooking_Response.additionalneeds).toBe(Updated_Booking_payload.additionalneeds)

        });

    });

});

