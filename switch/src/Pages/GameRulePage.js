import React, { Component } from 'react';
import RoomListPage from './RoomListPage';
import './RoomPage.css';

class GameRulePage extends React.Component {
    constructor() {
        super();
        this.state={
            enableRoomListPage: false,
            enableGameRulePage: true
        }
        this.handleBackClick = this.handleBackClick.bind(this);
        this.showGameRulePage = this.showGameRulePage.bind(this);
    }

    handleBackClick() {
        this.setState({ 
            enableRoomListPage: true,
            enableGameRulePage: false
         })
    }

    showGameRulePage() {
        return(
            <div>
                <p className="test">This is the game rule page</p>
                <button onClick={this.handleBackClick}>Back</button>
            </div>
        )
    }


    render() {
        return(
            <div>
                { this.state.enableGameRulePage ? this.showGameRulePage() : null}
                { this.state.enableRoomListPage ? <RoomListPage /> : null }
            </div>
        );
    }
}

export default GameRulePage;