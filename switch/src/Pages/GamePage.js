import React, { Component } from 'react';
import RoomPage from './RoomPage';
import Game from './phaser/Game';
import './GamePage.css'

class GamePage extends React.Component{
    constructor() {
        super();
        this.state={
            enableGameBoard: true,
            exit: false
        }
    }

    render(){
        return (
            <div className="game-page">
                { this.state.enableGameBoard ? <Game /> : null }
            </div>
        );
    }
}

export default GamePage;