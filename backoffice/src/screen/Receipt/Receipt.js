/**
 * This react component shows the user the receipt of the order they just made!
 * This is a confirmation page that allows the user to see what they have ordered 
 * and also verifies that an order had been made!
 * 
 * @author Netanel Avraham Eklind
 * @version 1.0.0
 */
import React from 'react';
import DisplayReceipt from './ReceiptContainer/DisplayReceipt';
import './Receipt.css';

/**
 * Used to display the Reciept screen for the user after a order 
 * has been made.
 * @param {Component} props 
 */
 const Receipt = props =>{
     console.log(props.store.getState())
     return(
        <div id ="Wrapper">
            <div id="Menu">
                <props.menu store={props.store}/>
            </div>
            <div id ="Receipt">
                <DisplayReceipt store={props.store} history={props.history}/>
            </div>
        </div>
     )
 }


 export default Receipt