import React, { Component } from 'react';
import bg from '../img/background.png';
import './RoomListPage.css';

class RoomListPage extends React.Component {
    constructor(){
        super();
        this.state={
            roomID: getRoomID(),
            player_count: getPlayerCount(),
            status: getStatus()
        };
        this.handleClick = this.handleClick.bind(this);
    }
    
    
    handleClick(){
        alert("button clicked");
    }

    renderRoom(i){
        return(
            <button className="room-button" onClick={this.handleClick}>
                    Room {this.state.roomID[i]} <br />
                    {this.state.player_count[i]}/4 <br />
                    {this.state.status[i]}
            </button>
        );
    }

    render() {
        
        return (
            <div className="room-list">
                <p className="room-header">SWITCH</p>
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
                <button className="create-button" onClick={this.handleClick}>Create New Room</button>
                <button className="random-button">Random Match</button>
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