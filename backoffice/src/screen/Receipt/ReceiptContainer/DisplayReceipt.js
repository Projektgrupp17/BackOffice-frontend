import React from 'react'
import { connect } from "react-redux"



const mapStateToProps = state =>{
    return{
        savedOrder: state.savedOrder
    }
}

const DisplayReceipt = props =>{
    console.log(props.store.getState());
    return(
        <div id="Receipt-box">
            <h2> Thank you for ordering!</h2>
            <h3>Order Id: <br/> <em>{props.savedOrder.orderID}</em></h3>
            <h3>Start date: <br/> <em>{props.savedOrder.Startdate}</em></h3>
            <h3>End date: <br/> <em>{props.savedOrder.Enddate}</em></h3>
            <h3>Credits: <br/> <em>{props.savedOrder.credits}</em></h3>
            <div id="Video-title" className ="Order-box">
                <h3>Videos: <ul>{listVideos(props.savedOrder.video)}</ul> </h3>
            </div>
        </div>
    )
}

const listVideos = (videos) =>{
    let listnr = 0;
    return(
        videos.map(video =>
            <li key ={listnr++}> Video url: {video.url} <br/> 
            Interest: {video.interest} <br/>
            Length: {video.length} </li>
        )
    )
}


export default connect(mapStateToProps,null)(DisplayReceipt)