import React, { Component } from 'react';
import { Button, FormGroup, FormControl, FormLabel} from 'react-bootstrap';

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
    }

    handleChange(event){

    }
    
    handleSubmit(event){

    }
    render(){
        return(
            <div className="new-room">

            </div>
        );
    }
}

export default NewRoomPage;
