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
import {JWTverify} from './JWTDecoder';

 class LoginModel extends Observable{
    
    constructor(cookie){
        super()
        if(document.cookie != ''){
            this.store = Redux.createStore(Redux.combineReducers(combineReducers),JSON.parse(document.cookie),Redux.applyMiddleware(thunkMiddleware));
        }
        else{
            this.store = Redux.createStore(Redux.combineReducers(combineReducers),Redux.applyMiddleware(thunkMiddleware));
        }
        console.log(this.store.getState())
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

    getUsername(){
        return JWTverify(this.store.getState().loginUser.auth.token).sub
    }
    
    /**
     * This method notifies observers if there is any changes to the 
     * store!
     */
    notifyObservers(){
        this._observer.map(observer => observer.update(this));
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
            instance.notifyObservers();
            document.cookie = JSON.stringify(instance.store.getState());
           

        })
        .catch(error => {
            dispatch(Actions.postUserLoginError(error.message))
            instance.notifyObservers();
        })
    }
}

const loginUser = ( state={
    loading:false,
    auth:{
        token:'',
        refreshtoken:''
    },
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
                    auth: {
                        token: action.payload.token,
                        refreshtoken: action.payload.token
                    },
                    error:''
                }
                
                case 'POST_USER_LOGIN_ERROR':
                    return{
                        loading:false,
                        auth:{},
                        error:action.payload
                    }
                    default :
                    return state;
                }
            }
            
            
            const combineReducers = {loginUser};
            
            
            const instance = new LoginModel();
            export default instance;
            export{login};
            
