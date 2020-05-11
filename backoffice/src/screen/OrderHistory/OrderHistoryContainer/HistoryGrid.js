import {connect} from 'react-redux';
import {orderHistory} from '../../../model/OrderModel';
import React from 'react';
import GetList from './GetList';

const mapDispatchToProps = dispatch =>{
    console.log("help!")
    return{
        orderHistory: () => dispatch(orderHistory())
    }
}

const screwReact = props =>{
    console.log("help!!!")
    props.orderHistory();
}

const HistoryGrid = props =>{
    console.log(props)
    return <div id="HistoryGrid">
        <div id="Orders">
        <h1>All Orders</h1>
        <GetList store={props.store}/>
        </div>
        <button id="historyButton" onClick={() => screwReact(props)}>
                    Get history
        </button>
    </div>
}

export default connect(null,mapDispatchToProps)(HistoryGrid)