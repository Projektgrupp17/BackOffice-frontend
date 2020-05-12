/**
 * Integration testing on an actual browser.    
 */

var pidtree = require('pidtree');
const expect = require('chai').expect;
const async = require('async');
const exec = require('child_process').exec;
const testServer = require('./test-server');
const { Builder, By, until } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');

let driver;
jasmine.DEFAULT_TIMEOUT_INTERVAL = 20000;
let reactServer;
const fakeToken =   "eyJhbGciOiJSUzI1NiJ9.eyJqdGkiOiJGQUtFX1RPS0VOIiwiaWF0IjoxNTg5Mjk5MDY0LCJzdWIiOiJGQUtFX1VTRVIiLCJpc"+
                    "3MiOiJwcm9qZWt0Z3J1cHAxNy1hdXRoIiwiZXhwIjoxNTg5Mzk5MDY0fQ.nPMqKu0ViiWt49FaOejM4VDSj3VelJLw8qlvNSvY"+
                    "Wniaz9hCbzs7tCS79Modn0aoS9COnyQiKrK-Q6GVKvabbBH62oWhEWNSodG0Dg355OD4lsl6-nQFjhjkAesnxvEXNs60VFlLV"+
                    "EhMlCARQk3CieFGMrj7LOr3s4ytUFUpP4DzsxSpdKqHyDI8klDHpqYZzrXcD2QI7opMqNbSjDRnRKG29cfR-nJiEXhyh29Og0X"+
                    "xuKURe4UI5NBwTU9tp75tbPJArjU_AYZVjqg-cpL-ErSkwAuNjfngs3CAs4-1nUhMsap0lARpuxaYdiJr1nzWWCmkYq-ECugfc"+
                    "JG41C0Atw"

const loggedInCookie = {
    name: "", 
    value:`{"loginUser":{"loading":false,"auth":{"token":"${fakeToken}","refreshtoken":"e16bd580-036b-4aae-b59d-2902bd25e3af"},"error":""},"signupUser":{"userIsSignedUp":false,"loading":false,"error":""},"userInfo":{"loading":false,"user":{"username":null,"email":null,"agency":null},"error":null},"userUpdate":{"loading":false,"message":null,"error":null}}`
}

