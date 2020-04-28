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

 class LoginModel extends Observable{
    constructor(){
        super()
        this.store = Redux.createStore(Redux.combineReducers(combineReducers));
    }


    notifyObservers(){
        this._observer.map(observer => observer.update(this));
    }
 }


 const start = (state = 0,action) =>{
     return state
 }

 const combineReducers = {start};

 const instance = new LoginModel();

 export default instance;