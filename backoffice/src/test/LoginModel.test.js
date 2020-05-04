/**
 * Login UnitTest: done
 */

import Login,{login,refresh} from '../model/LoginModel';
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
            let mockStore = {
                auth:{
                    token:store.getActions()[1].payload.token,
                    refreshtoken:store.getActions()[1].payload.refreshtoken
                }
            }
            store.getState= () => mockStore

            chai.expect(store.getActions()).to.deep.equal(expectedActions);
            chai.assert(store.getState().auth.token === 'testingtoken' 
            && store.getState().auth.refreshtoken === 'Testingtokenand')
        })
               
    
    })

    it('store is uppdated with tokens',()=>{

        mock.onPost('https://iot-auth-staging.herokuapp.com/auth/login',{
            password:"Password1",
            email:"test@example.com"
        }).replyOnce(201,{
            token:'testingtoken',
            refreshtoken:'Testingtokenand'
        });

        return store.dispatch(login("test@example.com","Password1"))
        .then(() =>{
            let mockState ={
                auth:{
                    token: store.getActions()[1].payload.token,
                    refreshtoken:store.getActions()[1].payload.refreshtoken
                }
            }
            store.getState = () => mockState
            chai.assert(store.getState().auth.token === 'testingtoken')
            chai.assert(store.getState().auth.refreshtoken === 'Testingtokenand')
        }
        )
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
            chai.expect(store.getActions()).to.be.deep.equal(expectedActions)
        })

    });
    
})

describe("Refreshing the site is made correctly",() =>{

    beforeEach(() => {
        store.clearActions()
        mock.resetHistory();
    })


    it("Sends a refresh call", () =>{
        let auth ={
            token:"testing",
            refreshtoken:"refreshing"
        }
        let expectedActions=[
            {   type:'REFRESH_USER_LOGIN',
                payload:{token: 'testingtoken',refreshtoken: 'Testingtokenand'}
            }
        ]

        mock.onPost('https://iot-auth-staging.herokuapp.com/auth/refresh',
            {
                headers:
                        {
                            "Auth-Token": "testing",
                            "Refresh-Token": "refreshing"
                        }
            }
            )
        .reply(200, {
            data:{
                token: 'testingtoken',
                refreshtoken: 'Testingtokenand'
            }
        });


    });
        it('Updates token on refresh action', () =>{
            let mocks ={
                auth:{
                    token:"testing",
                    refreshtoken:"refreshing"
                }
            }
            store.getState = () => mocks
            let auth ={
                token:"testing",
                refreshtoken:"refreshing"
            }

            mock.onPost('https://iot-auth-staging.herokuapp.com/auth/refresh',
            {
                headers:
                        {
                            "Auth-Token": "testing",
                            "Refresh-Token": "refreshing"
                        }
            }
            )
        .reply(200, {
            data:{
                token: 'testingtoken',
                refreshtoken: 'Testingtokenand'
            }
        });
        return store.dispatch(refresh(auth))
        .then(()=>{
            console.log(store.getActions()[0])
           let newStore = {
                auth:{
                    token:store.getActions()[0].payload.token,
                    refreshtoken:store.getActions()[0].payload.refreshtoken
                }
            }
            store.getState = () => newStore
            chai.assert(store.getState().auth.token !== 'testing'
            && store.getState().auth.token === 'testingtoken');

            chai.assert(store.getState().auth.refreshtoken !== 'refreshing'
            && store.getState().auth.refreshtoken === 'Testingtokenand');
        });
    });


    it('Can not refresh because of missing refreshtokens',()=>{
        let auth ={
            token:"testing",
            refreshtoken:"refrehing"
        }

        let expectedActions = [
            {  type: 'POST_USER_LOGIN_ERROR',
            payload: 'no such refresh token'
            }
        ]

        mock.onPost('https://iot-auth-staging.herokuapp.com/auth/refresh',
        {
            headers:
                    {
                        "Auth-Token": "testing",
                        "Refresh-Token": "refrehing"
                    }
        }
        )
    .reply(401, {
        message:'no such refresh token'
        }
    );

    return store.dispatch(refresh(auth))
    .then(()=>{
        chai.expect(store.getActions()).to.deep.equal(expectedActions)
    })
    })

    it('Missing refresh header calls for error',() => {
        let auth ={
            token:"testing",
        }

        let expectedActions = [
            {  type: 'POST_USER_LOGIN_ERROR',
            payload: 'NO refresh token in request'
            }
        ]

        mock.onPost('https://iot-auth-staging.herokuapp.com/auth/refresh',
        {
            headers:
                    {
                        "Auth-Token": "testing"
                    }
        }
        )
    .reply(401, {
        message:'NO refresh token in request'
        }
    );

    return store.dispatch(refresh(auth))
    .then(()=>{
        chai.expect(store.getActions()).to.deep.equal(expectedActions)
    })
    });

    it('Missing refresh header calls for error',() => {
        let auth ={
            refreshtoken:"testing",
        }

        let expectedActions = [
            {  type: 'POST_USER_LOGIN_ERROR',
            payload: 'NO refresh token in request'
            }
        ]

        mock.onPost('https://iot-auth-staging.herokuapp.com/auth/refresh',
        {
            headers:
                    {
                        "Refresh-Token": "testing"
                    }
        }
        )
    .reply(401, {
        message:'NO refresh token in request'
        }
    );

    return store.dispatch(refresh(auth))
    .then(()=>{
        chai.expect(store.getActions()).to.deep.equal(expectedActions)
    })
})
})

describe("Signup works correctly",() =>{
    beforeEach(() => {
        store.clearActions()
        mock.resetHistory();
    })


})