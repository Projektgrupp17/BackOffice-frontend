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
        if(this.state.displayNavBar === false){
            this.setState({
                ...this.state,
                displayNavBar:true
            })
        }
        else{
            this.setState({
                ...this.state,
                displayNavBar:false
            })
        }
    }

    render(){
        return(
            <div id="wrapper">
                    <button id="Menu" onClick={() =>this.handleDisplay()}>
                        <Menu label={"Menu"} display={this.state.displayNavBar}/>
                    </button>
            </div>
        )
    }
}

export default HomeView