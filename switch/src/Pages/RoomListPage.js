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
    }

    handleProfileClick(e) {
        e.preventDefault();
        this.props.history.push('/my-account');
    }

    handleGameRuleClick(e) {
        e.preventDefault();
        this.props.history.push('/game-rule');
    }
    
    handleRoomClick(e) {
        e.preventDefault();
        if(this.state.status[e] == 'playing' || this.state.player_count[e] == 4){
            alert('This room is full. Please select to enter another room.');
        }
        else {
            this.props.history.push(`/${this.state.roomID[e]}`);
        }
    }

    renderRoom(e){
        if (this.state.roomID[e]){
            return(
                <button className="room-button" onClick={this.handleRoomClick}>
                        Room {this.state.roomID[e]} <br />
                        {this.state.player_count[e]}/4 <br />
                        {this.state.status[e]}
                </button>
            );
        }
    }

    render() {
        return (
            <div className="room-list">
                <h1 className="room-list-header">SWITCH</h1>
                    <button className="game-rule-button" onClick={this.handleGameRuleClick}>Game Rule</button>
                    <button className="profile-button" onClick={this.handleProfileClick}>My Account</button>
                    <img src={img} className="room-img" />
                    <div className="room-row-1">
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
                    <div className="room-row-2">
                        <div className="room-col">
                            {this.renderRoom(9)}
                            {this.renderRoom(10)}
                            {this.renderRoom(11)}
                        </div>
                    </div>
                    {/*
                    <button className="prev">Prev</button>
                    <button className="next">Next</button>
                    <form>
                        <label className="room-num">Room #: <input type="number" className="room-num-input" /></label>
                        <input type="submit" value="ENTER" className="enter-button"/>
                    </form>
                    <button className="create-button" onClick={this.handleRoomClick}>Create New Room</button>
        <button className="random-button" onClick={this.handleRoomClick}>Random Match</button> */}
            </div>
        );
    }
}

//retrieve all data from database
function getRoomID(){
    return [1,2,3,4,5,6,7,8,9,10];
}

function getPlayerCount(){
    return [4,3,1,4,3,1,2,4,2,2];
}

function getStatus(){
    return ['playing','open','locked','playing','open','open','open','playing','locked','open'];
}

export default withRouter(RoomListPage);