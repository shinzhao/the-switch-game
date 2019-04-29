import React, { Component } from 'react';
import './App.css'
import Login from './Pages/LoginPage';
import bg from './img/background.png';
import aws_config from "./aws-exports";
import Amplify from '@aws-amplify/core'

Amplify.configure(aws_config);

class App extends Component {
    constructor(){
        super();
        this.state={
            enable: false
        };
        this.handleClick = this.handleClick.bind(this);
        this.showHome = this.showHome.bind(this);
    }

    handleClick(){
        this.setState({
            enable: true
        });
    }

    showHome(){
        return(
            <div className="App">
              <img src={bg} className="App-bg" alt="background"/>
              <p className="App-header">WELCOME TO SWITCH</p>
              <div>
                <button className="login-button" onClick={this.handleClick}>Login</button>
              </div>
            </div>
        );
    }

    render() {
        return (
            <div className="App">
              {this.state.enable ? <Login /> : this.showHome()}
            </div>
        )
    }
}

export default App;
