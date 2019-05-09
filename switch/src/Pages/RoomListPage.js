import React, { Component } from 'react';
import img from '../img/background.png';
import './RoomListPage.css';
import RoomPage from './RoomPage';
import GameRulePage from './GameRulePage';
import ProfilePage from './ProfilePage';
import { withRouter } from "react-router-dom";
import { Auth } from 'aws-amplify';
import Amplify, { API, graphqlOperation } from "aws-amplify";
import * as queries from './phaser/../../graphql/queries';
import * as subscriptions from'./phaser/../../graphql/subscriptions';
import * as mutations from '../graphql/mutations';

class RoomListPage extends React.Component {
    constructor(){
        super();
        this.state={
            /* 
            ************************
            READ!!!!!!
            ***********************

            roomID -> rID, I am using roomID in DB, and these 2 roomID mess me up

            */
            rID: '',
            player_count: getPlayerCount(),
            status: getStatus(),
            room: getRoom()
        };
        this.handleProfileClick = this.handleProfileClick.bind(this);
        this.handleGameRuleClick = this.handleGameRuleClick.bind(this);
        this.handleRoomClick = this.handleRoomClick.bind(this);
        this.handlePrevClick = this.handlePrevClick.bind(this);
        this.handleNextClick = this.handleNextClick.bind(this);
        this.handleCreateClick=this.handleCreateClick.bind(this);
    }
           
    async componentDidMount() {
        this.getRoom();
        this.getPlayersCount();
        /*

        this.listenOnRoom = await API.graphql(graphqlOperation(subscriptions.onCreateRoompage)
        ).subscribe({
          next: (roomData) =>console.log('sub test '+roomData.value.data.onCreateRoompage.roomid) 
          //this.createTodo(todoData.value.data.onCreateTodo)
        });      
  }
  componentWillUnmount() {
    this.listenOnRoom.unsubscribe();
  }
  
  */
}
//appsync get room (query)
getRoom = async () => {
    var storeRoom = [];
    const result = await API.graphql(graphqlOperation(queries.listRoompages));
    for(let i=0;i<result.data.listRoompages.items.length;i++){
        console.log(result.data.listRoompages.items[i].roomid);
        storeRoom.push(result.data.listRoompages.items[i].roomid);
        }
    this.setState({rID : storeRoom });
    console.log('TEST FOR QUERY ' + this.state.rID);
    }
getPlayersCount = async ()=>{
    var playercount = [];
    const result = await API.graphql(graphqlOperation(queries.listRoompages));
    for(let i=0;i<result.data.listRoompages.items.length;i++){
        const obj = result.data.listRoompages.items[i].players;
        var count = 0;
        for (var property in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, property)) {
            count++;
        }
    }
         console.log('show the obj ' + count);
        playercount.push(count);
    }
    this.setState({player_count:playercount});
    console.log('TEST FOR playercount ' + this.state.player_count);
}


//appsync get the playerCount in each room 
// getPlayerCount = async () =>{
//     var storePlayerCount = [];
//     const result = await API.graphql(graphqlOperation(queries.getRoompage, {roomid : rID});
// }

handleCreateRoom = async () =>{
    var min=1; 
    var max=9999;  
    var random =Math.floor(Math.random() * (+max - +min)) + +min; 
    console.log("Random Number Generated : " + random ); 
    const getUser = await Auth.currentAuthenticatedUser();
                const name = getUser.username;
    
    const result = await API.graphql(graphqlOperation(mutations.createRoompage,{
        input : {
            roomid : random,
            players : name
        }

    }));
}


    handleProfileClick(e) {
        e.preventDefault();
        this.props.history.push('/my-account');
    }

    handleGameRuleClick(e) {
        e.preventDefault();
        this.props.history.push('/game-rule');
    }
    
    //user allowed to enter the room only when the status of the room is not 'playing'
    handleRoomClick(e, i) {
        if(this.state.status[i] != 'playing'){
            (async () => {
                //get current user name
                const getUser = await Auth.currentAuthenticatedUser();
                const name = getUser.username;
                console.log(this.state.rID[i]);
                var num = this.state.rID[i];
                console.log(num);
                console.log('test for who click into a room , user :' + name + ' into a room #' +this.state.rID[i]);
                const newThing = await API.graphql(graphqlOperation(mutations.updateRoompage, 
                    {
                        input:{
                            roomid : num,
                            players : [name]
                        }
                    }));
            })();
            this.props.history.push('/room');
        }
        else {
            alert('This room is full. Please select to enter another room.');
        }
    }

    //render the room button only when the room id is available

    //after clicked, check if the first room id in the current roomID array is equal to the first room id in the database
    handlePrevClick(e) {

    }

    //after clicked, get the last room id in the current roomID array
    //then, filter the database and get 18 room ids that are after the last room id we get previously
    //then, set the roomID array to the new room ids and re-render the components
    handleNextClick(e) {

    }

    handleCreateClick (e){
        e.preventDefault();
        this.handleCreateRoom();
        console.log('hello?');
        this.props.history.push('/room');
        
        /*
        for(let i = 0; i < this.state.status.length; i++) {
            if(this.state.status[i] == 'closed') {
                let temp_status = this.state.status;
                temp_status[i] = 'open';
                let temp_player_count = this.state.player_count;
                temp_player_count[i] = 1;
                this.setState({
                    status: temp_status,
                    player_count: temp_player_count
                });
        
            }
        }
        */
        let last_id = this.state.rID[this.state.rID.length - 1];
        let new_id = [...this.state.rID, last_id];
        this.setState({
            room_id: new_id,
            player_count: 1,
            status: 'open'
        });
    }

    handleRandomClick(e) {

    }

    render() {
        return (
            <div className="room-list">
                <h1 className="room-list-header">SWITCH</h1>
                    <button className="game-rule-button" onClick={this.handleGameRuleClick}>Game Rule</button>
                    <button className="profile-button" onClick={this.handleProfileClick}>My Account</button>
                    <img src={img} className="room-img" />
                    <form>
                        <label className="room-num">Room #: <input type="number" className="room-num-input" /></label>
                        <input type="submit" value="ENTER" className="enter-button" />
                    </form>
                    <button className="create-button" onClick={this.handleCreateClick}>Create New Room</button>
                    <table>
                        <thead>
                            <tr>
                                <th className="id">Room ID</th>
                                <th className="count">Player Number</th>
                                <th className="status">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.room.map((r, i) => (
                                <div className="table-row" key={i} value={i} onClick={(e) => {this.handleRoomClick(e,i)}}>
                                    <tr>
                                        <th className="id">{this.state.room[i]}</th>
                                        <th className="count">{this.state.player_count[i]}/4</th>
                                        <th className="status">{this.state.status[i]}</th>
                                    </tr>
                                </div>
                            ))}
                        </tbody>
                    </table>
                    <div className="block"></div>
            </div>
        );
    }
}

//retrieve all room data from database, excluding those rooms that were closed

function getRoom(){
    return [1, 2, 3,4 ,5,6,7,8,9];
}


function getPlayerCount(){
    return [1,1,1,1,1,1,1,1,1];
}

function getStatus(){
    return ['playing','open','playing','open','open','open','playing','open','open'];
}

export default withRouter(RoomListPage);