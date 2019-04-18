import React, { Component } from 'react';
import bg from '../img/background.png';
import './RoomListPage.css';
import RoomPage from './RoomPage';
import GameRulePage from './GameRulePage';
import ProfilePage from './ProfilePage';

class RoomListPage extends React.Component {
    constructor(){
        super();
        this.state={
            roomID: getRoomID(),
            player_count: getPlayerCount(),
            status: getStatus(),
            enableRoomListPage: true,
            enableRoomPage: false,
            enableGameRulePage: false,
            enableProfilePage: false
        };
        this.handleRoomClick = this.handleRoomClick.bind(this);
        this.showRoomList = this.showRoomList.bind(this);
        this.handleGameRuleClick = this.handleGameRuleClick.bind(this);
        this.handleProfileClick = this.handleProfileClick.bind(this);
    }

    handleProfileClick() {
        this.setState({
            enableRoomListPage: false,
            enableProfilePage: true
        })
    }

    handleGameRuleClick() {
        this.setState({
            enableRoomListPage: false,
            enableGameRulePage: true
        })
    }
    
    handleRoomClick() {
        //need to check availability first
        this.setState({
            enableRoomListPage: false,
            enableRoomPage: true
        });
    }

    renderRoom(i){
        return(
            <button className="room-button" onClick={this.handleRoomClick}>
                    Room {this.state.roomID[i]} <br />
                    {this.state.player_count[i]}/4 <br />
                    {this.state.status[i]}
            </button>
        );
    }

    showRoomList() {
        return(
            <div className="room-list">
                <p className="room-header">SWITCH</p>
                <button className="game-rule-button" onClick={this.handleGameRuleClick}>Game Rule</button>
                <button className="profile-button" onClick={this.handleProfileClick}>My Account</button>
                <img src={bg} className="room-bg" alt="background"/>
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
                    <div className="room-col">
                        {this.renderRoom(9)}
                        {this.renderRoom(10)}
                        {this.renderRoom(11)}
                    </div>
                </div>
                <button className="prev">Prev</button>
                <button className="next">Next</button>
                <form>
                    <label className="room-num">Room #: <input type="number" className="room-num-input" /></label>
                    <input type="submit" value="ENTER" className="enter-button"/>
                </form>
                <button className="create-button" onClick={this.handleRoomClick}>Create New Room</button>
                <button className="random-button" onClick={this.handleRoomClick}>Random Match</button>
            </div>
        );
    }

    render() {
        return (
            <div>
                {this.state.enableRoomListPage ? this.showRoomList() : null}
                {this.state.enableRoomPage ? <RoomPage /> : null}
                {this.state.enableGameRulePage ? <GameRulePage /> : null}
                {this.state.enableProfilePage ? <ProfilePage /> : null}
            </div>
        );
    }
}

//retrieve all data from database
function getRoomID(){
    return [1,2,3,4,5,6,7,8,9,10,11,12];
}

function getPlayerCount(){
    return [4,3,1,4,3,1,2,4,2,3,2,4];
}

function getStatus(){
    return ['playing','open','locked','playing','open','open','open','playing','locked','locked','open','playing'];
}

export default RoomListPage;