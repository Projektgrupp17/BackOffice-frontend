import React  from "react";
import './MenuContainer.css'
const Menu = (props) =>{
    return(<div>
        <h1>{props.label}</h1>
        <Navbar display ={props.display} component={List}/>
    </div>
    )
}

const display = (flag) =>{
    if(flag === true){
        return true;
    }
    else{
        return false;
    }
}


const Navbar = (props) =>{
    return(
        <div>
            {display(props.display) ?<List/> : "" }
        </div>
    )
}


const List = props =>{
    return(
    <ul id="navbar">
        <li>Order</li>
        <li>Orderhistory</li>
        <li>User service</li>
    </ul>
    )
}

export default Menu