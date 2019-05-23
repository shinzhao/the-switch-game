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
import * as mutations from '../graphql/mutations';
import AWSAppSyncClient, { AUTH_TYPE } from 'aws-appsync';
import aws_config from '../aws-exports';
import gql from 'graphql-tag';
import { Table } from 'react-bootstrap';



/**
 * A string for Appsync subscription to create a room
 * @constant {string}
 */
  const subtoRoomData = `
  subscription{
    onCreateRoompage{
        roomid players
    }
  }

/**
 * A string for Appsync subscription to update the room
 * @constant {string}
 */

  `
  const subtoRoomData2 = `
  subscription{
    onUpdateRoompage{
        roomid players
    }
  }

/**
 * A string for Appsync subscription to delete the room
 * @constant {string}
 */
  `
  const subtoRoomData3 = `
  subscription{
    onDeleteRoompage{
        roomid players
    }
  }
  `

/**
 * This component is the page for room list.
 * It will render after the user was logged in from welcome page,
 * and redirect to /room-list.
 */
class RoomListPage extends React.Component {
    constructor(){
        super();
        this.state={
            rID: '',
            player_count: [],
            roomCount: Number,
            status: '',
            inputNum:Number,
            check : Number       
        };
        this.handleProfileClick = this.handleProfileClick.bind(this);
        this.handleGameRuleClick = this.handleGameRuleClick.bind(this);
        this.handleRoomClick = this.handleRoomClick.bind(this);
        this.handleCreateClick=this.handleCreateClick.bind(this);
    }
           
componentDidMount() {
        //create
        this.getRoom();
        this.getPlayersCount();
        this.getStatus();
        this.subC = API.graphql(
            graphqlOperation(subtoRoomData)
        ).subscribe({
            next: (roomData) =>{
                console.log('we got the playerscount ' + roomData.value.data.onCreateRoompage.players.length);
                console.log('we got the data', roomData.value.data.onCreateRoompage.roomid);
                //players create sub
                const newPlyersCount = roomData.value.data.onCreateRoompage.players.length;
                const prevPlayersCount = this.state.player_count;
                const updatedPlayersCount = [...prevPlayersCount,newPlyersCount];
                this.setState({player_count : updatedPlayersCount});
                //rid create sub
                const newRoom = roomData.value.data.onCreateRoompage.roomid;
                const prevRooms = this.state.rID;
                const updatedRooms = [...prevRooms,newRoom];
                this.setState({rID : updatedRooms });
            }
        });
        this.subD = API.graphql(
            graphqlOperation(subtoRoomData3)
        ).subscribe({
            next: (roomData) =>{
            const deleterID = roomData.value.data.onDeleteRoompage.roomid;
            console.log('the missing one is '+deleterID);
            const updatedRooms = this.state.rID.filter(rooms => rooms !== deleterID)
            this.setState({rID : updatedRooms});
            }
        })
        //update
        this.subU = API.graphql(
            graphqlOperation(subtoRoomData2)
        ).subscribe({
            next: (roomData) =>{
                //players update sub
                const storeStatus = [];
                console.log('we update the playerscount ' + roomData.value.data.onUpdateRoompage.players.length);
                console.log('we update the playerscount ' + roomData.value.data.onUpdateRoompage.roomid);
                const newPlyersCount = roomData.value.data.onUpdateRoompage.players.length;
                const prevPlayersCount = this.state.player_count;
                const newRoomID = roomData.value.data.onUpdateRoompage.roomid;
                const roomlist = this.state.rID;
                const index = roomlist.findIndex(num => num === newRoomID);
                console.log('show me the index ' + index);
                const updatedPlayersCount = prevPlayersCount;
                updatedPlayersCount[index] = newPlyersCount; 

                for(let i=0;i<updatedPlayersCount.length;i++){
                    if(updatedPlayersCount[i]<4){
                        storeStatus.push('open');
                    }
                    if(updatedPlayersCount[i]>=4){
                        storeStatus.push('close');
                    }
                }
                this.setState({player_count : updatedPlayersCount,
                                status : storeStatus});
            }
        });
        
        this.waitAndGetList();
  }
   componentWillUnmount() {
     this.subC.unsubscribe();
     this.subU.unsubscribe();
     this.subD.unsubscribe();
   }
	/**
     * Gets the list of room info after 1 second.
     */
async waitAndGetList() {
    console.log('Just~~~~~~~~')
    await this.sleep(1000)
    console.log('wait 1 second');
    this.getRoom();
    this.getPlayersCount();
    this.getStatus();
  }
  sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms))
  }
/**
     * Gets an array of room id from the database and set it to rID state.
     */

//appsync get room (query)
getRoom = async () => {
    var storeRoom = [];
    const result = await API.graphql(graphqlOperation(queries.listRoompages));
    for(let i=0;i<result.data.listRoompages.items.length;i++){
        storeRoom.push(result.data.listRoompages.items[i].roomid);
        }
    this.setState({rID : storeRoom });
    }
 /**
     * Returns a promise.
     * @param {number} ms 
     * @returns {Promise}
     */
