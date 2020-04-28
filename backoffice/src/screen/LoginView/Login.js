/**
 * This class renders the login screen for the user
 * to login to the site and start ganing accesss to the serivce.
 * This is the main home page and will not be shown unless the user
 * is not logged in.
 * This class implements the <em> React component </em> that will provide the login with the 
 * specific model thus allowing the GSC <em> App </em> to give information from the model
 * to the view.
 * 
 * @Author Netanel Avraham Eklind
 * @version 0.0.1
 * 
 * TODO: 
 * * Implement Login <Netanel>
 * * Register
 * * Forgot password
 * * Contact us
 */

import React, { Component } from "react";



 class Login extends Component{
     /**
      * Creates a super with props and a state that is null, state will contain the information needed!
      * @param {Contains the model from the model layer, login} model 
      */
     constructor(params){
         super(params)
         this.state={
             email:'',
             password:'',
            auth:{
                token:'',
                refreshtoken:''
            }
         }
     }


     /**
      * This method is called when the component is rendered for the first time and will then 
      * add an observer to the class. 
      */
     componentDidMount(){
        this.props.model.addObserver(this);
     }

     /**
      * This method is called when the component is no longer needed and thus removing the 
      * observer from the site.
      */
     componentWillUnmount(){
        this.props.model.removeObserver(this);
     }

     /**
      * provides the class with the new model state
      * @param {observer update} payload 
      */
     update(payload){
        this.setState({
            ...this.state,
            auth:payload.store.getState().loginUser.auth
        })
     }

     /**
      * Dynamicly updates the state of the email attribute
      * @param {the event} e 
      */
     setUserName(e){
         this.setState({
             ...this.state,
             email:e.target.value
         })
     }

     /**
      * Dynamicly updates the state of the password attribute
      * @param {event} e 
      */
     setPassword(e){
        this.setState({
            ...this.state,
            password:e.target.value
        })
    }

    /**
     * On click sends the state of the email and password to the login model.
     */
     signUp(){
         this.props.model.login(this.state.email,this.state.password);
     }

     /**
      * Render method that is returning the virtual dom to be rendered at the index.js file.
      * @return             React virtual DOM
      */
     render(){
         return(
            <div id="login-component">
                <form>
                    <label>
                        Email:
                        <input type="text"name ="name" onChange={this.setUserName.bind(this)}/>
                    </label>
                    <label>
                        Password:
                        <input type="password"name="password"onChange={this.setPassword.bind(this)}/>
                    </label>
                    <input type="button" value="Login" onClick={()=> this.signUp()}/>
                </form>
                <h1>We have a auth: {this.state.auth.refreshtoken != null} !!</h1>
            </div>
         );
     }
 }

 export default Login