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

    renderRoom(){
        return(
            <div>
                <button className="room" onClick={this.handleClick}>
                    Room: {this.state.roomID}
                    {this.state.player_count}/4
                    {this.state.status}
                </button>
            </div>
        );
    }

    render() {
        
        return (
            <div className="room-list">
                <p className="room-header">SWITCH</p>
                <img src={bg} className="room-bg" alt="background"/>
                {this.renderRoom(0)}
                <button>Prev</button>
                <button>Next</button>
                <form>
                    <label className="room-num">Room #: <input type="number" name="room-num-input" /></label>
                    <input type="submit" value="ENTER" name="enter-button"/>
                </form>
                <button className="button">Create New Room</button>
                <button className="button">Random Match</button>
            </div>
        );
    }
}

//retrieve all data from database
function getRoomID(){
    return [1];
}

function getPlayerCount(){
    return [4];
}

function getStatus(){
    return ['playing'];
}

export default RoomListPage;