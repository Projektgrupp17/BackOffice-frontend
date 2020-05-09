const express = require('express')
const bodyParser = require('body-parser');
const app = express()
const cors = require('cors')
const equal = require('deep-equal');

const port = 5558;
let server;
let routes = []

const postRoutingFunc = function (req, res) {
    //Allow one trailing slash discrepancy, but not more, that would be a bug!
    let url = req.url.replace(/\/$/, "");
    let i = 0;
    console.log("handling: " + req.url);
    for (i = 0; i < routes.length; i++) {
        let route = routes[i];
        let path = route.path.replace(/\/$/, "");
        if (url == path) {
            if (equal(req.body, route.body)) {
                return setTimeout(() => {
                    res.status(route.res.status);
                    res.send(route.res.body);
                }, route.delay)
            }
        }
    }
    console.error("NO MATCH FOR REQUEST WITH PATH: " + req.url + "\nBody:")
    console.error(req.body);
    throw "REQUEST MISMATCH";
}

module.exports = {
    addResponse(path, body, res, delay = 0) {
        routes.push({ path: path, body: body, res: res, delay: delay })
    },
    quit: function () {
        if (server)
            server.close()
    },
    reset: function () {
        routes = [];
    },
    start: function () {
        app.options('*', cors())
        app.use(cors())
        app.use(bodyParser.json())
        app.post('/*', postRoutingFunc)
        server = app.listen(port, () => console.log(`mock server listening at http://localhost:${port}`))
    }
}