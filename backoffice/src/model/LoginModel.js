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
import {JWTverify,setAutherizationToken} from './JWTDecoder';

 class LoginModel extends Observable{
    
    constructor(){
        super()
        if(document.cookie !== ''){
            this.store = Redux.createStore(Redux.combineReducers(combineReducers),JSON.parse(document.cookie),Redux.applyMiddleware(thunkMiddleware));
            setAutherizationToken(this.store.getState().loginUser.auth.token)
        }
        else{
            this.store = Redux.createStore(Redux.combineReducers(combineReducers),Redux.applyMiddleware(thunkMiddleware));
        }
    }

    getAuthToken(){
        return this.store.getState().loginUser.auth.token;
    }

    getUsername(){
        try {
            return JWTverify(this.store.getState().loginUser.auth.token).sub
        } catch (error) {
            return null
        }
    }
    
    /**
     * This method notifies observers if there is any changes to the 
     * store!
     */
    notifyObservers(){
        this._observer.map(observer => observer.update(this));
    }
}

const signup = json => {
    return function(dispatch){
        dispatch(Actions.postUserRegisterRequest())
        axios.post(ENDPOINTAUTH+'users/',json)
        .then(resp => {
            dispatch(Actions.postUserRegisterSuccess(resp.data))
            instance.notifyObservers();
            instance.store.dispatch(login(json.email,json.password))
        })
        .catch(error =>{
            dispatch(Actions.postUserRegisterError(error.response.data.message))
            instance.notifyObservers();
        })
    }
}

const signupUser = (state ={userIsSignedUp:false,loading:false} ,action) =>{
    switch(action.type){
        case 'POST_USER_REGISTER_REQUEST':
            return{
                ...state,
                loading:true
            }
        case 'POST_USER_REGISTER_SUCCESS':
            return{
                userIsSignedUp:true,
                loading:false,
                error:''
            }
        case 'POST_USER_REGISTER_ERROR':
            return{
                userIsSignedUp:false,
                loading:false,
                error:action.payload
            }
            default:
                return state;
    }
}

const refresh = (auth) =>{
     return function(dispatch){
         console.log(refresh)
         axios.post(ENDPOINTAUTH+'auth/refresh',{
            token: auth.token,
            refreshtoken: auth.refreshtoken
         })
         .then(resp => {
            dispatch(Actions.refreshOrder(resp.data))
            instance.notifyObservers();
            setAutherizationToken(resp.data.token)
            document.cookie = JSON.stringify(instance.store.getState());
         })
         .catch(error => {
             dispatch(Actions.postUserLoginError(error.response.data.message))
             instance.notifyObservers();
         })
     }
}


const login =(email,pass) =>{
    return function(dispatch){
        dispatch(Actions.postUserLoginRequest())
       return axios.post(ENDPOINTAUTH+'auth/login',{
            password:pass,
            email:email,
        })
        .then(resp =>{
            dispatch(Actions.postUserLoginSuccess(resp.data))
            instance.notifyObservers();
            setAutherizationToken(resp.data.token)
            document.cookie = JSON.stringify(instance.store.getState());
            //window.location.pathname = "/order"
        })
        .catch(error => {
            dispatch(Actions.postUserLoginError(error.response.data.message))
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

                case 'REFRESH_USER_LOGIN':
                    return{

                    }
                    default :
                    return state;
                }
            }
            
            
            const combineReducers = {loginUser,signupUser};
            
            
            const instance = new LoginModel();
            export default instance;
            export{login,signup};
            
