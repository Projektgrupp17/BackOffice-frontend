/**
 * This class renders the login screen for the user
 * to login to the site and start ganing accesss to the serivce.
 * This is the main home page and will not be shown unless the user
 * is not logged in.
 * This class implements the <em> React component </em> that will provide the login with the 
 * specific model thus allowing the GSC <em> App </em> to give information from the model
 * to the view.
 * 
 * @Author Magnus Fredriksson
 * @version 0.0.1
 * 
 * TODO: 
 * * Implement Login <Netanel>
 * * Register
 * * Forgot password
 * * Contact us
 */

import React, { Component } from 'react';
import user from "../../model/LoginModel";
import Menu from '../HomeView/containerHome/MenuContainer'
import UserServiceBox from './containerUserService/UserServiceBox';

export default class UserService extends Component {
    /**
     * Creates a super with props and a state that is null, state will contain the information needed!
     * @param {Contains the model from the model layer, login} model 
     */
    constructor(props) {
        super(props)
        this.state = {
            auth: null,
            status: '',
            displayNavBar: false
        }
        this.status = this.handleStatus.bind(this);
    }

    handleStatus(status) {
        this.setState({
            ...this.state,
            status: status
        })
    }

    handleDisplay() {
        this.setState({
            ...this.state,
            displayNavBar: !this.state.displayNavBar
        })
    }

    /**
     * Render method that is returning the virtual dom to be rendered at the index.js file.
     * @return React virtual DOM
     */
    render() {
        let display = null;
                display = <UserServiceBox
                    handleStatusChanged = {this.handleStatus}
                    handleDisplay = {this.handleDisplay}
                    store= {this.props.store}
                    userEmail={user.getUsername()}
                    status={this.status}
                    orderRequestStatus={this.state.status}/>
        return (
            <div id="wrapper">
                <button id="Menu" onClick={() => this.handleDisplay()}>
                    <Menu label={"Menu"} display={this.state.displayNavBar} store={this.props.store} />
                </button>
                <div className="order-component">
                    {display}
                </div>
            </div>
        );
    }
}
