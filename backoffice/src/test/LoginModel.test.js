/**
 * Testfile for loginmodel
 * selenium
 */

import Login,{login} from './../model/LoginModel';
import configureStore from 'redux-mock-store';
import MockAdapter from 'axios-mock-adapter';
import thunk from 'redux-thunk';
import axios from 'axios';
const chai = require('chai');


it("Loginmodel is pressent", () =>{
    chai.expect(Login).to.not.equal(null)
})

const middleware = [thunk];

const mockStore = configureStore(middleware);

const mock = new MockAdapter(axios);
const store = mockStore({});

describe("Login is working accordlingly", () =>{

    beforeEach(() => {
        store.clearActions()
    })

    it('Should return a token', () =>{
        let expectedActions = [
            {
                type: 'POST_USER_LOGIN_REQUEST'
            },
            {
                type: "POST_USER_LOGIN_SUCCESS",
                payload:{
                    token: 'testingtoken',
                    refreshtoken: 'Testingtokenand'
                }
            }
        ]

        mock.onPost('https://iot-auth-staging.herokuapp.com/auth/login',{
            password:"Password1",
            email:"test@example.com"
        }).reply(201,{
            token:'testingtoken',
            refreshtoken:'Testingtokenand'
        });
 
        return store.dispatch(login("test@example.com","Password1"))
        .then(() =>{
            chai.expect(store.getActions()).to.deep.equal(expectedActions);
        })
               
    
    })

    it('Should return an error if password/user is wrong', () =>{
        let expectedActions = [
            {type:'POST_USER_LOGIN_REQUEST'},
            {type:'POST_USER_LOGIN_ERROR'}
        ]

    })
    
})