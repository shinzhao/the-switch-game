import React, { Component } from 'react';
import RoomListPage from './RoomListPage';
import './RoomPage.css';
import Game from './phaser/Game';
import { withAuthenticator } from 'aws-amplify-react';
import { withRouter } from 'react-router-dom';

class RoomPage extends React.Component {
    constructor() {
        super();
        this.handleBackClick = this.handleBackClick.bind(this);
    }

    handleBackClick(e) {
        e.preventDefault();
        this.props.history.push('/room-list')
    }

    render() {
        return(
            <div className="room">
                <p className="test">This is the room page</p>
                <button onClick={this.handleBackClick}>Back</button>
                <Game />
            </div>
        );
    }
}

export default withRouter(withAuthenticator(RoomPage));
