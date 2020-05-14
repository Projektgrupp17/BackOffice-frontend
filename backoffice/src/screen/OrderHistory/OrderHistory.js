import React,{useState} from 'react';
import './OrderHistory.css';
import HistoryGrid from './OrderHistoryContainer/HistoryGrid'
import DisplayGrid from './OrderHistoryContainer/DisplayGrid'

/**
 * The main screen component of the orderhistory screen. Shows the user
 * what have been bought before. It comes in 2 stages:
 * One that provides the user with a list of all the orders
 * <code> <HistoryGrid/> </code> and the second provides the user with
 * a detailed information about that specific movie <code> <DisplayGrid/> </code>.
 * 
 * #TODO: Implement a sorting function, ASC and DESC 
 * @param {Component} props 
 */
const Orderhistory = (props) =>{
    const [order,setOrder] = useState({});
    return(
        <div id ="Wrapper-order">
            <div id="Menu"> 
                <props.menu store={props.store}/>
            </div>
            <div id="OrderHistory">
                <HistoryGrid {...props} setOrder={setOrder}/>
                <DisplayGrid {...props} order={order}/>
            </div>
        </div>
    )
}


export default Orderhistory;
