import React, { Component } from 'react';
import RoomListPage from './RoomListPage';
import './RoomPage.css';
import Game from './phaser/Game';
import { withAuthenticator } from 'aws-amplify-react';
import { withRouter } from 'react-router-dom';

class RoomPage extends React.Component {
    constructor() {
        super();
        this.state={
            showGame: false
        }
        this.handleBackClick = this.handleBackClick.bind(this);
        this.handleStartClick = this.handleStartClick.bind(this);
    }

    handleBackClick(e) {
        e.preventDefault();
        this.setState({
            showGame: false
        })
        this.props.history.push('/room-list')
    }

    handleStartClick(e) {
        e.preventDefault();
        this.setState({
            showGame: true
        })
    }

    render() {
        return(
            <div className="room">
                <p className="test">This is the room page</p>
                <button onClick={this.handleBackClick}>Back</button>
                <button onClick={this.handleStartClick}>Start</button>
                { this.showGame ? <Game /> : null }
            </div>
        );
    }
}

export default withRouter(withAuthenticator(RoomPage,true));
