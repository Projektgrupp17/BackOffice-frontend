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
 * @version 0.0.5
 * 
 * TODO: 
 * * Forgot password
 * * Contact us
 */

import React, { Component } from "react";
import LoginBox from './containerLogin/LoginBox';
import SignInBox from './containerLogin/SignInBox';
import './LoginStyle.css'
 class Login extends Component{
     /**
      * Creates a super with props and a state that is null, state will contain the information needed!
      * @param {Contains the model from the model layer, login} model 
      */
     constructor(params){
         super(params)
         this.state = {
             auth: null,
             status:'',
             display:0,
             message:''
            }
            this.status = this.handleStatusChange.bind(this);
            this.display = this.handleDisplay.bind(this)
        }

    handleDisplay(display){
        this.props.welcome(display);
    }

    /**
     * Tells the program if the loading is done or not, thus changing screen.
     * @param {String} status 
     */
     handleStatusChange(status){
        this.setState({
            ...this.state,
            status: status
        })
     }

     changeDisplayBox(value){
         this.props.model.cleareStoreError();
         this.setState({
             ...this.state,
             display:value
         })
     }

     /**
      * This method is called when the component is rendered for the first time and will then 
      * add an observer to the class. 
      */
     componentDidMount(){
        this.props.model.addObserver(this);
        if(document.cookie === '' || document.cookie.includes("logedOut")) return;
        this.setState({
            ...this.state,
            auth: this.props.model.getUsername(),
            status:'DONE'
        })
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
         if(payload.store.getState().loginUser.error !== ''){
            this.setState({
                ...this.state,
                auth:payload.store.getState().loginUser.auth,
                status:'',
                message: payload.store.getState().loginUser.error
            })
         }
         else if(payload.store.getState().signupUser.error !== ''){
            this.setState({
                ...this.state,
                auth:payload.store.getState().loginUser.auth,
                status:'',
                message: payload.store.getState().signupUser.error
            })
         }

         else{
             this.setState({
                 ...this.state,
                 auth:payload.store.getState().loginUser.auth,
                 status:'DONE'
             })
             this.props.history.push("/")
             this.handleDisplay("none");
         }
     }
     /**
      * Render method that is returning the virtual dom to be rendered at the index.js file.
      * @return             React virtual DOM
      */
     //Password1
     render(){
         let display = null;
         switch(this.state.status){
                 case 'DONE':
                     display = null;
                break;
                default:
                    display = this.setDisplayBox(this.state.display);
                }
                    return(
                        <div id="login-component">
               {display}
            </div>
         );
        }
        
        setDisplayBox = (state) => {
            switch(state){
                case 1:
                    return(
                        <div id = "SignBox">
                      <button  className="SignUp" id ="btn" onClick={() =>{this.changeDisplayBox(2); }}>
                        SignUp
                    </button>
                      <div id="login">
                          <LoginBox store={this.props.model.store}
                            status={this.status}/>
                        </div>
                      </div>
                  )
                case 2:
                    return(
                        <div id = "SignBox">
                            <div id="keeper"></div>
                            <button  className="SignIn" id ="btn" onClick={() => this.changeDisplayBox(1)}>
                      SignIn
                  </button>
                    <div id="sign">
                        <SignInBox store={this.props.model.store}
                        status={this.status}/>
                        </div>
                    </div>
                    )
                default:
                return(
                    <div id = "SignBox">
                    <button  className="SignUp" id ="btn" onClick={() => this.changeDisplayBox(2)}>
                        SignUp
                    </button>
                      <button  className="SignIn" id ="btn" onClick={() => this.changeDisplayBox(1)}>
                      SignIn
                  </button>
                    </div>
                )
          }
      }
 }



 
 export default Login