const interestsResponse = [{"id": 1,string: "interest1"},{id: 2,string: "interest2"}]

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
        testServer.reset();
        new Builder().forBrowser('chrome')
            //Remove headless to see the browser in real time
            .setChromeOptions(new chrome.Options().windowSize({
                width: 1024,
                height: 768
            }))
            .build().then((dr) => {
                driver = dr;
            }).then(() => {
                driver.get('http://localhost:5001').then(() => {
                    driver.manage().addCookie(loggedInCookie).then(done);
                })
            })
    })

    afterEach((done) => {
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

    it('should have the correct UI elements', async (done) => {
        testServer.addGetResponse('/order/intrests',
        {},
        {
            status: 200,
            body: interestsResponse
        }, 10);
        await driver.get('http://localhost:5001/order')
        await driver.findElement(By.xpath("//*/b[text() = 'Credits:']"))
        await driver.findElement(By.xpath("//*/b[text() = 'Start Date:']"))
        await driver.findElement(By.xpath("//*/b[text() = 'End Date:']"))
        await driver.findElement(By.xpath("//*/b[text() = 'Add a video:']"))
        expect(await driver.findElement(By.name("credits")).getAttribute('value')).is.equal('100');
        let startDateValue = await driver.findElement(By.name("start date")).getAttribute('value')
        expect(startDateValue).to.equal(''+new Date().getFullYear() + '-' + ("0" + new Date().getMonth()).slice(-2) + '-' + ("0" + new Date().getDate()).slice(-2))
        let endDateValue = await driver.findElement(By.name("end date")).getAttribute('value')
        expect(endDateValue).to.equal(''+new Date().getFullYear() + '-' + ("0" + new Date().getMonth()).slice(-2) + '-' + ("0" + new Date().getDate()).slice(-2))
        
        expect(await driver.findElement(By.name("url")).getAttribute('value')).is.equal('');
        await driver.findElement(By.xpath("//*/button[text()='Add']"))
        await driver.findElement(By.xpath("//*/input[@value='Confirm order']"))
        await driver.findElements(By.xpath("//*/select/option"));
        done();
    })

    
    it("should validate state correctly", async (done) => {
        testServer.addGetResponse('/order/intrests',
        {},
        {
            status: 200,
            body: interestsResponse
        }, 10);
        await driver.get('http://localhost:5001/order');
        expect(await driver.findElement(By.xpath("//*/button[text()='Add']")).isEnabled()).to.equal(false);
        expect(await driver.findElement(By.xpath("//*/input[@value='Confirm order']")).isEnabled()).to.equal(false);
        
        let listOptions = await driver.findElements(By.xpath("//*/select/option"));
        expect(listOptions.length).to.equal(3);
        expect(await listOptions[0].getAttribute("value")).to.equal("default");
        expect(await listOptions[0].isEnabled()).to.equal(false);
        expect(await listOptions[1].getAttribute("value")).to.equal("interest1");
        expect(await listOptions[2].getAttribute("value")).to.equal("interest2");
     
        await driver.findElement(By.name("url")).sendKeys('http://example.com/video');
        expect(await driver.findElement(By.xpath("//*/button[text()='Add']")).isEnabled()).to.equal(false);
        await listOptions[1].click();
        expect(await driver.findElement(By.xpath("//*/button[text()='Add']")).isEnabled()).to.equal(true);
        await driver.findElement(By.xpath("//*/button[text()='Add']")).click();
        expect(await driver.findElement(By.xpath("//*/button[text()='Add']")).isEnabled()).to.equal(false);
        expect(await driver.findElement(By.xpath("//*/input[@value='Confirm order']")).isEnabled()).to.equal(true);
        done();
    });

    it("should add and remove videos", async (done) => {
        testServer.addGetResponse('/order/intrests',
        {},
        {
            status: 200,
            body: interestsResponse
        }, 10);
        await driver.get('http://localhost:5001/order');
        expect(await driver.findElement(By.xpath("//*/button[text()='Add']")).isEnabled()).to.equal(false);
        expect(await driver.findElement(By.xpath("//*/input[@value='Confirm order']")).isEnabled()).to.equal(false);
        
        let listOptions = await driver.findElements(By.xpath("//*/select/option"));
        
        await driver.findElement(By.name("url")).sendKeys('http://example.com/video1');
        await listOptions[1].click();
        await driver.findElement(By.xpath("//*/button[text()='Add']")).click();

        await driver.findElement(By.name("url")).sendKeys('http://example.com/video2');
        await listOptions[2].click();
        await driver.findElement(By.xpath("//*/button[text()='Add']")).click();
        
        let url0 = await driver.findElement(By.id("order-vid-url0"))
        expect(await url0.isEnabled()).to.equal(false);
        expect(await url0.getAttribute("value")).to.equal("http://example.com/video1");
        let url1 = await driver.findElement(By.id("order-vid-url1"))
        expect(await url1.isEnabled()).to.equal(false);
        expect(await url1.getAttribute("value")).to.equal("http://example.com/video2");
        let videoDivs = await driver.findElements(By.xpath('//*/div[@id="order-video-list"]/*'));
        expect(videoDivs.length).to.equal(2);
        await videoDivs[0].findElement(By.xpath("button")) .click();
        videoDivs = await driver.findElements(By.xpath('//*/div[@id="order-video-list"]/*'));
        expect(videoDivs.length).to.equal(1);

        let url = await driver.findElement(By.id("order-vid-url0"))
        expect(await url.getAttribute("value")).to.equal("http://example.com/video2");
        expect(await driver.findElement(By.xpath("//*/input[@value='Confirm order']")).isEnabled()).to.equal(true);
        await driver.findElement(By.xpath("//button[text() = '-']")).click();
        expect(await driver.findElement(By.xpath("//*/input[@value='Confirm order']")).isEnabled()).to.equal(false);
        done();
    });

    it("should send valid order and display success message", async (done) => {
        ///Todo verify that this goes to receipt
        testServer.addGetResponse('/order/intrests',
        {},
        {
            status: 200,
            body: interestsResponse
        }, 10);

        await driver.get('http://localhost:5001/order');
        let startDateValue = await driver.findElement(By.name("start date")).getAttribute('value')
        
        testServer.addPostResponse('/order/add',
        {
            user: 'FAKE_USER',
            credits: 100,
            video: [
              {
                url: 'http://example.com/video1',
                length: 100,
                interest: 'interest1'
              },
              {
                url: 'http://example.com/video2',
                length: 100,
                interest: 'interest2'
              }
            ],
            Startdate: `${startDateValue}T00:00:00.000Z`,
            Enddate: `${startDateValue}T00:00:00.000Z`
          },
        {
            status: 201,
            body: "created_order_id"
        }, 100);

        let listOptions = await driver.findElements(By.xpath("//*/select/option"));

        await driver.findElement(By.name("url")).sendKeys('http://example.com/video1');
        await listOptions[1].click();
        await driver.findElement(By.xpath("//*/button[text()='Add']")).click();

        await driver.findElement(By.name("url")).sendKeys('http://example.com/video2');
        await listOptions[2].click();

        await driver.findElement(By.xpath("//*/button[text()='Add']")).click();
        
        await driver.findElement(By.xpath("//*/input[@value='Confirm order']")).click();
        done();
    });


    it("should send invalid order and display error message", async (done) => {
        ///Todo verify that this shows error message
        testServer.addGetResponse('/order/intrests',
        {},
        {
            status: 200,
            body: interestsResponse
        }, 10);
        
        await driver.get('http://localhost:5001/order');
        let startDateValue = await driver.findElement(By.name("start date")).getAttribute('value')
        
        testServer.addPostResponse('/order/add',
        {
            user: 'FAKE_USER',
            credits: 100,
            video: [
              {
                url: 'http://example.com/video1',
                length: 100,
                interest: 'interest1'
              },
              {
                url: 'http://example.com/video2',
                length: 100,
                interest: 'interest2'
              }
            ],
            Startdate: `${startDateValue}T00:00:00.000Z`,
            Enddate: `${startDateValue}T00:00:00.000Z`
          },
        {
            status: 400,
            body: "bad request"
        }, 300);

        let listOptions = await driver.findElements(By.xpath("//*/select/option"));

        await driver.findElement(By.name("url")).sendKeys('http://example.com/video1');
        await listOptions[1].click();
        await driver.findElement(By.xpath("//*/button[text()='Add']")).click();

        await driver.findElement(By.name("url")).sendKeys('http://example.com/video2');
        await listOptions[2].click();

        await driver.findElement(By.xpath("//*/button[text()='Add']")).click();
        await driver.findElement(By.xpath("//*/input[@value='Confirm order']")).click();
        //await driver.wait(until.elementLocated(By.xpath("//*[text() = 'Loading...']")), 500);
        await driver.wait(until.elementLocated(By.xpath("//*[text() = 'There was an error with the request']")), 1000);
        setTimeout(done, 5000)
    });
})