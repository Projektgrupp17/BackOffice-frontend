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
        this.store = Redux.createStore(Redux.combineReducers({order}), Redux.applyMiddleware(thunkMiddleware));
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

const makeOrder = ({user, credits, video, Startdate, Enddate}) => {
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
export { makeOrder };

