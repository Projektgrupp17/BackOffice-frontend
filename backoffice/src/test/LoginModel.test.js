import React from 'react';
import LoginModel from '../model/LoginModel';
import * as Chai from 'chai';


it("Both refresh and auth is here!",()=>{
    LoginModel.login("test@example.COM","Password1");
    var tester = LoginModel.getAuthToken;
    var tester2 = LoginModel.getAuthRefreshToken;
    Chai.assert.notEqual(tester,undefined,"This should have a auth token");
    Chai.assert.notEqual(tester2,undefined,"This should have a refresh token");

})