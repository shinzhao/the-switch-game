import React, { Component } from 'react';
import './App.css'
import Login from './pages/LoginPage';
import bg from './background.png'

class App extends Component {
    constructor(){
        super();
        this.state={
            clicked: false
        };
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(){
        this.setState({
            clicked: true
        });
    }

    render() {
        return (
            <div className="App">
              <img src={bg} className="App-bg" alt="background"/>
              <p className="App-header">WELCOME TO SWITCH</p>
              <div>
                <button onClick={this.handleClick}>Login</button>
                {this.state.clicked ? <Login /> : null}
              </div>
            </div>
        )
    }
}

export default App;
