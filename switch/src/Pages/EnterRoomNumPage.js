import React, { Component } from 'react';
import { Button, FormGroup, FormControl, FormLabel} from 'react-bootstrap';

class EnterRoomNumPage extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            room_num: ""
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleSubmit(event){
        //check if the room number exists, and enter the room
        event.preventDefault();
    }

    handleChange(event){
        this.setState({room_num: event.target.value});
    }

    render() {
        return(
            <div className="enter-room-num">
                <form onSubmit={this.handleSubmit}>
                    <FormGroup controlId="room_num">
                        <FormLabel>Room Number: </FormLabel>
                        <FormControl type="number" value={this.state.room_num} onChange={this.handleChange} />
                    </FormGroup>
                    <Button className="enter-room-button" type="submit">ENTER</Button>
                </form>
            </div>
        );
    }
}

export default EnterRoomNumPage;