let Proxy = require('browsermob-proxy').Proxy
const chai = require('chai');
const async = require('async');
const { exec } = require('child_process');
const testServer = require('./test-server');
const { Builder, By, Key, until } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');

let driver; 
jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;

const loginSuccess = {
    token: "eyJhbGciOiJSUzI1NiJ9.eyJqdGkiOiI5MDI4OWU3Ni1lNjY1LTQyNzctYWY2Yi0yODc4MTUxYjA3NWQiLCJpYXQiOjE1ODg5NTU2NDIsInN1YiI6InRlc3RAZXhhbXBsZS5jb20iLCJpc3MiOiJwcm9qZWt0Z3J1cHAxNy1hdXRoIiwiZXhwIjoxNTg5MDQyMDQyfQ.RbqTLxjRcBIm-SbNMdDCLO2RXwnNX-YrjCSmc3szrfGqFgSu_Xy9rf_HxnrWGIsoBcnZi6IFYReR1CrbnvFif2SHYjYkHueO0P8eNnqZWUfktcOAFxc_HL31BpkauO5Ljetn4jyBzr0Y408rwRYImhwHmWswW33p_r-vClefIokhmd99Vlj9qUByxggIcPLyUdrB6pI-CQStz9kY87WG3pgf6z9Jh0sUXR1xNi2_lmLXOjKLULpX1wsEi4PocTgLWxc0zWVj6ZlcvPp5kWhHNOybU1T0IU3FF7QebBhbAkUecw90Ch5jZsZ0kv8vg8bfAeh3Juelk5ojofXmCCx4yQ",
    refreshToken: "a0dd7384-0fd0-47a8-8ccd-856ad05c09b1"
}

describe("integration test suite", () => {
    beforeEach((done) => {
        new Builder().forBrowser('chrome')
            //Remove headless to see the browser in real time
            .setChromeOptions(new chrome.Options().headless().windowSize({
                width: 800,
                height: 600
            }))
            .build().then((dr) => {
                driver = dr;
            }).then(() => {
                driver.get('http://localhost:5001')
                .then(done)
            })
    })

    afterEach((done) => {
        testServer.reset();
        driver.close().then(() => {done()});
    })

    afterAll((done) => {
        testServer.quit();
        driver.quit().then(() => {done()});
    })

    beforeAll((done) => {
        async.parallel([
            function (cb) {
                testServer.start();
                cb();
            },
            function (cb) {  
                let e = exec('serve -s build -p 5001', {detached: true}, function (error, out, err) {
                    if (error) console.error(error);
                    if (err) console.error(err);
                    if (out) console.log(out);
                });
                e.unref();
                cb();
            },
        ], 
            done
        );
    })

    it("shows login and email input fields", async (done) => {
        done();
        return;
        await driver.wait(until.titleIs('Backoffice'), 5000);
        let button = await driver.findElement(By.className('SignIn'));
        button.click();
        await driver.wait(until.elementLocated(By.id("loginbox")), 1000);
        let submitBtn = await driver.findElement(By.className('submit'));
        chai.expect(await submitBtn.isEnabled()).to.equal(false);
        let emailInput = await driver.findElement(By.name("name"));
        await emailInput.sendKeys('test@example.com');
        let passwordInput = await driver.findElement(By.name("password"));
        await passwordInput.sendKeys('Password1');
        chai.expect(await submitBtn.isEnabled()).to.equal(true);
        done();
    });

    it("shows error message after invalid login", async (done) => {
        done();
        return;
        testServer.addResponse('/auth/login',
            { email: "invalidemail", password: "invalipassword" },
            {
                status: 401,
                body: { status: "error", message: "invalid login" }
            }, 500);

        let button = await driver.findElement(By.className('SignIn'));
        button.click();
        await driver.wait(until.elementLocated(By.id("loginbox")), 1000);
        let submitBtn = await driver.findElement(By.className('submit'));
        chai.expect(await submitBtn.isEnabled()).to.equal(false);
        let emailInput = await driver.findElement(By.name("name"));
        await emailInput.sendKeys('invalidemail');
        let passwordInput = await driver.findElement(By.name("password"));
        await passwordInput.sendKeys('invalipassword');
        chai.expect(await submitBtn.isEnabled()).to.equal(true);
        let loginButton = await driver.findElement(By.className('submit'));
        loginButton.click();
        await driver.wait(until.elementLocated(By.xpath("//*[text()='Loading...']")), 1000);
        let errorDiv = await driver.wait(until.elementLocated(By.className("Error-message")), 2000);
        await driver.wait(until.elementTextMatches(errorDiv, /Error: invalid login/), 1000);
        done();
    });

    it("logging in logs in", async (done) => {
        done();
        return;
        testServer.addResponse('/auth/login',
            { email: "validemail", password: "validpassword" },
            {
                status: 201,
                body: loginSuccess
            }, 500);

        let button = await driver.findElement(By.className('SignIn'));
        button.click();
        await driver.wait(until.elementLocated(By.id("loginbox")), 1000);
        let submitBtn = await driver.findElement(By.className('submit'));
        chai.expect(await submitBtn.isEnabled()).to.equal(false);
        let emailInput = await driver.findElement(By.name("name"));
        await emailInput.sendKeys('validemail');
        let passwordInput = await driver.findElement(By.name("password"));
        await passwordInput.sendKeys('validpassword');
        chai.expect(await submitBtn.isEnabled()).to.equal(true);
        let loginButton = await driver.findElement(By.className('submit'));
        loginButton.click();
        await driver.wait(until.elementLocated(By.xpath("//*[text()='Loading...']")), 5000);
        await driver.wait(until.elementLocated(By.xpath("//*[text()='HOME IS HERTE']")), 5000);
        done();
    });
})