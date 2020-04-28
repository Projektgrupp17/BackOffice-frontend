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
             user:'',
             message:''
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
      * Render method that is returning the virtual dom to be rendered at the index.js file.
      * @return             React virtual DOM
      */
     render(){
         return(
            <div id="login-component">
                <h1>This is the login-homescreen</h1>
            </div>
         );
     }
 }

 export default Login