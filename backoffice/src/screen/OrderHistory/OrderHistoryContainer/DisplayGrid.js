import React from 'react';
import GetInterest from './GetInterest';

const showOrder = ({order:Order}) =>{ 
    if(isEmpty(Order))return true;
        
    return false;
}

const style = props =>{
     return showOrder(props) ? "dashed" : "solid"
}

const DisplayGrid = props =>{
    return <div id="DisplayGrid">
            <div id="Order">
                <h1>Single Order Display</h1>
            </div>
            <div id="Display" style={{borderStyle:style(props)}}>
                {showOrder(props) ?(<h2 className ="text">
                Click a div on "All Orders" to display here!
                </h2>)
                :(
                    (displayOrder(props))
                )}
            </div>
    </div>
}


const displayOrder = ({order:Order,...rest}) =>{
    return(
        <div id="Order-display">
            <div id="Order-title" className ="Order-box">
                <h3>Order Id: <em>{Order.orderId}</em></h3>
            </div>
            <div id="User-title" className ="Order-box">
                <h3>User: <em>{Order.user}</em></h3>
            </div>
            <div id="Credits-title" className ="Order-box">
                <h3>Credits inserted: <em>{Order.credits}</em> $</h3>
            </div>
            <div id="Video-title" className ="Order-box">
                <h3>Videos: <ul>{listVideos(Order.advertisement_videos,rest)}</ul> </h3>
            </div>
            <div id="StartDate-title" className ="Order-box">
                <h3>Start Date: <em>{Order.startDate}</em></h3>
            </div>
            <div id="EndDate-title" className ="Order-box">
                <h3>End Date: <em>{Order.endDate}</em></h3>
            </div>
        </div>
    )
}

const listVideos=(videos,props) =>{
    return (
        videos.map(video => 
        <li key={video.id}>Url: {video.url} <br/> Interest: <GetInterest store={props.store} id={video.interest}/></li>)
    )
}

const isEmpty = obj =>{
    for(var key in obj){
        if(obj.hasOwnProperty(key)){
            return false;
        }
    }
    return true;
}

export default DisplayGrid;