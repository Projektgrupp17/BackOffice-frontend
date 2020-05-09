import React,{Component} from 'react';
import {connect} from 'react-redux';
import {signup} from '../../../model/LoginModel';
import DisplayError from './Error';
import './SignInBox.css';

/**
 * Dispatches the action to the store.
 * @param {Store} dispatch 
 */
const mapDispatchToProps = dispatch=>{
    return{
        signup: (json) => dispatch(signup(json))
    }
}

/**
 * This class implements the container to deal with the signin of the web-application.
 * It does this by implementing a form that is connected with the store in the lower model
 * layer. Thus when the form is sent the state of this class is sent down and used to register
 * the new user to the authentication api.
 * @author Netanel Avraham Eklind
 * @version 1.0.0
 */

class SignInContainer extends Component{
    constructor(props){
        super(props)
        this.state ={
            username:'',
            email:'',
            password:'',
            agency:''
        }
        this.handleStatus = this.handleStatusChange.bind(this);
    }


    /**
     * Change status of signupbox
     * @param {Status of login} status 
     */
    handleStatusChange(status){
        this.props.status(status)
    } 

    /**
     * Calls when a submit event is detected. Prevents refresh of site.
     */
    handleSubmitEvent = event =>{
        event.preventDefault();
        this.props.signup(this.state)
        this.handleStatusChange("LOADING");
    }

    setEmail(value){
        this.setState({
            ...this.state,
            email:value
        })
    }

    setPassword(value){
        this.setState({
            ...this.state,
            password:value
        })
    }

    setusername(value){
        this.setState({
            ...this.state,
            username:value
        })
    }
    setAgency(value){
        this.setState({
            ...this.state,
            agency:value
        })
    }
    /**
     * Validates that the form is filled out and no empty boxes are found!
     */
    validateForm(){
            return this.state.email.length > 0 && this.state.password.length > 0
             && this.state.username.length > 0 && this.state.agency.length > 0;
          }

    render(){
        return(
        <div id="signupbox">
            <form onSubmit={this.handleSubmitEvent}>
                <label className="email">
                   <b>Email:</b>
                    <input type="text"name ="Email" value={this.state.email} onChange={e => this.setEmail(e.target.value)}/>
                </label>
                <label className="username">
                <b>Username:</b>
                    <input type="text"name="username" value={this.state.username} onChange={e => this.setusername(e.target.value)}/>
                </label>
                <label className="password">
                <b>Password:</b>
                    <input type="password"name="password" value={this.state.password} onChange={e=>this.setPassword(e.target.value)}/>
                </label>

                <label className="agency">
                <b>Agency:</b>
                    <input type="text"name="agecy" value={this.state.agency} onChange={e => this.setAgency(e.target.value)}/>
                </label>
                <div className="Button-signup">
                <input type="submit" value="Signup" disabled={!this.validateForm()} id="submit"/>
                </div>
                <div className ="Error-messageSignup">
                    <DisplayError store={this.props.store}/>
                </div>
            </form>
        </div>
        )
    }

}

export default connect(null,mapDispatchToProps)(SignInContainer)