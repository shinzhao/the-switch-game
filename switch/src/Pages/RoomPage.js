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

class RoomPage extends React.Component {
    constructor() {
        super();
        this.state={
            showGame: false,
            isRoomMaster: false,
            isReady: false,
            num_ready: 1
        }
        this.handleBackClick = this.handleBackClick.bind(this);
        this.handleStartClick = this.handleStartClick.bind(this);
        this.showButton = this.showButton.bind(this);
        this.handleReadyClick = this.handleReadyClick.bind(this);
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
        if (this.state.num_ready == 3) {
            this.setState({
            showGame: true
            })
        }
        else {
            alert("There are players not ready yet")
        }   
    }

    handleReadyClick(e) {
        e.preventDefault();
        this.setState({
            isReady: !this.state.isReady
        })
    }

    showButton() {
        //need to get from db if the person is the first one to get into the db, set he/she as the room master = true
        if(this.state.isRoomMaster == true) {
            if(this.state.num_ready == 3) {
                return (
                    <button onClick={this.handleStartClick}>Start</button>
                )
            }
            else {
                return(
                    <button disabled>Start</button>
                )
            }
            
        }
        else {
            if (this.state.isReady == true) {
                return (
                    <button className="unready-button" onClick={this.handleReadyClick}>Unready</button>
                )
            }
            else {
                return <button className="ready-button" onClick={this.handleReadyClick}>Ready</button>
            }
        }
    }

    render() {
        return(
            <div className="room">
                <button onClick={this.handleBackClick}>Back</button>
                <button onClick={this.handleStartClick}>Start</button>
                { this.showButton() }
                { this.state.showGame ? <Game /> : null }
                
            </div>
        );
    }
}


export default withRouter(withAuthenticator(RoomPage,true));

