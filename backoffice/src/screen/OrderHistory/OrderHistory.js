import React,{useState} from 'react';
import './OrderHistory.css';
import HistoryGrid from './OrderHistoryContainer/HistoryGrid'
import DisplayGrid from './OrderHistoryContainer/DisplayGrid'

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
