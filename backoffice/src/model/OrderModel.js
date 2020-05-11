/**
 * 
 * @author Magnus Fredriksson
 * @version 0.0.1
 */

import Observable from "./util/Observable";
import * as Redux from 'redux'
import * as Actions from './Actions/ActionsFiles';
import { ENDPOINTBACKEND } from '../config/config';
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
        this.store = Redux.createStore(Redux.combineReducers({order,interests}), Redux.applyMiddleware(thunkMiddleware));
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

const getAllInterests = () =>{
    return function(dispatch){
        dispatch(Actions.getInterestsRequest())
        axios.get(`${ENDPOINTBACKEND}order/intrests`)
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
    console.log(user);
    return function (dispatch) {
        if(!JWTverify){
            LoginModel.store.dispatch(refresh(LoginModel.store.getState().loginUser.refreshtoken))
        }
        dispatch(Actions.postOrderRequest())
        console.log("START REQ")
        axios.post(ENDPOINTBACKEND + 'order/add', 
        {
            user,
            credits,
            video,
            Startdate,
            Enddate
        })
        .then(resp => {
            console.log("SUCC REQ")
            dispatch(Actions.postOrderSuccess(resp.data))
            instance.notifyObservers();
        })
        .catch(error => {
                console.log("ERROR REQ")
                dispatch(Actions.postOrderError(error.message))
                instance.notifyObservers();
        })
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
            console.log("START");
            return {
                ...state,
                loading: true
            }
            
            case 'POST_ADVERTISEMENT_ORDER_SUCCESS':
                console.log("SUCCESS")
                return {
                    loading: false,
                    response: action.payload,
                    error: undefined
                }
                
            case 'POST_ADVERTISEMENT_ORDER_ERROR':
                console.log("ERROR");
                return {
                    loading: false,
                    response: {},
                    error: action.payload
                }
        default:
            return state;
    }
}

const instance = new OrderModel();
export default instance;
export { makeOrder,getAllInterests };

