const express = require('express')
const bodyParser = require('body-parser');
const app = express()
const cors = require('cors')
const equal = require('deep-equal');

const port = 5558;
let server;
let routes = []

const postRoutingFunc = function(req, res) {
    routes.map((route) => {
        console.log("handling: " + req.url);
        if(req.url == route.path) {
            if(equal(req.body, route.body)) {
                res.status(route.res.status)
                return setTimeout(() => {
                    res.send(route.res.body);
                }, route.delay)
            } 
        }
            console.error("NO MATCH FOR REQUEST WITH PATH: " + req.url + "\nBody:")
            console.error(req.body);
            throw "REQUEST MISMATCH";
    }) 
}

module.exports = {
    addResponse(path, body, res, delay = 0) {
        routes.push({path: path, body: body, res: res, delay: delay})
    },
    quit: function() {
        if(server) 
            server.close()
    },
    getApp: app,
    reset: function() {
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