/**
 * Date 2020-05-08
 * 
 * This js file contains the component for the logout box.
 * This handles the eventlistner for the logout sequence and
 * also the display of html elements for the DOM to produce.
 * 
 * @author Netanel Avraham Eklind
 * @version 1.0.0
 */

import React from 'react'
import {connect} from 'react-redux'
import {userLogout} from '../../model/LoginModel'
import './LogutContainer.css'

/**
 * Dispatch a new update to the store with the given dispatch from 
 * the store.
 * @param {Store} dispatch  action to be taken
 */
const mapDispatchToProps = dispatch=>{
    return{
        userLogout: () => dispatch(userLogout())
    }
}

/**
 * Dispatch the <code> userLogout </code> action and then pushes to go
 * back in history thus triggering falling back to login screen.
 * @param {Components} props            the components given to the 
 * function
 */
const logout = (props)=> {
    props.userLogout()
    .then(() => {console.log("login out")
       props.history.go(0)})
}

/**
 * Main component function that renders the entire logout box so the user can 
 * interact with it. It handles a click event on both the <em> yes <em> box and 
 * <em> no </em> box. 
 * @param {Components} props 
 */
const Logout = props =>{
    return(
        <div id="Logout-box">
            <div id="Logout">
                <div id="box">
            <b>Do you wish to logout?</b>
            <ul id="checkout">
                <li id="yes">
                    <button onClick={()=> logout(props)} className="nav-btn">Yes</button>
                </li>      
                <li id="no">
                    <button onClick={() => props.history.goBack()} className="nav-btn">no</button>
                </li>
            </ul>
                    </div>   
            </div>
        </div>
    )
}

export default connect(null,mapDispatchToProps)(Logout);