import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

class StartPage extends React.Component {
    render() {
        return (
            <Router>
                <Button className="game-rules-button"><Link to="/game-rules">Game Rules</Link></Button>
                <Button className="profile-button"><Link to="/profile">My Profile</Link></Button>
                <Button className="enter-room-num-button"><Link to="/room#">Enter Room Number</Link></Button>
                <Button className="new-room-button"><Link to="/new-room">Create a New Room</Link></Button>
                <Button className="random-button"><Link to="/random">Random Match</Link></Button>
                
                <Route path="/game-rules" component={GameRulesPage} />
                <Route path="/profile" component={ProfilePage} />
                <Route path="/room#" component={EnterRoomNumPage} />
                <Route path="/new-room" component={NewRoomPage} />
                <Route path="/random" component={RandomMatchPage} />
            </Router>
        );
    }
}