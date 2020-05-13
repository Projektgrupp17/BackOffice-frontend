import {connect} from 'react-redux';
import React from 'react';

const mapStateToProps = state =>{
    return{
        history: state.history
    }
}

const GetList = props =>{
    let listnr = 0;
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
            {
                props.history.loading === false ?(
            props.history.history.map(order => 
                <tr val={order.orderId} key={listnr++} className ="tableOrder"
                 onClick={e => props.order(props.history.history.find(data => 
                 data.orderId === e.currentTarget.getAttribute("val")))}>
                    <td>{order.orderId}</td>
                    <td>{order.startDate}</td>
                    <td>{order.endDate}</td>
                </tr>)
                )
                : <tr key ="Loading">
                    <td>Loading...</td>
                </tr>
                 }
        </tbody>
    </table>
    )
}


export default connect(mapStateToProps)(GetList)

