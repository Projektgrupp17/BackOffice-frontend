/**
 * Integration testing on an actual browser.    
 */

var pidtree = require('pidtree');
const chai = require('chai');
const async = require('async');
const exec = require('child_process').exec;
const testServer = require('./test-server');
const { Builder, By, until } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');

let driver;
jasmine.DEFAULT_TIMEOUT_INTERVAL = 20000;
let reactServer;

const loginSuccess = {
    token: "eyJhbGciOiJSUzI1NiJ9.eyJqdGkiOiI5MDI4OWU3Ni1lNjY1LTQyNzctYWY2Yi0yODc4MTUxY" +
        "jA3NWQiLCJpYXQiOjE1ODg5NTU2NDIsInN1YiI6InRlc3RAZXhhbXBsZS5jb20iLCJpc3MiOiJ" +
        "wcm9qZWt0Z3J1cHAxNy1hdXRoIiwiZXhwIjoxNTg5MDQyMDQyfQ.RbqTLxjRcBIm-SbNMdDCLO" +
        "2RXwnNX-YrjCSmc3szrfGqFgSu_Xy9rf_HxnrWGIsoBcnZi6IFYReR1CrbnvFif2SHYjYkHueO" +
        "0P8eNnqZWUfktcOAFxc_HL31BpkauO5Ljetn4jyBzr0Y408rwRYImhwHmWswW33p_r-vClefIo" +
        "khmd99Vlj9qUByxggIcPLyUdrB6pI-CQStz9kY87WG3pgf6z9Jh0sUXR1xNi2_lmLXOjKLULpX" +
        "1wsEi4PocTgLWxc0zWVj6ZlcvPp5kWhHNOybU1T0IU3FF7QebBhbAkUecw90Ch5jZsZ0kv8vg8" +
        "bfAeh3Juelk5ojofXmCCx4yQ",
    refreshToken: "a0dd7384-0fd0-47a8-8ccd-856ad05c09b1"
}

describe("integration test suite", () => {
    beforeEach((done) => {
        new Builder().forBrowser('chrome')
            //Remove headless to see the browser in real time
            .setChromeOptions(new chrome.Options().headless().windowSize({
                width: 1024,
                height: 768
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
        driver.close().then(() => { done() });
    })

    afterAll(async (done) => {
        let pids = await pidtree(reactServer.pid, { root: true })
        pids.map((pid) => {
            process.kill(pid, "SIGTERM")
        });
        testServer.quit();
        driver.quit().then(() => { done() });
    })

    beforeAll((done) => {
        async.parallel([
            function (cb) {
                testServer.start();
                cb();
            },
            function (cb) {
                reactServer = exec('serve -s build -p 5001');
                cb();
            },
        ], done
        );
    })

    it("shows all fields, button  becomes active all fieldds are typed", async (done) => {
        await driver.wait(until.titleIs('Backoffice'), 5000);
        let button = await driver.findElement(By.className('SignUp'));
        button.click();
        await driver.wait(until.elementLocated(By.id("signupbox")), 1000);
        let submitBtn = await driver.findElement(By.xpath('//*[@class="Button-signup"]/input'));
        chai.expect(await submitBtn.isEnabled()).to.equal(false);
        let emailInput = await driver.findElement(By.name("Email"));
        await emailInput.sendKeys('test@example.com');
        chai.expect(await submitBtn.isEnabled()).to.equal(false);

        let passwordInput = await driver.findElement(By.name("password"));
        await passwordInput.sendKeys('password');
        chai.expect(await submitBtn.isEnabled()).to.equal(false);

        let usernameInput = await driver.findElement(By.name("username"));
        await usernameInput.sendKeys('username');
        chai.expect(await submitBtn.isEnabled()).to.equal(false);

        let agencyInput = await driver.findElement(By.name("agecy"));
        await agencyInput.sendKeys('agency');
        chai.expect(await submitBtn.isEnabled()).to.equal(true);
        
        await agencyInput.clear();
        await agencyInput.sendKeys('q\b');
        chai.expect(await submitBtn.isEnabled()).to.equal(false);
        done();
    });

    it("shows error messages after invalid login", async (done) => {
        testServer.addResponse('/users/',
            {
                username: 'username',
                email: 'test@example.com',
                password: 'password',
                agency: 'agency'
            },
            {
                status: 400,
                body: { status: "error", message: "invalid email" }
            }, 500);


        await driver.wait(until.titleIs('Backoffice'), 5000);
        let button = await driver.findElement(By.className('SignUp'));
        button.click();
        await driver.wait(until.elementLocated(By.id("signupbox")), 1000);
        let submitBtn = await driver.findElement(By.xpath('//*[@class="Button-signup"]/input'));

        let emailInput = await driver.findElement(By.name("Email"));
        await emailInput.sendKeys('test@example.com');

        let passwordInput = await driver.findElement(By.name("password"));
        await passwordInput.sendKeys('password');

        let usernameInput = await driver.findElement(By.name("username"));
        await usernameInput.sendKeys('username');

        let agencyInput = await driver.findElement(By.name("agecy"));
        await agencyInput.sendKeys('agency');
        chai.expect(await submitBtn.isEnabled()).to.equal(true);
        submitBtn.click();
        await driver.wait(until.elementLocated(By.xpath("//*[text()='Loading...']")), 5000);
        await driver.wait(until.elementLocated(By.xpath("//*[text() ='Error: invalid email']")), 1000);
        done();
    })

    it("signing up shows home", async (done) => {
        testServer.addResponse('/users/',
            {
                username: 'username',
                email: 'test@example.com',
                password: 'password',
                agency: 'agency'
            },
            {
                status: 201,
                body: { "status": "ok" }
            }, 500);

        testServer.addResponse('/auth/login',
            { email: "test@example.com", password: "password" },
            {
                status: 201,
                body: loginSuccess
            }, 500);

        await driver.wait(until.titleIs('Backoffice'), 5000);
        let button = await driver.findElement(By.className('SignUp'));
        button.click();
        await driver.wait(until.elementLocated(By.id("signupbox")), 1000);
        let submitBtn = await driver.findElement(By.xpath('//*[@class="Button-signup"]/input'));

        let emailInput = await driver.findElement(By.name("Email"));
        await emailInput.sendKeys('test@example.com');

        let passwordInput = await driver.findElement(By.name("password"));
        await passwordInput.sendKeys('password');

        let usernameInput = await driver.findElement(By.name("username"));
        await usernameInput.sendKeys('username');

        let agencyInput = await driver.findElement(By.name("agecy"));
        await agencyInput.sendKeys('agency');

        submitBtn.click();
        await driver.wait(until.elementLocated(By.xpath("//*[text()='Loading...']")), 1000);
        await driver.wait(until.elementLocated(By.id("Menu")), 1000);
        done();
    });

})