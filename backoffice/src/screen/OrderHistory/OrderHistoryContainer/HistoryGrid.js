import {connect} from 'react-redux';
import {orderHistory,getAllInterests} from '../../../model/OrderModel';
import React from 'react';
import GetList from './GetList';

const mapDispatchToProps = dispatch =>{
    return{
        orderHistory: (email) => dispatch(orderHistory(email)),
        getAllInterests: () => dispatch(getAllInterests())
    }
}

const screwReact = props =>{
    props.orderHistory(props.login);
    props.getAllInterests();
}

const HistoryGrid = props =>{
    return <div id="HistoryGrid">
        <div id="Orders">
        {/* <button onClick={() => screwReact(props)}>press for testing! </button> */}
        <h1>All Orders</h1>
        <GetList store={props.store} order={props.setOrder}/>
        </div>
        <button id="historyButton" onClick={() => screwReact(props)}>
                    Get history
        </button>
    </div>
}

export default connect(null,mapDispatchToProps)(HistoryGrid)