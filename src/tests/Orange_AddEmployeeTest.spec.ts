import {test,expect} from '../fixtures/customFixtures'
import path from 'path';
import fs from 'fs';
test('Add employee with profile image', async ({
  loginPage,
  Dashboard,
  employee,
  page,
}) => {

     const imagePath = path.resolve(
    process.cwd(),
    'src',
    'fixtures',
    'images',
    'images (2).jpeg'
);

       // login 

       await loginPage.open();
       await loginPage.Login_to_OrangeHrmApp("Admin","admin123")

        // Dashboard

        await Dashboard.VerifyDashBoard()
        await Dashboard.openAddEmployee();

        //Add_Employee

        await employee.add_Employee(
        "rekha",
        "Kumar",
        "Sharma",
        )

});
