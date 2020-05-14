/**
 * 
 * @author Magnus Fredriksson
 * @author Netanel Avraham Eklind
 * @version 0.0.1
 */

import Observable from "./util/Observable";
import * as Redux from 'redux'
import * as Actions from './Actions/ActionsFiles';
import { ENDPOINTBACKEND} from '../config/config';
import thunkMiddleware from 'redux-thunk';
import axios from 'axios';
import LoginModel,{refresh} from './LoginModel';
import {JWTverify} from './JWTDecoder';

/**
 * Contains the state related to orders. Order history and such
 */
class OrderModel extends Observable {
    constructor() {
        super()
        if (getCookie("Order") && !getCookie("Login").includes("logedOut")){
            this.store = Redux.createStore(Redux.combineReducers({order,interests,history,savedOrder}), JSON.parse(getCookie("Order")), Redux.applyMiddleware(thunkMiddleware));
        }
        else{
            this.store = Redux.createStore(Redux.combineReducers({order,interests,history,savedOrder}), Redux.applyMiddleware(thunkMiddleware));
        }
    }

    getAllOrders() {
        return this.store.getState().orders;
    }
    /**
     * This method notifies observers if there is any changes to the 
     * store!
     */
    notifyObservers() {
        this._observer.map(observer => observer.update(this));
    }
}

const savedOrder = (state ={},action)  =>{
    if(action.type === 'SAVE_ORDER') state = action.payload;
    return state;
}

const orderHistory = (userName) =>{
    return function(dispatch){
        if(!JWTverify(LoginModel.store.getState().loginUser.auth.token)){
            LoginModel.store.dispatch(refresh(LoginModel.store.getState().loginUser.refreshtoken))
        }
        dispatch(Actions.getOrderhistoryRequest());
        return axios.get(`${ENDPOINTBACKEND}order/history?userName=${userName}`)
        .then(resp =>{
            dispatch(Actions.getOrderhistorySuccess(resp.data))
            console.log(instance.store.getState())
        })
        .catch(error =>{
            dispatch(Actions.getOrderhistoryError(error.message))
        })
    }
}

const getAllInterests = () =>{
    return function(dispatch){
        if(!JWTverify){
            LoginModel.store.dispatch(refresh(LoginModel.store.getState().loginUser.refreshtoken))
        }
        dispatch(Actions.getInterestsRequest())
    return axios.get(`${ENDPOINTBACKEND}order/intrests`)
        .then(resp =>{
            dispatch(Actions.getInterestsSuccess(resp.data))
            instance.notifyObservers();
        })
        .catch(error =>{
            dispatch(Actions.getInterestsError(error.message))
            instance.notifyObservers();
        })
    }
}

const makeOrder = ({user, credits, video, Startdate, Enddate}) => {
    return function (dispatch) {
        if(!JWTverify){
            LoginModel.store.dispatch(refresh(LoginModel.store.getState().loginUser.refreshtoken))
        }
        dispatch(Actions.postOrderRequest())
        return axios.post(ENDPOINTBACKEND + 'order/add', 
        {
            user,
            credits,
            video,
            Startdate,
            Enddate
        })
        .then(resp => {
            dispatch(Actions.saveOrder({user, credits, video, Startdate, Enddate,},resp.data))
            dispatch(Actions.postOrderSuccess(resp.data))
        })
        .catch(error => {
                dispatch(Actions.postOrderError(error.message))
                instance.notifyObservers();
        })
    }
}

const history = (
    state = {
        loading:false,
        history:[],
        error:''
    }, action) =>{
        switch(action.type){
            case 'GET_ORDERHISTORY_REQUEST':
                return{
                    ...state,
                    loading:true
                }
            case 'GET_ORDERHISTORY_SUCCESS':
                return{
                    loading:false,
                    history:action.payload,
                    error: ''
                }
            case 'GET_ORDERHISTORY_ERROR':
                return{
                    loading:false,
                    history:[],
                    error:''
                }

            default:
                return state;
        }
    }

/**
 * Retrives current allowed intrerests from the backend api
 * @param {Store} state 
 */
const interests = (state = {
    loading:false,
    response:[],
    error:''
},action) =>{
    switch(action.type){
        case 'GET_INTEREST_REQUEST':
            return{
                ...state,
                loading:true
            }

        case 'GET_INTEREST_SUCCESS':
            return{
                loading:false,
                response:action.payload,
                error:''
            }
            
            case 'GET_INTEREST_ERROR':
                return{
                ...state,
                loading:false,
                error:action.payload
            }

        default: 
        return state;
    }
}

const order = (state = {
    loading: false,
    response: {},
    error: undefined
}, action) => {
    switch (action.type) {
        case 'POST_ADVERTISEMENT_ORDER':
            return {
                ...state,
                loading: true
            }
            
            case 'POST_ADVERTISEMENT_ORDER_SUCCESS':
                return {
                    loading: false,
                    response: action.payload,
                    error: undefined
                }
                
            case 'POST_ADVERTISEMENT_ORDER_ERROR':
                return {
                    loading: false,
                    response: {},
                    error: action.payload
                }
        default:
            return state;
    }
}

const getCookie =(name)=> {
    var v = document.cookie.match('(^|;) ?' + name + '=([^;]*)(;|$)');
    return v ? v[2] : null;
}

const instance = new OrderModel();
export default instance;
export { makeOrder,getAllInterests,orderHistory};

