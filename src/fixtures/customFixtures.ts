
import { test as base, expect } from '@playwright/test';
import { LoginPage } from '../pages/OrangeHrms_loginPage';
import { DashBoard } from '../pages/OrangeHrm_DashBoard_page';
import {AddEmployee } from '../pages/OrangeHRMS_AddEmployee';


type MyFixture = {
    loginPage: LoginPage;
    Dashboard: DashBoard;
    employee: AddEmployee;
};

export const test = base.extend<MyFixture>({
    loginPage: async ({ page }, use) => {
        await use(new LoginPage(page));
    },

    Dashboard: async ({ page }, use) => {
        await use(new DashBoard(page));
    },

    employee: async ({ page }, use) => {
        await use(new AddEmployee(page));
    }
});

export { expect };