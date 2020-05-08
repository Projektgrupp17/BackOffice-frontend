const express = require('express')
const app = express()
var cors = require('cors')
const port = 5558

const successToken = "eyJhbGciOiJSUzI1NiJ9.eyJqdGkiOiI4ZmQ2Y2U0MS03NTIyLTQ3OGItOWIzOC0xYWJhODRlZWE2NDciLCJpYXQiOjE1ODg5NDQ3NDEsInN1YiI6InRlc3RAZXhhbXBsZS5jb20iLCJpc3MiOiJwcm9qZWt0Z3J1cHAxNy1hdXRoIiwiZXhwIjoxNTg5MDMxMTQxfQ.bExQTVpKh31JVMZyG-CpKoVzLluur3MJtKXhf5BYTY-Mzn0b76AatyX5mT09hk6j6LE2lL8R2rCWio6GUXvTBoS-9Y3Gczp-MZv-vI3QPGo9gQIXFWGJurPj4JzsVwGtkmxPeo49C_R3Fih9jaUXEqUIAvzyQXi6d6LbQIkNBUYKJNnzgDynH6Rx4sB0k5qJfQraUlhrgprFExe0oVIgatvspXq9RxRHxzgM6r34soxaIuv4Ynjj62l0xaj3rsQd4hlQQFGkKOZ2G4rElAmjWUvPaU_MstpGZdSSdT1rwByj_0Lz2Ei3132L0oEH4z84rtAtMFxMehEsugbzvK48og"
module.exports = {
    getApp: app,
    start: function () {
        app.options('*', cors())
        app.use(cors())
        console.log("EXPRESS RUNNING")
        app.get('/', (req, res) => {
            console.log("RESPONDING!!!!!")
            res.send({message: "hello world"})
        })
        app.post('/auth/login', (req, res) => {
            console.log("POSTED AS");
            console.log(req);
            res.send({
                token: successToken,
                refreshtoken:"ca2115c9-5e9e-4dab-bb14-b67f50ba069a"
            });
        })
        app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))
    }
}