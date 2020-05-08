/**
 * Main function that renders the screen depending on the route in browser
 * It uses the <code> react-router </code> dependency to import
 * <em> Router, Route, Switch </en> that allows react to check for the browser
 * change and update depending on this.
 * 
 * @author Netanel Avraham Eklind
 * @version 0.1
 * 
 * TODO: Implementing the different screens and better the router service.
 */

import React, { Component } from 'react';
import {BrowserRouter as Router,Route,Switch, Redirect} from 'react-router-dom';
import './App.css';
import LoginView from './screen/LoginView/Login';
import loginModel from './model/LoginModel';
import Order from './screen/OrderView/Order';
import orderModel from './model/OrderModel';
import {isAuth} from './model/JWTDecoder';
import Home from './screen/HomeView/HomeView';
import Logout from './screen/HomeView/containerHome/LogutContainer';
/**
 * Method to render the application to display the different screens depending on browser router.
 * @returns             The virtual REACT dom to be rendered.asdasdaasdasd
 */
class App extends Component{
  constructor(){
    super()
    this.state ={
      displayWelcome:true
    }
    this.display = this.handleDisplay.bind(this)
  }

  /**
   * Binds with the login screen to show either welcome message or signup/signin screen!
   * @param {Boolean} change 
   */
  handleDisplay(change){
    this.setState({
      ...this.state,
      displayWelcome:change
    })
  }
  render(){
    return (
      <div id="app-component">
        <div className="circle c0" id="circle0"/>
        <div className="circle c1" id="circle1"/>
         <div className="circle c2" id="circle2"/>
        <div id ="Login-Message">
          {welcomeMessage(this.state.displayWelcome) ? (
            <h1 id="message">Welcome!<br/>Sign up to start service!</h1>) : ("")}
        </div>
          <Router>
            <Switch>
              <PublicRoute
              exact
              path ="/"
              model = {loginModel}
              component ={LoginView}
              display = {this.display}
              />
              <PrivateRoute 
              exact
              path ="/order"
              component = {Order}
              model ={orderModel}
              isAuth ={isAuth()}
              />
              <PrivateRoute exact path ="/home" component ={Home} isAuth={isAuth()} store={loginModel.store}/>
              <PrivateRoute exact path ="/logout" component ={Logout} isAuth={isAuth()} store={loginModel.store} menu= {Home}/>
            </Switch>
          </Router>
      </div>
  );
}
}

const welcomeMessage= (flag)=>{
  if(flag === true && document.cookie === ''){
  return true
  }
  else{
    return false
  }
}

const PublicRoute = ({component: Component, ...rest}) =>{
  return (
    <Route {...rest} render ={ props =><Component {...props} {...rest}/>}
    />
  )
}

const PrivateRoute = ({component: Component, ...rest}) =>{
      return(
        <Route
        {...rest}
        render = {
          (props) => 
          isAuth() ? (
            <Component {...props} {...rest}/>
          ):
          (
            <Redirect to="/"/>
          )
        }
        />
      )
}

export default App;
export {PrivateRoute};
