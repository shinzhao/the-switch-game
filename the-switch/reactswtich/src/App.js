import React, { Component } from 'react';
import './App.css';
import Game from './phaser/Game';
import aws_config from "./aws-exports";
import Amplify from '@aws-amplify/core'



Amplify.configure(aws_config);



class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <Game/>
        </header>
      </div>
    );
  }
}

export default App;
