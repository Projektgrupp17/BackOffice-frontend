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
            {display(props.display) ?<List {...props} label={openOrClose(true)}/> : <List {...props} label={openOrClose(false)}/> }
        </div>
    )
}

/**
 * HTML list of words that link to different part of the application
 * @param {Component} props 
 */
const List = props =>{
    console.log(props.label)
    return(
    <ul id={props.label.navbar}>
        <li><Link to='/order' className={props.label.navButton}>Order</Link></li>
        <li><Link to='/orderhistory' className={props.label.navButton}>Orderhistory</Link></li>
        <li><Link to='/userservice'className={props.label.navButton}>User service</Link></li>
    </ul>
    )
}

const openOrClose = (flag) =>{
    console.log(flag)
    if(flag)return {navbar: "navbar",navButton: "nav-btn"}
    return  {navbar: "navbar1",navButton: "nav-btn1"}
}

export default Menu