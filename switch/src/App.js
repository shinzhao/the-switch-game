import React, { Component } from 'react';
import './App.css'
import Login from './Pages/LoginPage';
import bg from './img/background.png';

class App extends Component {
    constructor(){
        super();
        this.state={
            enable: false
        };
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(){
        this.setState({
            enable: true
        });
    }

    render() {
        return (
            <div className="App">
              <img src={bg} className="App-bg" alt="background"/>
              <p className="App-header">WELCOME TO SWITCH</p>
              <div>
                <button onClick={this.handleClick}>Login</button>
                {this.state.enable ? <Login /> : null}
              </div>
            </div>
        )
    }
}

export default App;
