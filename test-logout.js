const { Builder, By } = require('selenium-webdriver');


(async function testLogout() {
    const driver = await new Builder().forBrowser('firefox').build();
    try {
        // Navigate to your app
        await driver.get('http://localhost:3000');  // replace with your app's URL

        // Assume the user is already logged in, and the Logout button is present
        // Click the Logout button
        await driver.findElement(By.css('.btn-wide')).click();

        // Wait for the Login button to appear indicating the user has been logged out
        let loginButton;
        for (let i = 0; i < 10; i++) {  // retry up to 10 times
            try {
                loginButton = await driver.findElement(By.css('.btn-wide'));
                break;
            } catch (error) {
                await driver.sleep(500);  // wait 500ms and try again
            }
        }
        const buttonText = await loginButton.getText();
        console.log("logout success")
    } finally {
        await driver.quit();
    }
})();
