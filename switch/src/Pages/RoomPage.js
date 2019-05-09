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
            showGame: false
        }
        this.handleBackClick = this.handleBackClick.bind(this);
        this.handleStartClick = this.handleStartClick.bind(this);
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
        })();
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
                
                { this.state.showGame ? <Game /> : null }
                
            </div>
        );
    }
}

export default withRouter(withAuthenticator(RoomPage,true));
