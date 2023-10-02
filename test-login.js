const { Builder, By } = require('selenium-webdriver');


(async function testLoginForm() {
    const driver = await new Builder().forBrowser('firefox').build();
    try {
        // Navigate to your app
        await driver.get('http://localhost:3000/auth/login');  // replace with your app's URL

        // Fill out the form
        await driver.findElement(By.name('username')).sendKeys('admin');
        await driver.findElement(By.name('password')).sendKeys('admin');

        // Click the login button
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
        console.assert(toastText.includes('login successful'), 'Test of login success', toastText);
    } finally {
        await driver.sleep(2000);
        await driver.quit();
    }
})();
