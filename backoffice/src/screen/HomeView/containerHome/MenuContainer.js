import React  from "react";
import './MenuContainer.css'
import { Link } from "react-router-dom";

/**
 * The Menu component that loads the navbar
 * @param {Component} props 
 */
const Menu = (props) =>{
    return(<div>
        <h1>{props.label}</h1>
        <Navbar display ={props.display} component={List} history={props.history}/>
    </div>
    )
}

/**
 * Checks if it is valid to display navbar or not
 * @param {boolean} flag 
 */
const display = (flag) =>{
    if(flag === true){
        return true;
    }
    else{
        return false;
    }
}

/**
 * Displays the navbar on the screen.
 * @param {Component} props 
 */
const Navbar = (props) =>{
    return(
        <div>
            {display(props.display) ?<List {...props}/> : "" }
        </div>
    )
}

/**
 * HTML list of words that link to different part of the application
 * @param {Component} props 
 */
const List = props =>{
    return(
    <ul id="navbar">
        <li><Link to='/order' className="nav-btn">Order</Link></li>
        <li><Link to='/orderhistory' className="nav-btn">Orderhistory</Link></li>
        <li><Link to='/userservice'className="nav-btn">User service</Link></li>
    </ul>
    )
}

export default Menu