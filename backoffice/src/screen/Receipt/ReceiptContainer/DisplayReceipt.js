import React from 'react'
import { connect } from "react-redux"



const mapStateToProps = state =>{
    return{
        savedOrder: state.savedOrder
    }
}

const DisplayReceipt = props =>{
    console.log("hello");
    return(
        <div>
            {console.log(props.store.getState())}
        </div>
    )
}


export default connect(mapStateToProps,null)(DisplayReceipt)