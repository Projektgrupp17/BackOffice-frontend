import React,{Component} from 'react';
import {connect} from 'react-redux';
import {signup} from '../../../model/LoginModel';


const mapDispatchToProps = dispatch=>{
    return{
        signup: () => dispatch(signup())
    }
}


class SignInContainer extends Component{
    constructor(props){
        super(props)
        this.state ={
            username:'',
            email:'',
            password:'',
            agency:''
        }
        this.handleStatus = this.handleStatus.bind(this);
    }


    /**
     * Change status of signupbox
     * @param {Status of login} status 
     */
    handleStatus(status){
        this.props.status(status)
    } 


    handleSubmit = event =>{
        event.preventDefault();
        console.log(this.state)
        this.props.signup(this.state)
        this.handleStatus("LOADING");
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

    setusername(e){
        this.setState({
            ...this.state,
            username:e
        })
    }
    setAgency(e){
        this.setState({
            ...this.state,
            agency:e
        })
    }
    validateForm(){
            return this.state.email.length > 0 && this.state.password.length > 0
             && this.state.username.length > 0 && this.state.agency.length > 0;
          }

    render(){
        return(
        <div id="signupbox">
            <form onSubmit={this.handleSubmit}>
                <label>
                    Email:
                    <input type="text"name ="Email" value={this.state.email} onChange={e => this.setEmail(e.target.value)}/>
                </label>
                <label>
                    username:
                    <input type="text"name="username" value={this.state.username} onChange={e => this.setusername(e.target.value)}/>
                </label>
                <label>
                    Password:
                    <input type="password"name="password" value={this.state.password} onChange={e=>this.setPassword(e.target.value)}/>
                </label>

                <label>
                    agency:
                    <input type="text"name="agecy" value={this.state.agency} onChange={e => this.setAgency(e.target.value)}/>
                </label>
                <input type="submit" value="Signup" disabled={!this.validateForm()}/>
            </form>
        </div>
        )
    }

}

export default connect(null,mapDispatchToProps)(SignInContainer)