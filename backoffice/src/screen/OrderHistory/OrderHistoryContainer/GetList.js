import {connect} from 'react-redux';
import React from 'react';

const mapStateToProps = state =>{
    return{
        history: state.history
    }
}

const GetList = props =>{
    return (
    <table id="orderhistory-list" cellPadding="0"cellSpacing="0" border="0">
            <thead>
                <tr>
                    <th id="order">
                        Order ID
                    </th>
                    <th id ="start">
                        Start Date
                    </th>
                    <th id="end">
                        End Date
                    </th>
                </tr>
            </thead>
        <tbody id = "body">
            {props.history.history.map(order => 
                <tr key={order.orderId} className ="tableOrder">
                    <td>{order.orderId}</td>
                    <td>{order.startDate}</td>
                    <td>{order.endDate}</td>
                </tr>)}
        </tbody>
    </table>
    )
}


export default connect(mapStateToProps)(GetList)