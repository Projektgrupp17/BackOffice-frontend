import React, { Component } from "react";
import './HomeView.css'
import Menu from './containerHome/MenuContainer'

class HomeView extends Component{
    constructor(prop){
        super(prop)
        this.state ={
            displayNavBar:false
        }
    }

    handleDisplay(){
        this.setState({
            ...this.state,
            displayNavBar:!this.state.displayNavBar
        })
    }

    render(){
        return(
            <div id="wrapper">
                    <button id="Menu" onClick={() =>this.handleDisplay()}>
                        <Menu label={"Menu"} display={this.state.displayNavBar} store={this.props.store}/>
                    </button>
            </div>
        )
    }
}

export default HomeView