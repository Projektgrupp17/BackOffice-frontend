import {Component} from 'react'

/**
 * The observer superclass that is used to send information from model to view.
 * It creates an observer attribute that keeps tracks on the lates changes to the 
 * model.
 * @author Netanel Avraham Eklind
 * @version 1.0.0
 */
class Observable extends Component{
    constructor(){
        super()
        this._observer = [];
    }

    /**
     * Adds a new observer to the observer from observed class.
     * @param {contains the newest observer} observer 
     */
    addObserver(observer){
        this._observer.push(observer);
    }

    /**
     * Removes the observer per argument sent to the function. 
     * @param {Observer to remove} observer 
     */
    removeObserver(observer){
        this._observer = this._observer.filter(observed => observed !== observer);
    }
}

export default Observable;