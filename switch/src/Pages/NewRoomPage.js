import React, { Component } from 'react';
import { Button, FormGroup, FormControl, FormLabel, FormCheck} from 'react-bootstrap';

class NewRoomPage extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            room_num: "",
            player_num: null,
            isPrivate: false
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }

    handleChange(event){
        this.setState({player_num: event.target.value});
    }
    
    handleSubmit(event){
        //send new room number 
        event.preventDefault();
    }

    getRoomNum(event){
        //generate new room number
    }

    handleClick(event){
        this.setState({isPrivate: !this.state.isPrivate})
    }

    render(){
        return(
            <div className="new-room">
                <form onSubmit={this.handleSubmit}>
                    <FormLabel>Room Number: {this.getRoomNum}</FormLabel>
                    <FormCheck type="radio" value={4} onChange={this.handleChange}>4 Players</FormCheck>
                    <FormCheck type="radio" value={2} onChange={this.handleChange}>2 Players</FormCheck>
                    <FormCheck type="checkbox" value={this.state.isPrivate} onChange={this.handleClick}>Private</FormCheck>
                    <Button className="create-room-button" type="submit">CREATE</Button>
                </form>
            </div>
        );
    }
}

export default NewRoomPage;
