import React, { Component } from 'react';
import './App.css';
import bg from './img/background.png'

class App extends Component {
  render() {
    return (
      <div className="App">
          <img src={bg} className="App-bg" alt="background"/>
          <p className="App-header">WELCOME TO SWITCH</p>
      </div>
    );
  }
}

export default App;
