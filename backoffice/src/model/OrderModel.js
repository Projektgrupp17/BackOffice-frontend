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
        dispatch(Actions.postOrderRequest())
        console.log("START REQ")
        axios.post(ENDPOINTBACKEND + 'order/add', 
        {
            user,
            credits,
            video,
            Startdate,
            Enddate
        }, {
            headers: {
                authorization: "eyJhbGciOiJSUzI1NiJ9.eyJqdGkiOiIxMzcyNGE0NC00YjY2LTRmY2EtYjI3ZS03OWMzOTQ4NjJjNTAiLCJpYXQiOjE1ODgxNjI5NzksInN1YiI6InRlc3RAZXhhbXBsZS5jb20iLCJpc3MiOiJwcm9qZWt0Z3J1cHAxNy1hdXRoIiwiZXhwIjoxNTg4MjQ5Mzc5fQ.diLKItLC9eld6r3VKsC7dm_IJdKuPRpegF0HK24lEEXGdC26VLYfGU528z0yNVeYyGwGyQnGDVliaUnLUu54tnM9A7l_Va6BXpIWz09DC-yHchdpDQfTnjL2-ai6nLbdpGqOx8-C1qZXcI3sXA7sixCZqXMJ0QwqvF3sXx4naOhbQQJaFkFvG8RIEKyuF6wUugpn_vKRwMrmza3xcYjZsSGXFzWQA2jvZ-Ws7NsmHA0LcFeUSA-a7lW8MWAgXdGGuA73pMTdbDTZ9W5yp_m5-7NNaK6ND-qefGoaqH4bpbYJ2pR1B9Yz9Jm8YCzsl9Gdpof_Flc1v5BC8FnTIK_mxA" 
            }
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

