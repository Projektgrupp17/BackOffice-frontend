/**
 * This file handles the login box component for the login site
 * 
 * @author Netanel Avraham Eklind
 * @version 1.0.0
 */

import React,{Component} from 'react'
import {connect} from 'react-redux'
import {login} from '../../../model/LoginModel'
import './LoginBox.css';
import DisplayError from './Error';

/**
 * Dispatch a new update to the store with the given dispatch from 
 * the store.
 * @param {Store} dispatch  action to be taken
 */
const mapDispatchToProps = dispatch=>{
    return {
        login: (email,password) => dispatch(login(email,password))
    }
}

const mapStateToProps = state =>{
    return{
        loginUser:state.loginUser
    }
}

/**
 * The main component of the loginbox.
 * It handles the submition of the email and password and sends it to the store
 * for login.
 */
class LoginContainer extends Component{
    constructor(prop){
        super(prop)
        
        this.state ={
            email:'',
            password:'',
        }

        this.handleStatus = this.handleStatus.bind(this);
    }

    /**
     * Change status of loginbox
     * @param {Status of login} status 
     */
    handleStatus(status){
        this.props.status(status)
    } 

    /**
     * Checks that there is valid input
     */
   validateForm() {
        return this.state.email.length > 0 && this.state.password.length > 0;
      }

      /**
       * When sumbiting form this handles the operation
       */
    handleSubmit = event =>{
        event.preventDefault();
        this.props.login(this.state.email,this.state.password)
    }

    setEmail(e){
        this.setState({
            ...this.state,
            email:e
        })
    }

    setPassword(e){
        this.setState({
            ...this.state,
            password:e
        })
    }


    /**
     * Main class render method.
     */
    render(){
        return(
            <div id="loginbox">
                 <form onSubmit={this.handleSubmit}>
                        <label className = "email">
                           <b id="email-text">Email:</b>
                            <input type="text"name ="name" value={this.state.email} onChange={e => this.setEmail(e.target.value)}/>
                        </label>
                        <label className = "password">
                        <b id="password-text">Password:</b>
                            <input type="password"name="password" value={this.state.password} onChange={e=>this.setPassword(e.target.value)}/>
                        </label>
                        <div className="Button-login">
                        <input type="submit" value="Login" disabled={!this.validateForm()} className ="submit"/>
                        </div>
                        {this.props.loginUser.loading ?(<b>Loading...</b>):(
                        <div className="Error-message">
                           <DisplayError store={this.props.store}/>
                        </div>
                        )}
                    </form>
            </div>
        )
    }
}


export default connect(mapStateToProps,mapDispatchToProps)(LoginContainer)
