/**
 * date: 2020-05-08
 * 
 * This is the Login model that communicates with the backend for the backoffice service.
 * It implements the observable class to be able to communicate up to the view classes
 * and also handles the react with <code> react-redux </code> store to be able to save 
 * information to the store and save it to the cookie.
 * 
 * This model implements 3 different action creator functions that handles the calls to
 * the different apis:
 * 
 * <code> login(email,pass) </code> that uses the arguments email and password to call the 
 * authentication api and request back <em> JWT </em> java web token. This then allows the 
 * user to start navigating the different parts of the site only accessable with a verified
 * token.
 * 
 * <code> signup(json) </code> takes a json object containing all the filled in information
 * needed to send to the authentication api to create this user there, thus allowing the user
 * access to the website with their new <em> jwt token</em>.
 * 
 * <code> refresh(auth) </code> takes the authentication jwt token and refresh token to update
 * the <em> jwt </em> token since it may have expired. Thus the user does not need to login
 * each time a token has "expired".
 * 
 * @author Netanel Avraham Eklind
 * @version 0.0.1
 */

import Observable from "./util/Observable";
import * as Redux from 'redux'
import * as Actions from './Actions/ActionsFiles';
import { ENDPOINTAUTH } from '../config/config';
import thunkMiddleware from 'redux-thunk';
import axios from 'axios';
import { JWTverify, setAutherizationToken } from './JWTDecoder';

class LoginModel extends Observable {

    constructor(cookie) {
        super()
        if (document.cookie !== '' && !document.cookie.includes("logedOut")) {
            this.store = Redux.createStore(Redux.combineReducers(combineReducers), JSON.parse(document.cookie), Redux.applyMiddleware(thunkMiddleware));
            setAutherizationToken(this.store.getState().loginUser.auth.token, this.store.getState().loginUser.auth.refreshtoken)
        }
        else {
            this.store = Redux.createStore(Redux.combineReducers(combineReducers), Redux.applyMiddleware(thunkMiddleware));
        }
    }
    cleareStoreError() {
        this.store.getState().loginUser.error = '';
        this.store.getState().signupUser.error = '';
    }

    getAuthToken() {
        return this.store.getState().loginUser.auth.token;
    }
    getAuthRefreshToken() {
        return this.store.getState().loginUser.auth.refreshtoken;
    }

    getUsername() {
        return JWTverify(this.store.getState().loginUser.auth.token).sub;
    }

    /**
     * This method notifies observers if there is any changes to the 
     * store!
     */
    notifyObservers() {
        this._observer.map(observer => observer.update(this));
    }
}




/**
 * Refreshes the token with the token and refresh token.
 * @param {String} auth  a Json string containing old auth token.
 */
const refresh = (auth) => {
    return function (dispatch) {
        return axios.post(ENDPOINTAUTH + 'auth/refresh', {
            headers: {
                "Auth-Token": auth.token,
                "Refresh-Token": auth.refreshtoken
            }
        })
            .then(resp => {
                dispatch(Actions.refreshOrder(resp.data.data))
                setAutherizationToken(resp.data.token)
                instance.notifyObservers();
                setCookie();
            })
            .catch(error => {
                dispatch(Actions.postUserLoginError(error.response.data.message))
                instance.notifyObservers();
            })
    }
}

/**
 * A functions that calls for signup to the auth api and updates the store with
 * an jwt token.
 * @param {String} json 
 */
const signup = json => {
    return function (dispatch) {
        dispatch(Actions.postUserRegisterRequest())
        return axios.post(ENDPOINTAUTH + 'users/', json)
            .then(resp => {
                dispatch(Actions.postUserRegisterSuccess(resp.status))
                instance.notifyObservers();
                instance.store.dispatch(login(json.email, json.password))
                setCookie();
            })
            .catch(error => {
                dispatch(Actions.postUserRegisterError(error.response.data.message))
                instance.notifyObservers();
            })
    }
}
/**
 * The action for updating the user signup reducer state
 * @param {Store} state 
 * @param {Action} action 
 */
const signupUser = (state = { userIsSignedUp: false, loading: false, error: '' }, action) => {
    switch (action.type) {
        case 'POST_USER_REGISTER_REQUEST':
            return {
                ...state,
                loading: true
            }
        case 'POST_USER_REGISTER_SUCCESS':
            return {
                userIsSignedUp: true,
                loading: false,
                error: ''
            }
        case 'POST_USER_REGISTER_ERROR':
            return {
                userIsSignedUp: false,
                loading: false,
                error: action.payload
            }
        default:
            return state;
    }
}


/**
 * Calls for the user to signout of the system, thus not having any new refresh token
 * to use.
 */
const userLogout = () => {
    return function (dispatch) {
        instance.store.dispatch(Actions.postUserLougoutRequest())
        return axios.post(`${ENDPOINTAUTH}auth/logout`)
            .then(resp => {
                instance.store.dispatch(Actions.postUserLogout(resp.status))
                instance.notifyObservers();
                setAutherizationToken()
                setCookie(true);
            })
            .catch(error => {
                dispatch(Actions.postUserRegisterError(error.response.data.message))
                instance.notifyObservers();
            })
    }
}
/**
 * Login into the api and retrive an jwt token.
 * @param {String} email 
 * @param {String} pass 
 */
