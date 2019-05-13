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
import { SelectMFAType } from 'aws-amplify-react/dist/Widget';
import { type } from 'os';

class RoomPage extends React.Component {
    constructor() {
        super();
        this.state={
            showGame: false,
            isRoomMaster: true,
            isReady: false,
            num_ready: 1,
            roomOwner : false,
            players : ['p1','p2','p3','p4'],
            readStatus : ['false','false','false'],
            roomid : Number
        }
        this.handleBackClick = this.handleBackClick.bind(this);
        this.handleStartClick = this.handleStartClick.bind(this);
        this.handleReadyClick = this.handleReadyClick.bind(this);
        this.showReadyButton = this.showReadyButton.bind(this);
        this.showStartButton = this.showStartButton.bind(this);
    }

    componentDidMount(){
        this.waitAndGetList();
        const data = this.props.location.query;
        console.log('data from list '+data);
        this.setState({roomid:data});
        //this.setPlayers();
        //this.getPlayersByID();
        //this.setRoomOwner();
    }



    async setRoomOwner(){
        const getUser = await Auth.currentAuthenticatedUser();
        const name = getUser.username;
        const data = this.props.location.query;
        console.log('data from list '+data);
        const getPlayers = await API.graphql(graphqlOperation(queries.getRoompage,{
            roomid : data
        }));
        const list = getPlayers.data.getRoompage.players;
        if (list[0] == name ){
            this.setState({
                roomOwner : true
            })
        }

    }
    async waitAndGetList() {
        console.log('Just~~~~~~~~')
        await this.sleep(300)
        console.log('wait 0.3 second');
        this.setPlayers();
        this.setRoomOwner();
      }
      sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms))
      }
      
    
    getPlayersByID(){
        (async () => {
            
            const getUser = await Auth.currentAuthenticatedUser();
            const name = getUser.username;
            const getRoomID = await API.graphql(graphqlOperation(queries.getQw,{
                username : name
            }));
            const result = getRoomID.data.getQw.roomID;
            console.log('the name is '+ name);
            console.log('roomid ' + result);
            console.log('type of result : ' +typeof(result));
            const getPlayersInTheRoom = await API.graphql(graphqlOperation(queries.getRoompage,{
                roomid : result
            }))
            const playerlist = getPlayersInTheRoom.data.getRoompage.players;
            console.log('players you have : '+ playerlist);
            console.log('type of playerlist : '+ typeof(playerlist));
            console.log('player 1 is ' + playerlist[0] );

        })();
    }
    async setPlayers(){
        const data = this.props.location.query;
        console.log('check at fun ' + data);
        (async () => {
            const getPlayers = await API.graphql(graphqlOperation(queries.getRoompage,{
                roomid : data
            }));
            
            const list = getPlayers.data.getRoompage.players;
            this.setState({
                players : list
            })
            
         
        })();
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
    if(this.state.roomOwner == false){    
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
                        <Card.Title>The room owner : {this.state.players[0]}</Card.Title>
                        { this.showStartButton() }
                    </Card.Body>
                </Card>
            )
        }
        else {
            if(this.state.isReady == true){
                return(
                    <Card  style={{width: '20rem'}} className="player-card">
                        <Card.Body>
                            <Card.Title>Player's Username :{this.state.players[i]}</Card.Title>
                            {/* { this.showReadyButton() } */}
                        </Card.Body>
                    </Card>
                )
            }
            else {
                return(
                    <Card style={{width: '20rem'}} className="player-card">
                        <Card.Body>
                            <Card.Title>Player's Username :{this.state.players[i]}</Card.Title>
                            {/* { this.showReadyButton() } */}
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
                <Button variant="secondary" onClick={this.handleBackClick}>Back</Button>
                <h1 className="room-header">This the room {this.state.roomid}</h1>
                { this.state.showGame ? <Game /> : null }
                
                { this.showPlayer(0) }
                { this.showPlayer(1) }
                { this.showPlayer(2) }
                { this.showPlayer(3) }
                {this.showReadyButton()}
            </div>
        );
    }
}


export default withRouter(withAuthenticator(RoomPage,true));

