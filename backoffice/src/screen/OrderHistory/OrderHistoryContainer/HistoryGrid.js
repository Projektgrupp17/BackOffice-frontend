import {connect} from 'react-redux';
import {orderHistory,getAllInterests} from '../../../model/OrderModel';
import React from 'react';
import GetList from './GetList';

/**
 * Sends a dispatch to the store depending on which one you call for.
 * @param {Store} dispatch 
 */
const mapDispatchToProps = dispatch =>{
    return{
        orderHistory: (email) => dispatch(orderHistory(email)),
        getAllInterests: () => dispatch(getAllInterests())
    }
}

/**
 * Proxy method that calls the dispatch function.
 * @param {Component} props 
 */
const screwReact = props =>{
    props.orderHistory(props.login);
    props.getAllInterests();
}

/**
 * Main HistoryGrid component that allows for rendering of the list
 * of orders.
 * @param {Component} props 
 */
const HistoryGrid = props =>{
    return <div id="HistoryGrid">
        <div id="Orders">
        <h1>All Orders</h1>
        <GetList store={props.store} order={props.setOrder}/>
        </div>
        <button id="historyButton" onClick={() => screwReact(props)}>
                    Get history
        </button>
    </div>
}

export default connect(null,mapDispatchToProps)(HistoryGrid)