const login = (email, pass) => {
    return function (dispatch) {
        dispatch(Actions.postUserLoginRequest())
        return axios.post(ENDPOINTAUTH + 'auth/login', {
            password: pass,
            email: email,
        })
            .then(resp => {
                dispatch(Actions.saveUserInfo(email))
                dispatch(Actions.postUserLoginSuccess(resp.data))
                instance.notifyObservers();
                setAutherizationToken(resp.data.token, resp.data.refreshtoken)
                setCookie()
            })
            .catch(error => {
                if (error.message === 'Network Error') {
                    dispatch(Actions.postUserLoginError("No connection to server"))
                } else {
                    dispatch(Actions.postUserLoginError(error.response.data.message))
                }
                instance.notifyObservers();
            })
    }
}

/**
 * Gets info about user by email
 * @param {String} email
 */
const getCurrentUser = email => {
    return function (dispatch) {
        dispatch(Actions.getUserRequest())
        return axios.get(`${ENDPOINTAUTH}users/${email}`)
            .then(resp => {
                dispatch(Actions.getUserSuccess(resp.data))
                instance.notifyObservers();
                setCookie();
            })
            .catch(error => {
                dispatch(Actions.getUserError(error.message))
                instance.notifyObservers();
            })
    }
}

/**
 * Gets info about user by email
 * @param {String} email
 */
const putUserUpdate = ({ oldEmail, oldPassword, email, username, agency, password }) => {
    return function (dispatch) {
        dispatch(Actions.updateUserRequest())
        return axios.put(`${ENDPOINTAUTH}users/${oldEmail}`, {
            oldPassword,
            email,
            username,
            agency,
            password
        })
            .then(resp => {
                dispatch(Actions.updateUserSuccess(resp.data))
                instance.notifyObservers();
                setCookie();
            })
            .catch(error => {
                let payLoad = error;
                if(error.response && error.response.data && error.response.data.message)
                    payLoad = error.response.data.message;
                dispatch(Actions.updateUserError(payLoad))
                instance.notifyObservers();
            })
    }
}

const saveUserInfos = (state={},action) =>{
    if(action.type === 'SAVE_USER_INFO'){
        return state = action.payload;
    } 
    return state;
}

/**
* The action that uppdates the reducer state depending on action
* type
* @param {The initial state of the reducer} state 
* @param {The actions given to the reducer} action 
*/
const loginUser = (state = {
    loading: false,
    auth: {
        token: '',
        refreshtoken: ''
    },
    error: ''
}, action) => {
    switch (action.type) {
        case 'POST_USER_LOGIN_REQUEST':
            return {
                ...state,
                loading: true
            }

        case 'POST_USER_LOGIN_SUCCESS':
            return {
                loading: false,
                auth: {
                    token: action.payload.token,
                    refreshtoken: action.payload.refreshtoken
                },
                error: ''
            }

        case 'POST_USER_LOGIN_ERROR':
            return {
                loading: false,
                auth: {},
                error: action.payload
            }

        case 'REFRESH_USER_LOGIN':
            return {
                loading: false,
                auth: {
                    token: action.payload.token,
                    refreshtoken: action.payload.token
                },
                error: ''
            }

        case 'POST_USER_LOGOUT_REQUEST':
            return{
                ...state,
                loading:true
            }
        case 'POST_USER_LOGOUT':
            return {
                loading: false,
                auth: {
                    token: '',
                    refreshtoken: ''
                },
                error: ''
            }
        default:
            return state;
    }
}

/**
* The action that uppdates the reducer state depending on action
* type
* @param {The initial state of the reducer} state 
* @param {The actions given to the reducer} action 
*/
const userUpdate = (state = {
    loading: false,
    message: null,
    error: null
}, action) => {
    switch (action.type) {
        case 'UPDATE_USER_REQUEST':
            return {
                ...state,
                loading: true
            }

        case 'UPDATE_USER_SUCCESS':
            return {
                loading: false,
                message: action.payload,
                error: ''
            }

        case 'UPDATE_USER_ERROR':
            return {
                loading: false,
                message: null,
                error: action.error
            }
        default: return state;
    }
}

    /**
     * The action that uppdates the reducer state depending on action
     * type
     * @param {The initial state of the reducer} state 
     * @param {The actions given to the reducer} action 
     */
    const userInfo = (state = {
        loading: false,
        user: {
            username: null,
            email: null,
            agency: null,
        },
        error: null
    }, action) => {
        switch (action.type) {
            case 'GET_USER_REQUEST':
                return {
                    ...state,
                    loading: true
                }
            case 'GET_USER_SUCCESS':
                return {
                    loading: false,
                    ...action.payload,
                    error: ''
                }
            case 'POST_USER_LOGIN_ERROR':
                return {
                    loading: false,
                    user: null,
                    error: action.payload
                }
            default:
                return state;
        }
    }


  const setCookie = (flag = false)=>{
        var date = new Date();
        date.setTime(date.getTime() + (60 * 1000));
        if(flag === false) return document.cookie =`${JSON.stringify(instance.store.getState())}; expires=${date}; path =${window.location.pathname};`;
        document.cookie = `${JSON.stringify(instance.store.getState())}logedOut; expires=1980-05-08T14:49:00.000Z; path =/;`;
    }




    const combineReducers = { loginUser, signupUser, userInfo, userUpdate,saveUserInfos};


    const instance = new LoginModel();
    export default instance;
    export { login, signup, refresh, userLogout, putUserUpdate, getCurrentUser};

