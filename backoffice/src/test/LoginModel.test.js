/**
 * Testfile for loginmodel
 * selenium
 */

import Login,{login} from '../model/LoginModel';
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
        mock.resetHistory();
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
        }).replyOnce(201,{
            token:'testingtoken',
            refreshtoken:'Testingtokenand'
        });
 
        return store.dispatch(login("test@example.com","Password1"))
        .then(() =>{
            chai.expect(store.getActions()).to.deep.equal(expectedActions);
        })
               
    
    })

    it('Should return an error if password is wrong', () =>{
        let expectedActions = [
            {type:'POST_USER_LOGIN_REQUEST'},
            {type:'POST_USER_LOGIN_ERROR',payload:"Invalid login"}
        ]

        mock.onPost('https://iot-auth-staging.herokuapp.com/auth/login',{
            password:"Password11",
            email:"test@example.com"
        })
        .replyOnce(401,{message:'Invalid login'
        });
        

        return store.dispatch(login('test@example.com','Password11'))
        .then(() =>{
            chai.expect(store.getActions()).to.be.deep.equal(expectedActions)
        })

    })

    it('Should return an error if email is wrong', () =>{
        let expectedActions = [
            {type:'POST_USER_LOGIN_REQUEST'},
            {type:'POST_USER_LOGIN_ERROR',payload:"Invalid login"}
        ]

        mock.onPost('https://iot-auth-staging.herokuapp.com/auth/login',{
            password:"Password1",
            email:"test@exaple.com"
        })
        .replyOnce(401,{
            message:"Invalid login"
        });

        return store.dispatch(login('test@exaple.com','Password1'))
        .then(() =>{chai.expect(store.getActions()).to.be.deep.equal(expectedActions)})

    });

    it('Should return an error if no connection', () =>{
        let expectedActions = [
            {type:'POST_USER_LOGIN_REQUEST'},
            {type:'POST_USER_LOGIN_ERROR',payload:"No connection to server"}
        ]

        mock.onPost('https://iot-auth-staging.herokuapp.com/auth/login',{
            password:"Password1",
            email:"test@example.com"
        }).networkError()

        return store.dispatch(login('test@example.com','Password1'))
        .then(() =>{
            console.log(store.getActions())
            chai.expect(store.getActions()).to.be.deep.equal(expectedActions)
        })

    });
    
})