import React from 'react'
import {connect} from 'react-redux'
import {userLogout} from '../../../model/LoginModel'
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


const logout = (props)=> {
    props.userLogout()
    .then(() => props.history.goBack())
}


const Logout = props =>{
    return(
        <div id="Logout-box">
            <div id ="sidebar">
            <props.menu/>
            </div>
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