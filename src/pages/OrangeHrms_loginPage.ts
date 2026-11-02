import { Page, Locator, expect } from '@playwright/test';

export class LoginPage
{
     readonly page:Page;
     readonly userName_input:Locator
     readonly password_input:Locator
     readonly Login_button :Locator
     constructor(page:Page)
     {
        this.page=page
        this.userName_input = page.getByRole("textbox",{name:"username"})
        this.password_input = page.getByRole("textbox",{name:"Password"})
        this.Login_button = page.getByRole("button",{name:" Login "})
     }

     //Page Action 
     async open()
     {
         await this.page.goto("https://opensource-demo.orangehrmlive.com/web/index.php/auth/login")
     }

     async Login_to_OrangeHrmApp(username:string, password:string)
     {
        await this.userName_input.fill(username)
        await this.password_input.fill(password)
        await this.Login_button.click();
     }

}