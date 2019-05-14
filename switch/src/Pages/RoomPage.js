import React, { Component } from 'react';
import RoomListPage from './RoomListPage';
import './RoomPage.css';
import Game from './phaser/Game';
import { withAuthenticator } from 'aws-amplify-react';
import { withRouter } from 'react-router-dom';
import * as mutations from '../graphql/mutations';
import AWSAppSyncClient, { AUTH_TYPE } from 'aws-appsync';
import aws_config from '../aws-exports';
import { Auth } from 'aws-amplify';
import * as queries from './phaser/../../graphql/queries';
import Amplify, { API, graphqlOperation } from "aws-amplify";
import { Button, Card } from 'react-bootstrap';

class RoomPage extends React.Component {
    constructor() {
        super();
        this.state={
            showGame: false,
            isRoomMaster: true,
            isReady: false,
            num_ready: 1,
            username: []
        }
        this.handleBackClick = this.handleBackClick.bind(this);
        this.handleStartClick = this.handleStartClick.bind(this);
        this.handleReadyClick = this.handleReadyClick.bind(this);
        this.showReadyButton = this.showReadyButton.bind(this);
        this.showStartButton = this.showStartButton.bind(this);
    }

    componentDidMount(){
        const data = this.props.location.query;
        console.log('data from list '+data);
      
    }
    handleBackClick(e) {
        e.preventDefault();
        this.setState({
            showGame: false
        })
        const data = this.props.location.query;
        console.log('data from list '+data);
        (async () => {
            const getUser = await Auth.currentAuthenticatedUser();
            const name = getUser.username;
            const getPlayers = await API.graphql(graphqlOperation(queries.getRoompage,{
                roomid : data
            }));
            const list = getPlayers.data.getRoompage.players;
            const result = list.filter(players => players != name);
            await API.graphql(graphqlOperation(mutations.updateRoompage,{
                input : {
                    roomid : data,
                    players : result
                }
            }));
            console.log(typeof(result));
            var count=0;
            for (var property in result) {
                if (Object.prototype.hasOwnProperty.call(result, property)) {
                    count++;
                }
            }
            if(count == 0){
                await API.graphql(graphqlOperation(mutations.deleteRoompage,{
                    input:{
                        roomid : data
                    }
                }))
            }
        })();
        this.props.history.push('/room-list')
    }

    componentWillUnmount(){
        
    }

    handleStartClick(e) {
        e.preventDefault();
        //need to check if the room has 4 players, otherwise cannot start the game as well
        this.setState({
            showGame: true
        });
        
    }

    handleReadyClick(e) {
        e.preventDefault();
        if(this.state.isReady == true) {
            console.log("false")
            this.setState({
                num_ready: this.state.num_ready-1
            })
        }
        else{
            this.setState({
                num_ready: this.state.num_ready+1
            })
        }
        this.setState({
            isReady: !this.state.isReady
        })
    }

    showReadyButton() {
        if (this.state.isReady == true) {
            
            return (
                <Button className="unready-button" variant="danger" onClick={this.handleReadyClick}>Unready</Button>
            )
        }
        else {
            return (
                <Button className="ready-button" variant="success" onClick={this.handleReadyClick}>Ready</Button>
            )
        }
    }

    showStartButton() {
        if(this.state.num_ready == 3) {
            return (
                <Button className="start-button" variant="success" onClick={this.handleStartClick}>Start</Button>
            )
        }
        else {
            return(
                <Button className="disabled-start-button" variant="secondary" disabled>Start</Button>
            )
        }
    }

    //only show button under the player's own card
    showPlayer(i) {
        if(i == 0){
            return(
                <Card bg="warning" style={{width: '20rem'}} className="master-card">
                    <Card.Body>
                        <Card.Title>Room Master's Username</Card.Title>
                        { this.showStartButton() }
                    </Card.Body>
                </Card>
            )
        }
        else {
            if(this.state.isReady == true){
                return(
                    <Card bg="success" style={{width: '20rem'}} className="player-card">
                        <Card.Body>
                            <Card.Title>Player's Username</Card.Title>
                            { this.showReadyButton() }
                        </Card.Body>
                    </Card>
                )
            }
            else {
                return(
                    <Card style={{width: '20rem'}} className="player-card">
                        <Card.Body>
                            <Card.Title>Player's Username</Card.Title>
                            { this.showReadyButton() }
                        </Card.Body>
                    </Card>
                )
            }
        }
    }

    render() {
        return(
            <div className="room">
                <head>
                    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous" />
                </head>
                <Button variant="secondary" onClick={this.handleBackClick}>Quit</Button>
                <h1 className="room-header">Show Room Number</h1>
                { this.state.showGame ? <Game /> : null }
                { this.showPlayer(0) }
                { this.showPlayer(1) }
                { this.showPlayer(2) }
                { this.showPlayer(3) }
                <div className="info-board">
                    
                </div>
            </div>
        );
    }
}


export default withRouter(withAuthenticator(RoomPage,true));

