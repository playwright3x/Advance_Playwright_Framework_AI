import { Page, Locator, expect } from '@playwright/test';

export class DashBoard 
{
   readonly page:Page
   readonly dashboardHeading:Locator
   readonly pimMenu :Locator
   readonly addEmployeeMenu:Locator


   constructor(page:Page)
   {
         this.page = page;
         this.dashboardHeading = page.getByRole("heading",{name:"Dashboard"})
         this.pimMenu = page.getByRole('link',{name:"PIM"})
         this.addEmployeeMenu =page.getByRole('link',{name:"Add Employee"})
   }

   async VerifyDashBoard()
   {
     await this.dashboardHeading.waitFor({state:'visible'})
   }

   async openAddEmployee()
   {
     await this.pimMenu.click();
     await this.addEmployeeMenu.click()
   }

}