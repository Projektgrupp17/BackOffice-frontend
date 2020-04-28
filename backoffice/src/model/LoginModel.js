/**
 * This is the Login model that communicates with the backend for the backoffice service.
 * It implements the observable class to be able to communicate up to the view classes
 * and also handles the react with <code> react-redux </code> store to be able to save 
 * information to the store and save it to the cookie.
 * 
 * TODO: Better the comments^^
 * 
 * @author Netanel Avraham Eklind
 * @version 0.0.1
 */

import Observable from "./util/Observable";
import * as Redux from 'redux'
import * as Actions from './Actions/ActionsFiles';
import {ENDPOINTAUTH} from '../config/config';
import thunkMiddleware from 'redux-thunk';
import axios from 'axios';

 class LoginModel extends Observable{
    constructor(){
        super()
        this.store = Redux.createStore(Redux.combineReducers(combineReducers),Redux.applyMiddleware(thunkMiddleware));
    }

    getAuthToken(){
        return this.store.getState().loginUser.auth.token;
    }
    getAuthRefreshToken(){
        return this.store.getState().loginUser.auth.refreshtoken;
    }

    getErrorMessage(){
        return this.store.getState().loginUser.error;
    }

    /**
     * This method notifies observers if there is any changes to the 
     * store!
     */
    notifyObservers(){
        this._observer.map(observer => observer.update(this));
    }

    /**
     * A method that dispatches the action creator to do async api call using redux.
     * @param {user email} email 
     * @param {user password} pass 
     */
    login(email,pass){
      this.store.dispatch(login(email,pass));
    }

}

const login =(email,pass) =>{
 return function(dispatch){
     dispatch(Actions.postUserLoginRequest())
    axios.post(ENDPOINTAUTH+'auth/login',{
        password:pass,
        email:email,
    })
    .then(resp =>{
            dispatch(Actions.postUserLoginSuccess(resp.data))
    })
    .catch(error => {
        dispatch(Actions.postUserLoginError(error.message))
    })
 }
}




 const loginUser = ( state={
     loading:false,
     auth:{},
     error:''
    },action) => {
        switch(action.type){
            case 'POST_USER_LOGIN_REQUEST':
                return{
                    ...state,
                    loading:true
                }

            case 'POST_USER_LOGIN_SUCCESS':
                return{
                    loading:false,
                    auth: action.payload,
                    error:''
                }

            case 'POST_USER_LOGIN_ERROR':
                return{
                    loading:false,
                    auth:{},
                    error: { message: action.payload,
                              code:action.code }
                }
            default :
                return state;
        }
 }


 const combineReducers = {loginUser};

 const instance = new LoginModel();

 instance.store.subscribe(() => instance.notifyObservers())

 export default instance;

