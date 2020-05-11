/**
 * Main function that renders the screen depending on the route in browser
 * It uses the <code> react-router </code> dependency to import
 * <em> Router, Route, Switch </en> that allows react to check for the browser
 * change and update depending on this.
 * 
 * The application uses 3 different components depending on the state of the 
 * application.
 * If the user is autherized they can enter all <code> <PrivateRoute> </code>
 * routes of the application. Otherwise they can only access the 
 * <code <PublicRoute> </code>.
 * The component <code> <FrontScreen> </code> decides if the frontscreen
 * should show the login screen that allows the user to sign up or the menu
 * allowing the user traverse the application.
 * 
 * @author Netanel Avraham Eklind
 * @version 1.0.3
 * 
 * TODO: Implementing the different screens and better the router service.
 */

import React, { Component } from 'react';
import {BrowserRouter as Router,Route,Switch, Redirect} from 'react-router-dom';
import './App.css';
import LoginView from './screen/LoginView/Login';
import UserService from './screen/UserServiceView/UserService';
import loginModel from './model/LoginModel';
import Order from './screen/OrderView/Order';
import orderModel from './model/OrderModel';
import {isAuth} from './model/JWTDecoder';
import Home from './screen/HomeView/HomeView';
import Logout from './screen/LogoutView/LogutContainer';
/**
 * Method to render the application to display the different screens depending on browser router.
 * @returns             The virtual REACT dom to be rendered.asdasdaasdasd
 */
class App extends Component{
  render(){
    return (
      <div id="app-component">
        <div className="circle c0" id="circle0"/>
        <div className="circle c1" id="circle1"/>
         <div className="circle c2" id="circle2"/>
        <div id ="Login-Message">
          {!isAuth() ? ( <h1 id="message">Welcome!<br/>Sign up to start service!</h1>) : ("")}
        </div>
          <Router>
            <Switch> 
              <FrontScreen exact path ="/" component={{home:Home,login: LoginView }}/>
              <PrivateRoute exact path ="/order" component = {Order} model ={orderModel} isAuth ={isAuth()}/>
              <PrivateRoute exact path ="/userservice" component = {UserService} store = {loginModel.store} isAuth ={isAuth()}/>
              <PrivateRoute exact path ="/logout" component ={Logout} isAuth={isAuth()} store={loginModel.store} menu= {Home}/>
            </Switch>
          </Router>
      </div>
  );
}
}

/**
 * Displays either the login view or the menu/"homeview" depending if the user is 
 * autherized or not.
 * @param {Components} param0 
 */
const FrontScreen = ({component:{home:Home,login: LoginView}}) =>{
  return (
    isAuth() ?(<PrivateRoute component ={Home} store={loginModel.store}/>)
    :(
    <PublicRoute model = {loginModel} component ={LoginView}/>)
  )
}

/**
 * Renders public components to the user
 * @param {Components} param0 
 */
const PublicRoute = ({component: Component, ...rest}) =>{
  return (
    <Route {...rest} render ={ props =><Component {...props} {...rest}/>}
    />
  )
}

/**
 * Renders these components only if the user is autherized.
 * @param {Components} param0 
 */
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
