import React from 'react';
import {connect} from 'react-redux'

const mapStateToProps = state =>{
    return{
        interests: state.interests
    }
}

const findData = prop =>{
    let flag = prop.interests.response.find(data => data.id === prop.id)
    if(flag === undefined)return'';
    return flag.string;
}


const GetInterests = prop=>{
    return(
        <em>
            {findData(prop)}
        </em>
    )
}


export default connect(mapStateToProps,null)(GetInterests)