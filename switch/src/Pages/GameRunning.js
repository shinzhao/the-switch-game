import React, { Component } from 'react';
import './GameRunning.css';
import Game from './phaser/Game';
import { withAuthenticator } from 'aws-amplify-react';
import { withRouter } from 'react-router-dom';
import { Button } from 'react-bootstrap';

/**
 * This component will render out the phaser gameboard interface
 * if a "start" button was clicked.
 */
class GameRunning extends Component {
    constructor() {
        super();
        this.state={
            showGame: true
        }
        this.handleBackClick = this.handleBackClick.bind(this);
    }

    /**
     * Handles the "back" button click.
     * First hides away the phaser gameboard,
     * then redirects to room list page.
     * @param {event} e 
     */
    handleBackClick(e) {
        e.preventDefault();
        this.setState({
          showGame : false  
        })
        this.props.history.push('/room-list');
    }
   
    render() {
        return(
            <div className="running">
                <head>
                    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous" />
                </head>
                <Button className="room-back-button" variant="secondary" onClick={this.handleBackClick}>Back</Button>
                { this.state.showGame ? <Game /> : 
                    <div>
                    </div>
                }
            </div>
        );
    }

}

export default withRouter(withAuthenticator(GameRunning,true));

