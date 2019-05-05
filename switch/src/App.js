import React, { Component } from 'react';
import aws_config from "./aws-exports";
import Amplify from '@aws-amplify/core';
import { withRouter } from "react-router-dom";
import './App.css';
import img from './img/background.png';

Amplify.configure(aws_config);

class App extends Component {
    constructor() {
        super();
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(e) {
        e.preventDefault();
        this.props.history.push('/room-list');
    }

    render() {
        return (
                <div className="home">
                    <img src={img} className="home-img" />
                    <h1 className="home-header">WELCOME TO SWITCH</h1>
                    <div>
                        <button className="login-button" onClick={this.handleClick}>Login</button>
                    </div>
                </div>
        )
    }
}

export default withRouter(App);
