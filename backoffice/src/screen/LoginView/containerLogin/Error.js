
import {connect} from 'react-redux'

const mapStateToProps = state =>{
    return{
        loginUser: state.loginUser,
        signupUser: state.signupUser
    }
}


const DisplayError =(props)=>{
    let error =[props.signupUser.error,props.loginUser.error]
    return error.map(err => {
        if(err !=='')  return `Error: ${err}`;
        else{
            return null;
        }
    })
}

export default connect(mapStateToProps)(DisplayError)