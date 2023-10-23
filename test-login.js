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

        console.log("login successful")
    } finally {
        await driver.sleep(2000);
        await driver.quit();
        console.log("login successful")
    }
})();
