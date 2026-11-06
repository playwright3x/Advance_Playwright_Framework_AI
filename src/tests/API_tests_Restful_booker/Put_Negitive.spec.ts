import { test, expect } from '@playwright/test';


const apiUrl =
    process.env.API_BASE_URL || 'https://restful-booker.herokuapp.com';


test.describe('Restful Booker Booking API - PUT Negative Scenarios', () => {


    const headers = {
        Accept: 'application/json',
        'Content-Type': 'application/json',
    };


    const updatedPayload = {
        firstname: 'Shashank',
        lastname: 'Pandit',
        totalprice: 2500,
        depositpaid: false,
        bookingdates: {
            checkin: '2026-12-10',
            checkout: '2026-12-20',
        },
        additionalneeds: 'Lunch',
    };


    test('TC#3 @p1 - PUT : Verify update without auth token is rejected.',
        async ({ request }) => {


        let bookingId = 0;


        await test.step('Step 1 - Create Booking', async () => {


            const response = await request.post(`${apiUrl}/booking`, {

                headers,
                data: updatedPayload,

            });


            expect(response.status()).toBe(200);


            const body = await response.json();


            bookingId = body.bookingid;


            expect(bookingId).toBeTruthy();


            

        });



        await test.step('Step 2 - Update booking without token', async () => {


            const response = await request.put(
                `${apiUrl}/booking/${bookingId}`,
                {

                    headers,

                    data: updatedPayload,

                });


            expect(response.status()).toBe(403);


            const body = await response.text();


            expect(body).toContain('Forbidden');


        });


    });



    test('TC#4 @p1 - PUT : Verify update using invalid token is rejected.',
        async ({ request }) => {


        let bookingId = 0;



        await test.step('Step 1 - Create Booking', async () => {


            const response = await request.post(`${apiUrl}/booking`, {

                headers,
                data: updatedPayload,

            });



            expect(response.status()).toBe(200);



            const body = await response.json();



            bookingId = body.bookingid;



            expect(bookingId).toBeTruthy();


        });



        await test.step('Step 2 - Update booking with invalid token', async () => {


            const response = await request.put(
                `${apiUrl}/booking/${bookingId}`,
                {

                    headers: {

                        ...headers,

                        Cookie: 'token=InvalidToken123',

                    },


                    data: updatedPayload,


                });



            expect(response.status()).toBe(403);



            const body = await response.text();



            expect(body).toContain('Forbidden');



        });


    });




    test('TC#5 @p1 - PUT : Verify update of non existing booking returns 405.',
        async ({ request }) => {


        let token = '';



        await test.step('Step 1 - Generate Auth Token', async () => {



            const response = await request.post(`${apiUrl}/auth`, {


                headers,


                data: {


                    username: 'admin',

                    password: 'password123',


                },


            });



            expect(response.status()).toBe(200);



            const body = await response.json();



            token = body.token;



            expect(token).toBeTruthy();



        



        });




        await test.step('Step 2 - Update non existing booking', async () => {



            const response = await request.put(
                `${apiUrl}/booking/99999999`,
                {


                    headers: {


                        ...headers,


                        Cookie: `token=${token}`,


                    },


                    data: updatedPayload,


                });



            expect(response.status()).toBe(405);



            const body = await response.text();



            expect(body).toContain('Method Not Allowed');



        });


    });




    test('TC#6 @p1 - PUT : Verify update with missing mandatory field returns 400.',
        async ({ request }) => {



        let bookingId = 0;

        let token = '';




        const invalidPayload = {


            lastname: 'Pandit',


            totalprice: 2500,


            depositpaid: false,


            bookingdates: {


                checkin: '2026-12-10',


                checkout: '2026-12-20',


            },


            additionalneeds: 'Lunch',


        };





        await test.step('Step 1 - Generate Auth Token', async () => {



            const response = await request.post(`${apiUrl}/auth`, {



                headers,



                data: {



                    username: 'admin',


                    password: 'password123',


                },


            });



            expect(response.status()).toBe(200);



            const body = await response.json();



            token = body.token;



            expect(token).toBeTruthy();



        });






        await test.step('Step 2 - Create Booking', async () => {



            const response = await request.post(`${apiUrl}/booking`, {



                headers,


                data: updatedPayload,



            });



            expect(response.status()).toBe(200);




            const body = await response.json();




            bookingId = body.bookingid;



            expect(bookingId).toBeTruthy();




        });






        await test.step('Step 3 - Update without firstname', async () => {



            const response = await request.put(
                `${apiUrl}/booking/${bookingId}`,
                {


                    headers: {


                        ...headers,


                        Cookie: `token=${token}`,


                    },


                    data: invalidPayload,



                });



            expect(response.status()).toBe(400);



            const body = await response.text();



            expect(body.length).toBeGreaterThan(0);



        });



    });



});