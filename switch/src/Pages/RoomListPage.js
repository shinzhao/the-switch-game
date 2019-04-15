import React, { Component } from 'react';
import bg from '../img/background.png';
import './RoomListPage.css';
import Room from './Components/Room';

class RoomListPage extends React.Component {
    constructor(){
        super();
        this.state={
            roomID: null,
            player_count: null,
            status: null
        };
        this.handleClick = this.handleClick.bind(this);
    }

    getRoomID(){

    }

    getPlayerCount(){

    }

    getStatus(){

    }

    handleClick(){
        this.setState({
            roomID: 1,
            player_count: 4,
            status: "playing"
        });
    }

    renderRoom(){
        return(
            <div>
                
            </div>
        );
    }

    render() {
        return (
            <div className="room-list">
                <p className="room-header">SWITCH</p>
                <img src={bg} className="room-bg" alt="background"/>
                
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

export default RoomListPage;