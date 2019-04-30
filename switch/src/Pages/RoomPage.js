import React, { Component } from 'react';
import RoomListPage from './RoomListPage';
import './RoomPage.css';
import Game from './phaser/Game';

class RoomPage extends React.Component {
    constructor() {
        super();
        this.state={
            enableRoomListPage: false,
            enableRoomPage: true
        }
        this.handleBackClick = this.handleBackClick.bind(this);
        this.showRoomPage = this.showRoomPage.bind(this);
    }

    handleBackClick() {
        this.setState({ 
            enableRoomListPage: true,
            enableRoomPage: false
         })
    }

    showRoomPage() {
        return(
            <div>
                <p className="test">This is the room page</p>
                <button onClick={this.handleBackClick}>Back</button>
                <Game />
            </div>
        )
    }

    render() {
        return(
            <div>
                { this.state.enableRoomPage ? this.showRoomPage() : null}
                { this.state.enableRoomListPage ? <RoomListPage /> : null }
            </div>
        );
    }
}

export default RoomPage;
