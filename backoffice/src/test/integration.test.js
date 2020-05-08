let Proxy = require('browsermob-proxy').Proxy
const chai = require('chai');
const async = require('async');
const { exec } = require('child_process');
const testServer = require('./test-server');
const { Builder, By, Key, until } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');

let driver;
let proxy;
jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;


describe("integration test suite", () => {

    beforeEach((done) => {
        driver.get('http://localhost:5000').then(() => {
            setTimeout(() => {
                done();
            }, 500);
        })
    })

    afterAll((done) => {
        console.log("QUITTING")
        driver.quit().then(done());
    })

    beforeAll((done) => {
        async.parallel([
            function (cb) {
                console.log("STARTING SERVER FROM TEST")
                testServer.start();
                cb();
            },
            function (cb) {
                new Builder().forBrowser('chrome')
                .setChromeOptions(new chrome.Options().headless().windowSize({
                    width:800,
                    height:600
                }))
                .build().then((dr) => {
                    driver = dr;
                    console.log("DODOOOOENNE");
                    cb();
                })
            },
            function (cb) {
                exec('serve -s build');
                cb();
            },
        ], () => {
            console.log("DONE!!");
            done();
        }
        );
    })

    it("shows login and email input fields", async (done) => {
        /*fetch('http://localhost:5558')
        .then(response => response.json())
        .then(data => {
            console.log("I AM A TEAPOT")
            console.log(data)
            done();
        });
        */
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

    it("shows loading while loading", async (done) => {

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
        done();
    });
})


/*
const proxy = new Proxy();
const buildAndStart = (callback) => {
    console.log("Running");
    exec('npm build');

    async.parallel([
        function(cb){
            exec('serve -s build');
            cb(null, "serving build")
        },
    ],  callback
    );
}

async function test() {
    console.log("testing")

    console.log("starting webdriver")
    let driver = await new Builder().forBrowser('chrome').build();
    try {
        await driver.get('http://localhost:5000');
        let button = await driver.findElement(By.className('SignIn'));
        button.click();
        await driver.wait(until.elementLocated(By.id("loginbox")), 1000);
        //sendKeys('webdriver', Key.RETURN);
        let submitBtn = await driver.findElement(By.className('submit'));
        chai.expect(await submitBtn.isEnabled()).to.equal(false);
        let emailInput = await driver.findElement(By.name("name"));
        await emailInput.sendKeys('test@example.com');

        let passwordInput = await driver.findElement(By.name("password"));
        await passwordInput.sendKeys('Password1');

        chai.expect(await submitBtn.isEnabled()).to.equal(true);

        //await driver.wait(until.elementLocated(By.id("sdkljn")), 2000);
        //await driver.findElement(By.name("name")).sendKeys()
      } finally {
        await driver.quit();
      }

    process.exit()
}

buildAndStart(test)
*/