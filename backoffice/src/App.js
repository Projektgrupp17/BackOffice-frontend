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
/**
 * Method to render the application to display the different screens depending on browser router.
 * @returns             The virtual REACT dom to be rendered.
 */
class App extends Component{
  constructor(props){
    super(props)
    
    this.state = {
      currentUser:loginModel.getUsername()
    };
  }

  render(){
    return (
      <div id="app-component">
          <Router>
            <Switch>
              <Route exact path="/">
               <LoginView model={loginModel}/>
              </Route>
              <Route path="/order">
                <Order model ={orderModel}/>
              </Route>
              {/* <PrivateRoute path ="/order"
              component = {Order}/> */}
            </Switch>
          </Router>
      </div>
  );
}
}

const PrivateRoute = ({component: Component, ...rest}) =>{
      return(
        <Route
        {...rest}
        render = {
          props=> 
          isAuth ? (
            <Component {...props}/>
          ):
          (
            <Redirect to={{
              pathname: "/",
              state: {from: props.location}
            }}
            />
          )
        }
        />
      )
}

const isAuth = () =>{
      return App.state.currentUser !== null
}


export default App;
