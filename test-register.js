const { Builder, By } = require('selenium-webdriver');


(async function testRegisterForm() {
    const driver = await new Builder().forBrowser('firefox').build();
    try {
        // Navigate to your app
        await driver.get('http://localhost:3000/auth/register');  // replace with your app's URL

        // Fill out the form
        await driver.findElement(By.name('username')).sendKeys('testuser');
        await driver.findElement(By.name('password')).sendKeys('testpass');
        await driver.findElement(By.name('confirm')).sendKeys('testpass');

        // Click the Create account button
        await driver.findElement(By.css('button[type="submit"]')).click();

        // Wait for the success toast to appear and check its text
        let successToast;
        for (let i = 0; i < 10; i++) {  // retry up to 10 times
            try {
                successToast = await driver.findElement(By.css('.Toastify__toast--success'));
                break;
            } catch (error) {
                await driver.sleep(500);  // wait 500ms and try again
            }
        }
        const toastText = await successToast.getText();
        console.log("register test successful")
    } 
    finally {
        console.log()
    }
})();