/**
     * Gets an array of player count in each room from the database
     * and set it to player_count state.
     */
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
    
    this.setState(function (state, props) {
        return {
         player_count: playercount
        }
       });
    //this.setState({player_count:playercount});
    const roomCount = this.state.player_count.length;

    console.log('TEST FOR playercount ' + this.state.player_count.length);
    console.log('show the roomCount ' + roomCount);
    
}
 /**
     * Gets an array of status of each room from the database
     * and set it to status state.
     */

//appsync get status
getStatus = async() => {
    var storeStatus = [];
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
    console.log('get status check '+playercount);
    for(let i=0;i<playercount.length;i++){
        if(playercount[i]<4){
            storeStatus.push('open');
        }
        if(playercount[i]>=4){
            storeStatus.push('close');
        }
    }
    this.setState({status : storeStatus});

}  


handleRanDomRoom = async () =>{
    var storeRoom = [];
    const result = await API.graphql(graphqlOperation(queries.listRoompages));
    for(let i=0;i<result.data.listRoompages.items.length;i++){
        console.log(result.data.listRoompages.items[i].roomid);
        storeRoom.push(result.data.listRoompages.items[i].roomid);
        }
    
   
}
 /**
     * Creates new room based on random room id passed to this function.
     * @param {number} random - randomly generated number for room id
     */
handleCreateRoom = async (random) =>{
    
    const getUser = await Auth.currentAuthenticatedUser();
                const name = getUser.username;
    const result = await API.graphql(graphqlOperation(mutations.createRoompage,{
        input : {
            roomid : random,
            players : name
        }
        }));
        var nums=[];
		var ranNums = [];
		for(var k=0;k<52;k++){
		   nums.push(k);
        }
        console.log('show me the card '+ nums);
		   let m = nums.length,
               n = 0;
               
	    while (m--) {
           n = Math.floor(Math.random() * (m+1));
           
		   ranNums.push(nums[n]);
		   nums.splice(n,1);
        }
         console.log('show me the card '+ ranNums.slice(0,35));
         ranNums = ranNums.slice(0,36);
         console.log('show me the card '+ ranNums.length);
            await API.graphql(graphqlOperation(mutations.createReadyPageTable, 
                {
                    input:{
                    roomID : random,
                    players : name,
                    cards : ranNums,
                    readyStatus : ['Not Ready ....','Not Ready ....','Not Ready ....','Not Ready ....'],
                    GameStart : false,
                    readyNum : 0
                    }}
                ));
                await API.graphql(graphqlOperation(mutations.createQw, 
                    {
                        input:{
                            username : name,
                            roomID : random
                        }
                    }));
                    await API.graphql(graphqlOperation(mutations.updateQw, 
                        {
                            input:{
                                username : name,
                                roomID : random
                            }
                        }));
}
/**
     * Handles the "my account" button click, will redirect to profile page.
     * @param {event} e 
     */

    handleProfileClick(e) {
        e.preventDefault();
        this.props.history.push('/my-account');
    }
/**
     * Handles the "game rule" button click, will redirect to game rule page.
     * @param {event} e
     */
    handleGameRuleClick(e) {
        e.preventDefault();
        this.props.history.push('/game-rule');
    }
     /**
     * Handles click on the room id in the table of room list,
     * will redirect user to the corresponding room page if player count of the room is not 4 yet,
     * and/or the room status is not "playing" or "closed"
     * @param {event} e 
     * @param {number} i - room id
     */
    //user allowed to enter the room only when the status of the room is not 'playing'
    handleRoomClick(e, i) {
        if(this.state.status[i] != 'close'){
            (async () => {
                //get current user name
                const getUser = await Auth.currentAuthenticatedUser();
                const name = getUser.username;
                console.log('you click the room ' + typeof(this.state.rID[i]));
                var roomnum = this.state.rID[i];
                console.log(roomnum);
                console.log('test for who click into a room , user :' + name + ' into a room #' +this.state.rID[i]);
                const getPlayers = await API.graphql(graphqlOperation(queries.listRoompages));
                const prevPlayers = getPlayers.data.listRoompages.items[i].players;
                const updatedPlayers = [...prevPlayers,name];
                const newThing = await API.graphql(graphqlOperation(mutations.updateRoompage, 
                    {
                        input:{
                            roomid : roomnum,
                            players : updatedPlayers
                        }
                    }));
                    await API.graphql(graphqlOperation(mutations.updateReadyPageTable, 
                        {
                            input:{
                                roomID : roomnum,
                                players : updatedPlayers
                            }
                        }));
                        await API.graphql(graphqlOperation(mutations.createQw, 
                            {
                                input:{
                                    username : name,
                                    roomID : roomnum
                                }
                            }));
                            await API.graphql(graphqlOperation(mutations.updateQw, 
                                {
                                    input:{
                                        username : name,
                                        roomID : roomnum
                                    }
                                }));
            })();
                const roomID = this.state.rID[i];
                
                let path = {
                    pathname: '/room',
                    query: roomID,
                }
                this.props.history.push(path);
        }
        else {
            alert('This room is full. Please select to enter another room.');
        }
    }
