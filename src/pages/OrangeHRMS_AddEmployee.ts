import { Page, Locator, expect } from '@playwright/test';

export class AddEmployee 
{
    readonly page:Page
    readonly FirstName:Locator
    readonly lastName :Locator 
    readonly middle:Locator 
    readonly uploadImage:Locator;
    readonly saveButton: Locator;
    readonly employeeHeading: Locator;
    readonly employeeId:Locator;
    constructor(page:Page)
    {
         this.page= page;
         this.FirstName = page.getByPlaceholder('First Name')
         this.middle = page.getByPlaceholder('Middle Name')
         this.lastName = page.getByPlaceholder('Last Name')
         this.employeeHeading = page.getByRole('heading', {name: 'Add Employee',});
          this.employeeId = page.locator('input.oxd-input').nth(3);
           // Profile image file input
          this.uploadImage = page.locator('input[type="file"]');
          this.saveButton = page.getByRole('button', {name: 'Save'});
    }

       async uploadImageFile(filepath:string)
       {
           this.uploadImage.setInputFiles(filepath)
       }

       async add_Employee(fistName:string,middleName:string,lastName:string)
       {
           this.FirstName.fill(fistName)
           this.middle.fill(middleName)
           this.lastName.fill(lastName)
        
        

             this.saveButton.click();

       }

}