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

import React, { Component } from "react";
import OrderBox from './containerOrder/OrderBox';
import user from "../../model/LoginModel";
import Menu from '../HomeView/containerHome/MenuContainer'



class Order extends Component {
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

    /**
     * This method is called when the component is rendered for the first time and will then 
     * add an observer to the class. 
     */
    componentDidMount() {
        this.props.model.addObserver(this);
    }

    /**
     * This method is called when the component is no longer needed and thus removing the 
     * observer from the site.
     */
    componentWillUnmount() {
        this.props.model.removeObserver(this);
    }

    update(payload) {
        let status = '';
        if (payload.store.getState().order.Loading || payload.store.getState().interests.loading)
            status = "LOADING";

        if (payload.store.getState().order.error)
            status = "ERROR";
        this.setState({
            ...this.state,
            status: status,
            response: payload.store.getState().order.response
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
     * @return             React virtual DOM
     */
    render() {
        let display = null;
        switch (this.state.status) {
            case 'LOADING':
                display = <em>Loading...</em>;
                break;
            case 'SUCCESS':
                display = <b>{"SUCCESS: " + this.props.model.store.getState().order.response}</b>;
                break;
            case 'ERROR':
                display = <b>{"ERROR"}</b>;
                break;
            default:
                display = <OrderBox
                    username={user.getUsername()}
                    store={this.props.model.store}
                    status={this.status} />
        }
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


export default Order