/**
     * Handles the "create new room" button click,
     * will generate random number as the new room id.
     * Passes the random number to function handleCreateRoom,
     * then redirects user into the newly created room.
     * @param {event} e 
     */


    handleCreateClick (e){
        e.preventDefault();
        var min=1; 
        var max=9999;  
        var random =Math.floor(Math.random() * (+max - +min)) + +min; 
        console.log("Random Number Generated : " + random ); 
        this.handleCreateRoom(random);
        let path = {
            pathname: '/room',
            query: random,
        }
        this.props.history.push(path);
        
        
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
       
    }
 /**
     * Sets inputNum statte as the number passed to this function.
     * @param {number} number
     */
    inputChange=(number)=>{
        this.setState({
            inputNum : number.target.value
        })
    }
/**
     * Handles the "enter" button click,
     * will redirect user into the corresponding room with the room id they entered into the input field,
     * if the room is not full or is not in "playing" or "closed" status.
     */
    handleEnterRoom=()=>{
        var value = 0;
        var check = 0;
        console.log('show me the rooms you have ' + this.state.rID);
        console.log('show me what you typed ' + this.state.inputNum);
        (async () => {
            //get current user name
            var i = 0;
            const getUser = await Auth.currentAuthenticatedUser();
            const name = getUser.username;
            
            const result1 = await API.graphql(graphqlOperation(queries.listRoompages));
            console.log(result1.data.listRoompages.items.length);

             while(i<result1.data.listRoompages.items.length){
                 
                  console.log('check ' + i + ' time'); 
                if(result1.data.listRoompages.items[i].roomid == this.state.inputNum){
                    const result2 = await API.graphql(graphqlOperation(queries.getRoompage,{
                        roomid : this.state.inputNum
                        }))
                    if(result2.data.getRoompage.players.length < 4){
                        const prevPlayers = result2.data.getRoompage.players;
                        const updatedPlayers = [...prevPlayers,name];
                        const newThing = await API.graphql(graphqlOperation(mutations.updateRoompage, 
                        {
                        input:{
                            roomid : this.state.inputNum,
                            players : updatedPlayers
                        }
                        }));
                        await API.graphql(graphqlOperation(mutations.updateReadyPageTable, 
                            {
                                input:{
                                    roomID : this.state.inputNum,
                                    players : updatedPlayers
                                }
                            }));
                            await API.graphql(graphqlOperation(mutations.createQw, 
                                {
                                    input:{
                                        username : name,
                                        roomID : this.state.inputNum
                                    }
                                }));
                                await API.graphql(graphqlOperation(mutations.updateQw, 
                                    {
                                        input:{
                                            username : name,
                                            roomID : this.state.inputNum
                                        }
                                    }));
                        const ID = this.state.inputNum;
                        let path = {
                        pathname: '/room',
                        query: ID,
                        }
                        this.props.history.push(path);
                        break;
                        }
                    
                    else{
                        alert('room is full');
                        break;
                    }
                }
                if(i == (result1.data.listRoompages.items.length-1)){
                    alert("room does not exist");
                }
                i++;
            }
            
            

            
        })();
       
    }
/**
     * Renders all of room info out into the table list
     */
    _renderRoom(){
        return Object.entries(this.state.rID).map((r, i) => {
            return (
            <div  className="table-row" key={i} value={i} onClick={(e)  => {this.handleRoomClick(e,i)}}>
            <br />
            <br />
                <tr>
                    <th className="id">{this.state.rID[i]}</th>
                    <th className="count">{this.state.player_count[i]}/4</th>
                    <th className="status">{this.state.status[i]}</th>
                    
                </tr>
                <br />
                <br />
            </div>
            )
        })
    }


    render() {
        return (
            <div className="room-list">
                <h1 className="room-list-header">SWITCH</h1>
                <button className="game-rule-button" onClick={this.handleGameRuleClick}>Game Rule</button>
                <button className="profile-button" onClick={this.handleProfileClick}>My Account</button>
                <img src={img} className="room-img" />
                <form>
                    <label className="room-num">Room #: <input onChange={this.inputChange} type="number" className="room-num-input" /></label>
                    <input type='button' value="ENTER" className="enter-button" onClick={this.handleEnterRoom} />
                    <label className="userid">User ID:<input onChange={this.inputChange} type="string" className="username" /></label>
                    <input type='button' value="ENTERID" className="enterid-button" onClick={this.handleEnterRoom} />
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
                        {this._renderRoom()}
                        
                    </tbody>
                </table>
                <div className="block"></div>
        </div>
        );
    }
}





export default withRouter(RoomListPage);



