import React, { Component } from 'react';
import RoomListPage from './RoomListPage';
import './RoomPage.css';
import GamePage from './GamePage';

class RoomPage extends React.Component {
    constructor() {
        super();
        this.state={
            enableRoomListPage: false,
            enableRoomPage: true,
            enableGamePage: false
        }
        this.handleBackClick = this.handleBackClick.bind(this);
        this.showRoomPage = this.showRoomPage.bind(this);
        this.handleStartClick = this.handleStartClick.bind(this);
    }

    handleBackClick() {
        this.setState({ 
            enableRoomListPage: true,
            enableRoomPage: false,
            enableGamePage: false
         })
    }

    handleStartClick() {
        this.setState({
            enableRoomListPage: false,
            enableRoomPage: false,
            enableGamePage: true
        })
    }

    showRoomPage() {
        return(
            <div className="room-page">
                <p className="test">This is the room page</p>
                <button onClick={this.handleBackClick}>Back</button>
                <button onClick={this.handleStartClick}>Start</button>
            </div>
        )
    }

    render() {
        return(
            <div>
                { this.state.enableRoomPage ? this.showRoomPage() : null }
                { this.state.enableRoomListPage ? <RoomListPage /> : null }
                { this.state.enableGamePage ? <GamePage /> : null }
            </div>
        );
    }
}

export default RoomPage;