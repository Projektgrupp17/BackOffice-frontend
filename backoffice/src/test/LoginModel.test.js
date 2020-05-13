/**
 * Login UnitTest: done
 */

import Login,{login,refresh,signup, userLogout} from '../model/LoginModel';
import configureStore from 'redux-mock-store';
import MockAdapter from 'axios-mock-adapter';
import thunk from 'redux-thunk';
import axios from 'axios';
import {ENDPOINTAUTH} from '../config/config';
const chai = require('chai');


it("Loginmodel is present", () =>{
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
            {type:'SAVE_USER_INFO',
            payload:'test@example.com'},
            {
                type: "POST_USER_LOGIN_SUCCESS",
                payload:{
                    token: 'testingtoken',
                    refreshtoken: 'Testingtokenand'
                }
            }
        ]

        mock.onPost(ENDPOINTAUTH + 'auth/login',{
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
        })
               
    
    })

    it('store is uppdated with tokens',()=>{

        mock.onPost(ENDPOINTAUTH + 'auth/login',{
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
                    token: store.getActions()[2].payload.token,
                    refreshtoken:store.getActions()[2].payload.refreshtoken
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

        mock.onPost(ENDPOINTAUTH + 'auth/login',{
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

        mock.onPost(ENDPOINTAUTH + 'auth/login',{
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

        mock.onPost(ENDPOINTAUTH + 'auth/login',{
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

        mock.onPost(ENDPOINTAUTH + 'auth/login',
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

            mock.onPost(ENDPOINTAUTH + 'auth/refresh',
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

        mock.onPost(ENDPOINTAUTH + 'auth/refresh',
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

        mock.onPost(ENDPOINTAUTH + 'auth/refresh',
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

        mock.onPost(ENDPOINTAUTH + 'auth/refresh',
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

    it('The signup is sent and responded correctly', () =>{
        let expectedActions = [
            {type:'POST_USER_REGISTER_REQUEST'},
            {type:'POST_USER_REGISTER_SUCCESS',payload:201}
        ]
        let testJson = {
            email:'NetTest@NetTest.com',
            username:'NetTest',
            password:'NetTest2',
            agency:'111333'
        }

        mock.onPost(ENDPOINTAUTH + "users/",testJson)
        .reply(201);

        return store.dispatch(signup(testJson)).then(()=>{
            chai.expect(store.getActions()).to.deep.equal(expectedActions)
        })
   
    })

    it('The wrong information is recived and error is throwed,username',() =>{
        let expectedActions = [
            {type:'POST_USER_REGISTER_REQUEST'},
            {type:'POST_USER_REGISTER_ERROR',payload:'invalid username'}
        ]

        let testJson = {
            email:'NetTest@NetTest.com',
            username:'Net',
            password:'NetTest2',
            agency:'111333'
        }

        mock.onPost(ENDPOINTAUTH + "users/",testJson)
        .reply(401,{
            message: "invalid username"
        });

        return store.dispatch(signup(testJson))
        .then(()=>{
            chai.expect(store.getActions()).to.deep.equal(expectedActions)
        })
    })
    it('The username already excist in the system',() =>{
        let expectedActions = [
            {type:'POST_USER_REGISTER_REQUEST'},
            {type:'POST_USER_REGISTER_ERROR',payload:'user or email aready taken'}
        ]

        let testJson = {
            email:'NetTest@NetTest.com',
            username:'Netanel',
            password:'NetTest2',
            agency:'111333'
        }

        mock.onPost(ENDPOINTAUTH + "users/",testJson)
        .reply(401,{
            message: "user or email aready taken"
        });

        return store.dispatch(signup(testJson))
        .then(()=>{
            chai.expect(store.getActions()).to.deep.equal(expectedActions)
        })
    })
    it('The password is invalid',() =>{
        let expectedActions = [
            {type:'POST_USER_REGISTER_REQUEST'},
            {type:'POST_USER_REGISTER_ERROR',payload:'invalid password'}
        ]

        let testJson = {
            email:'NetTest@NetTest.com',
            username:'Netanel',
            password:'Netanel',
            agency:'111333'
        }

        mock.onPost(ENDPOINTAUTH + "users/",testJson)
        .reply(401,{
            message: "invalid password"
        });

        return store.dispatch(signup(testJson))
        .then(()=>{
            chai.expect(store.getActions()).to.deep.equal(expectedActions)
        })
    })
    it('The agency does not exist',() =>{
        let expectedActions = [
            {type:'POST_USER_REGISTER_REQUEST'},
            {type:'POST_USER_REGISTER_ERROR',payload:'agency does not exist'}
        ]

        let testJson = {
            email:'NetTest@NetTest.com',
            username:'Netanel',
            password:'Netanel',
            agency:'111333'
        }

        mock.onPost(ENDPOINTAUTH + "users/",testJson)
        .reply(401,{
            message: "agency does not exist"
        });

        return store.dispatch(signup(testJson))
        .then(()=>{
            chai.expect(store.getActions()).to.deep.equal(expectedActions)
        })
    })
    
})

describe("Logout works correctly", () =>{
    beforeEach(() =>{
        store.clearActions()
        mock.resetHistory();
    })

    it('The logout sends correct actions', () =>{
        let expectedActions = [
            {type:'POST_USER_LOGOUT'}
        ]
        let mockStore = {
            loading:false,
            auth:{
                token:'testing',
                refreshtoken:'refreshtesting'
            },
            error:''
        }

        store.getState = () => mockStore;

        mock.onPost(`${ENDPOINTAUTH}auth/logout`)
        .reply(200);

        store.dispatch(userLogout())
        .then(() =>{
            chai.expect(store.getActions()).to.deep.equal(expectedActions)
        })

    })

    it('Cleares store when logout is done', ()=>{
        let expectedActions = [
            {type:'POST_USER_LOGOUT',payload: '200'}]
        let mockStore = {
            loading:false,
            auth:{
                token:'testing',
                refreshtoken:'refreshtesting'
            },
            error:''
        }

        store.getState = () => mockStore;
        mock.onPost(`${ENDPOINTAUTH}auth/logout`)
        .reply(200);

        store.dispatch(userLogout()).then(()=>{
            switch(store.getActions()[0]){
                case 'POST_USER_LOGOUT':
                    store.getState = () =>({
                        loading:false,
                        auth:{
                            token:'',
                            refreshtoken:''
                        },
                        error:''
                    })
            }
            chai.expect(store.getState()).to.not.equal(mockStore)
            chai.assert(store.getActions()[0].payload === '200')
        })

    })

})