import React from 'react';
import './OrderHistory.css';
import HistoryGrid from './OrderHistoryContainer/HistoryGrid'

const Orderhistory = (props) =>{
    return(
        <div id ="Wrapper-order">
            <div id="Menu"> 
                <props.menu store={props.store}/>
            </div>
            <div id="OrderHistory">
                <HistoryGrid {...props}/>
                <DisplayGrid/>
            </div>
        </div>
    )
}

const DisplayGrid = () =>{
    return <h1 id="DisplayGrid">Single Order Display</h1>
}
export default Orderhistory;
