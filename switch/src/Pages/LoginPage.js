import React, { Component } from 'react';

class LoginPage extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            username: " ",
            password: " "
        };
    }

    render(){
        return (
            <div>
                <h1>WELCOME TO SWITCH</h1>
            </div>
        );
    }
}

export default LoginPage;