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

    }

    getRoomID(){

    }

    getPlayerCount(){

    }

    getStatus(){

    }

    renderRoom(){
        return(
            <div>
                
            </div>
        );
    }

    render() {
        return (
            <div className="App-bg">
                <p className="App-header">WELCOME TO SWITCH</p>
                <img src={bg} className="App-bg" alt="background"/>
                <Room />
                <Room />
                <Room />
                <Room />
                <Room />
                <Room />
                <Room />
                <Room />
                <Room />
                <Room />
                <form>
                    <label>Room #: <input type="number" name="room-num" /></label>
                    <input type="submit" value="ENTER" />
                </form>
                <button>Create New Room</button>
                <button>Random Match</button>
            </div>
        );
    }
}

export default RoomListPage;