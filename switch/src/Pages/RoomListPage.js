import React, { Component } from 'react';
import img from '../img/background.png';
import './RoomListPage.css';
import RoomPage from './RoomPage';
import GameRulePage from './GameRulePage';
import ProfilePage from './ProfilePage';
import { withRouter } from "react-router-dom";

class RoomListPage extends React.Component {
    constructor(){
        super();
        this.state={
            roomID: getRoomID(),
            player_count: getPlayerCount(),
            status: getStatus(),
            page: 1
        };
        this.handleProfileClick = this.handleProfileClick.bind(this);
        this.handleGameRuleClick = this.handleGameRuleClick.bind(this);
        this.handleRoomClick = this.handleRoomClick.bind(this);
        this.handlePrevClick = this.handlePrevClick.bind(this);
        this.handleNextClick = this.handleNextClick.bind(this);
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
            this.props.history.push('/room');
        }
        else {
            alert('This room is full. Please select to enter another room.');
        }
    }

    //render the room button only when the room id is available
    renderRoom(i){
        if (this.state.roomID[i]){
            return(
                <button className="room-button" onClick={(e) => {this.handleRoomClick(e,i)}}>
                        Room {this.state.roomID[i]} <br />
                        {this.state.player_count[i]}/4 <br />
                        {this.state.status[i]}
                </button>
            );
        }
        else {
            return(
                <button className="empty-room-button"></button>
            )
        }
    }

    //after clicked, check if the first room id in the current roomID array is equal to the first room id in the database
    handlePrevClick(e) {

    }

    //after clicked, get the last room id in the current roomID array
    //then, filter the database and get 18 room ids that are after the last room id we get previously
    //then, set the roomID array to the new room ids and re-render the components
    handleNextClick(e) {

    }

    handleCreateClick(e) {
        e.preventDefault();
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
                this.props.history.push('/room');
            }
        }
        
        let last_id = this.state.roomID[this.state.roomID.length - 1];
        let new_id = [...this.state.roomID, last_id];
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
                    <div className="room-row">
                        <div className="room-col">
                            {this.renderRoom(0)}
                            {this.renderRoom(1)}
                            {this.renderRoom(2)}
                        </div>
                        <div className="room-col">
                            {this.renderRoom(3)}
                            {this.renderRoom(4)}
                            {this.renderRoom(5)}
                        </div>
                        <div className="room-col">
                            {this.renderRoom(6)}
                            {this.renderRoom(7)}
                            {this.renderRoom(8)}
                        </div>
                    </div>
                    <button className="prev" onClick={this.handlePrevClick}>Prev</button>
                    <button className="next" onClick={this.handleNextClick}>Next</button>
                    <form>
                        <label className="room-num">Room #: <input type="number" className="room-num-input" /></label>
                        <input type="submit" value="ENTER" className="enter-button" />
                    </form>
                    <button className="create-button" onClick={this.handleRoomClick}>Create New Room</button>
                    <button className="random-button" onClick={this.handleRoomClick}>Random Match</button>
            </div>
        );
    }
}

//retrieve all room data from database, excluding those rooms that were closed
function getRoomID(){
    return [1,2,3,4,5,6,7,8,9];
}

function getPlayerCount(){
    return [4,3,4,4,3,1,2,4,3];
}

function getStatus(){
    return ['playing','open','playing','open','open','open','playing','open','open'];
}

export default withRouter(RoomListPage);